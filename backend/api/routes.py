from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import httpx
import os
from dotenv import load_dotenv
from .services import handle_file_upload, call_ml_service, list_uploaded_files, get_job_status, get_results
from .auth import get_current_user

load_dotenv()
ML_API_URL = os.getenv("ML_API_URL", "http://localhost:8000")

router = APIRouter()

class ForecastRequest(BaseModel):
    data: List[Dict[str, Any]]
    model_type: str
    forecast_horizon: int
    feature_groups: List[str]
    target_col: str
    date_col: str
    menu_col: str

@router.post("/forecast")
async def create_forecast(request: ForecastRequest, user=Depends(get_current_user)):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{ML_API_URL}/forecast",
                json=request.dict()
            )
            response.raise_for_status()
            return await response.json()
        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=e.response.status_code if hasattr(e, 'response') else 500,
                detail=str(e)
            )

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), user=Depends(get_current_user)):
    filename, s3_url, timestamp, file_id, _ = await handle_file_upload(file)
    ml_result = await call_ml_service(s3_url, filename, timestamp, file_id)
    return {
        "message": "File uploaded and processed successfully",
        "filename": filename,
        "s3_path": s3_url,
        "file_id": file_id,
        "ml_result": ml_result
    }

@router.get("/files")
async def get_files(user=Depends(get_current_user)):
    return list_uploaded_files()

@router.get("/jobs/{job_id}")
async def job_status(job_id: str, user=Depends(get_current_user)):
    return get_job_status(job_id)

@router.get("/results/{job_id}")
async def results(job_id: str, user=Depends(get_current_user)):
    return get_results(job_id)

@router.get("/health")
async def health_check():
    return {"status": "healthy"}
