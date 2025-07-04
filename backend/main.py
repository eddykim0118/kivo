from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import httpx
import os
import logging
from dotenv import load_dotenv
import pandas as pd
import io
from datetime import datetime

# Load environment variables
load_dotenv()

# ML API configuration
ML_API_URL = os.getenv("ML_API_URL", "http://host.docker.internal:8001")  # Updated port

app = FastAPI(
    title="Forecasting Web App API",
    description="API for the forecasting web application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)

# --- Forecasting Endpoints ---
class ForecastRequest(BaseModel):
    data: List[Dict[str, Any]]
    model_type: str
    forecast_horizon: int
    feature_groups: List[str]
    target_col: str
    date_col: str
    menu_col: str

@app.post("/api/forecast")
async def create_forecast(request: ForecastRequest):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{ML_API_URL}/forecast",
                json=request.dict()
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=e.response.status_code if hasattr(e, 'response') else 500,
                detail=str(e)
            )

# Fixed upload endpoint to handle FormData properly
@app.post("/api/upload")
async def upload_data(
    file: UploadFile = File(...),
    date_col: str = Form(...),
    menu_col: str = Form(...),
    target_col: str = Form(...),
    location_id: str = Form(...)
):
    try:
        # Read file contents
        contents = await file.read()
        logging.info(f"Received file upload: {file.filename} ({len(contents)} bytes)")
        
        # Step 1: Look up location name from location_id
        from api.services import supabase, s3_client, S3_BUCKET
        if not supabase:
            raise Exception("Supabase not available")
        location_result = supabase.table("locations").select("name").eq("id", location_id).single().execute()
        if not location_result.data:
            raise Exception(f"Location with id {location_id} not found")
        location_name = location_result.data["name"]
        
        # Step 2: Save file to S3 under raw/{location_name}/...
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{file.filename}"
        s3_key = f"raw/{location_name}/{filename}"
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=s3_key,
            Body=contents
        )
        s3_url = f"s3://{S3_BUCKET}/{s3_key}"
        logging.info(f"✅ File uploaded to S3: {s3_url}")
        
        # Step 3: Store file metadata in Supabase
        file_id = None
        file_metadata = {
            "filename": filename,
            "s3_path": s3_url,
            "upload_time": timestamp,
            "file_size": len(contents),
            "file_type": file.content_type,
            "status": "uploaded",
            "location_id": location_id
        }
        result = supabase.table("file_upload_tracker").insert(file_metadata).execute()
        if result.data:
            file_id = result.data[0]["id"]
            logging.info(f"✅ Metadata stored in Supabase with file_id: {file_id}")
        else:
            raise Exception("Failed to store file metadata")
        
        # Step 4: Send S3 URL and location_id to ML service
        async with httpx.AsyncClient() as client:
            data = {
                "file_path": s3_url,
                "filename": filename,
                "date_col": date_col,
                "menu_col": menu_col,
                "target_col": target_col,
                "file_id": file_id,
                "location_id": location_id
            }
            logging.info(f"🔄 Sending S3 URL to ML service: {ML_API_URL}/api/v1/upload")
            response = await client.post(
                f"{ML_API_URL}/api/v1/upload",
                json=data
            )
            response.raise_for_status()
            ml_response = response.json()
            logging.info(f"✅ ML service response received")
            
            # Step 5: Update status in Supabase to "completed" and store results
            try:
                supabase.table("file_upload_tracker").update({
                    "status": "completed",
                    "ml_result": ml_response
                }).eq("id", file_id).execute()
                result_data = {
                    "file_id": file_id,
                    "job_id": ml_response.get("job_id", file_id),
                    "results": ml_response,
                    "processing_time": timestamp,
                    "status": "completed"
                }
                supabase.table("forecast_results").insert(result_data).execute()
                logging.info(f"✅ Status updated in Supabase: completed")
            except Exception as e:
                logging.warning(f"⚠️ Failed to update Supabase status: {e}")
            
            return {
                "message": "File uploaded and processed successfully",
                "file_id": file_id,
                "s3_url": s3_url,
                "location_id": location_id,
                "status": "completed",
                "ml_results": ml_response
            }
    except httpx.HTTPError as e:
        logging.error(f"❌ ML service error: {e}")
        if file_id:
            try:
                supabase.table("file_upload_tracker").update({
                    "status": "processing_failed",
                    "error": str(e)
                }).eq("id", file_id).execute()
            except Exception as update_error:
                logging.warning(f"⚠️ Failed to update error status: {update_error}")
        raise HTTPException(
            status_code=e.response.status_code if hasattr(e, 'response') else 500,
            detail=f"ML service error: {str(e)}"
        )
    except Exception as e:
        logging.error(f"❌ Upload error: {e}")
        if 'file_id' in locals() and file_id:
            try:
                supabase.table("file_upload_tracker").update({
                    "status": "upload_failed",
                    "error": str(e)
                }).eq("id", file_id).execute()
            except Exception as update_error:
                logging.warning(f"⚠️ Failed to update error status: {update_error}")
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "ml_service_url": ML_API_URL}

@app.get("/api/files")
async def get_uploaded_files():
    """Get list of all uploaded files with their status and metadata."""
    try:
        from api.services import list_uploaded_files
        files = list_uploaded_files()
        return {
            "files": files,
            "total": len(files)
        }
    except Exception as e:
        logging.error(f"Failed to get uploaded files: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve uploaded files"
        )

@app.get("/api/files/{file_id}")
async def get_file_details(file_id: str):
    """Get detailed information about a specific uploaded file."""
    try:
        from api.services import supabase
        if not supabase:
            raise HTTPException(status_code=503, detail="Database service unavailable")
        
        # Get file metadata
        file_result = supabase.table("file_upload_tracker").select("*").eq("id", file_id).single().execute()
        if not file_result.data:
            raise HTTPException(status_code=404, detail="File not found")
        
        file_data = file_result.data
        
        # Get associated results if any
        results = []
        try:
            results_result = supabase.table("forecast_results").select("*").eq("file_id", file_id).execute()
            results = results_result.data
        except Exception:
            pass  # No results yet
        
        return {
            "file": file_data,
            "results": results
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Failed to get file details: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve file details"
        )

@app.post("/api/preview")
async def preview_file(file: UploadFile = File(...)):
    """Preview the first few rows of an uploaded file to help with column mapping."""
    try:
        # Read file contents
        contents = await file.read()
        
        # Determine file type and read accordingly
        if file.filename.lower().endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents), nrows=5)  # First 5 rows
        elif file.filename.lower().endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(contents), nrows=5)  # First 5 rows
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        # Get column information
        columns = df.columns.tolist()
        preview_data = df.head(3).to_dict('records')  # First 3 rows for preview
        
        return {
            "columns": columns,
            "preview": preview_data,
            "total_rows": len(df) if len(df) < 5 else "5+ (showing first 5 rows)"
        }
        
    except Exception as e:
        logging.error(f"Preview error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to preview file: {str(e)}"
        )

@app.get("/")
async def root():
    return {"message": "Forecasting API is running"}

# Health check for services
@app.get("/api/services/health")
async def services_health():
    try:
        from api.services import get_service_status
        return get_service_status()
    except ImportError:
        return {"error": "Services module not available"}

# --- Import and mount API router (if needed) ---
try:
    from api.routes import router as api_router
    app.include_router(api_router, prefix="/api")
    logging.info("✅ Additional API routes loaded successfully")
except ImportError as e:
    logging.warning(f"⚠️  Additional API routes not available: {e}")
except Exception as e:
    logging.error(f"❌ Failed to load additional API routes: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)