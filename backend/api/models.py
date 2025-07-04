# Pydantic models for response validation and test scaffolding
from pydantic import BaseModel
from typing import Optional, Any, Dict

class UploadedFile(BaseModel):
    id: str
    filename: str
    s3_path: str
    upload_time: str
    file_size: int
    file_type: str
    status: str
    ml_result: Optional[Any] = None

class ForecastJob(BaseModel):
    id: str
    upload_id: str
    user_id: str
    config: Dict[str, Any]
    status: str
    created_at: str
    completed_at: Optional[str] = None

class ForecastResult(BaseModel):
    id: str
    job_id: str
    results_data: Dict[str, Any]
    performance_metrics: Dict[str, Any]
    model_info: Dict[str, Any]
    created_at: str

__all__ = ["UploadedFile", "ForecastJob", "ForecastResult"]
