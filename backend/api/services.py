from dotenv import load_dotenv
load_dotenv()
import os
from datetime import datetime
import logging
from typing import Optional
from fastapi import UploadFile, HTTPException
import httpx

# Configure logging
logger = logging.getLogger(__name__)

# AWS S3 configuration
S3_BUCKET = os.getenv("S3_BUCKET", "your-bucket-name")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# ML Service configuration
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8000")

# Initialize optional dependencies
supabase = None
s3_client = None

# Initialize Supabase client (optional)
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client, Client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        logger.info("✅ Supabase client initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Supabase client: {e}")
        supabase = None
else:
    logger.warning("⚠️  Supabase credentials not found - running without Supabase integration")

# Initialize S3 client (optional)
if AWS_ACCESS_KEY and AWS_SECRET_KEY:
    try:
        import boto3
        from botocore.exceptions import ClientError
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION
        )
        logger.info("✅ AWS S3 client initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize S3 client: {e}")
        s3_client = None
else:
    logger.warning("⚠️  AWS credentials not found - running without S3 integration")

def _check_supabase():
    """Check if Supabase is available and raise error if not."""
    if not supabase:
        raise HTTPException(
            status_code=503, 
            detail="Database service unavailable - Supabase not configured"
        )

def _check_s3():
    """Check if S3 is available and raise error if not."""
    if not s3_client:
        raise HTTPException(
            status_code=503, 
            detail="File storage service unavailable - S3 not configured"
        )

async def handle_file_upload(file: UploadFile):
    """Handle file upload to S3 and metadata storage in Supabase."""
    _check_s3()
    _check_supabase()
    
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{file.filename}"
        contents = await file.read()
        
        # Upload to S3
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=f"uploads/{filename}",
            Body=contents
        )
        s3_url = f"s3://{S3_BUCKET}/uploads/{filename}"
        
        # Store metadata in Supabase
        file_metadata = {
            "filename": filename,
            "s3_path": s3_url,
            "upload_time": timestamp,
            "file_size": len(contents),
            "file_type": file.content_type,
            "status": "uploaded"
        }
        result = supabase.table("file_upload_tracker").insert(file_metadata).execute()
        
        if not result.data:
            raise HTTPException(status_code=500, detail="Failed to store file metadata")
            
        return filename, s3_url, timestamp, result.data[0]["id"], contents
        
    except Exception as e:
        if "ClientError" in str(type(e)):
            logger.error(f"AWS S3 error: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to upload file to S3")
        else:
            logger.error(f"Error uploading file: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

async def call_ml_service(s3_url, filename, timestamp, file_id):
    """Call the external ML service with file info and update Supabase status."""
    try:
        async with httpx.AsyncClient() as client:
            ml_response = await client.post(
                f"{ML_SERVICE_URL}/process-file",
                json={
                    "file_path": s3_url,
                    "filename": filename,
                    "upload_time": timestamp,
                    "file_id": file_id
                }
            )
            
            if ml_response.status_code != 200:
                if supabase:
                    supabase.table("file_upload_tracker").update({
                        "status": "processing_failed"
                    }).eq("id", file_id).execute()
                raise HTTPException(
                    status_code=500,
                    detail="Failed to process file with ML service"
                )
            
            ml_result = ml_response.json()
            
            # Update status in Supabase if available
            if supabase:
                supabase.table("file_upload_tracker").update({
                    "status": "processed",
                    "ml_result": ml_result
                }).eq("id", file_id).execute()
            
            return ml_result
            
    except httpx.HTTPError as e:
        logger.error(f"ML service error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to communicate with ML service")
    except Exception as e:
        logger.error(f"Error calling ML service: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

def list_uploaded_files():
    """List all uploaded files from Supabase."""
    _check_supabase()
    
    try:
        result = supabase.table("file_upload_tracker").select("*").order("upload_time", desc=True).execute()
        return result.data
    except Exception as e:
        logger.error(f"Error listing files: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to list files")

def get_job_status(job_id: str):
    """Retrieve the status of a forecast job by job_id from Supabase."""
    _check_supabase()
    
    try:
        result = supabase.table("forecast_jobs").select("status").eq("id", job_id).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"job_id": job_id, "status": result.data["status"]}
    except Exception as e:
        logger.error(f"Error getting job status for {job_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get job status")

def get_results(job_id: str):
    """Retrieve the results of a forecast job by job_id from Supabase."""
    _check_supabase()
    
    try:
        result = supabase.table("forecast_results").select("*").eq("job_id", job_id).single().execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Results not found")
        return {"job_id": job_id, "results": result.data}
    except Exception as e:
        logger.error(f"Error getting results for {job_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get results")

# Health check functions
def get_service_status():
    """Get the status of all external services."""
    return {
        "supabase": "available" if supabase else "unavailable",
        "s3": "available" if s3_client else "unavailable",
        "ml_service_url": ML_SERVICE_URL
    }