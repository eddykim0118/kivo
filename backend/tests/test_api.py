from fastapi.testclient import TestClient
from api import app
from api.auth import get_current_user
from unittest.mock import patch, AsyncMock

# Override authentication for all tests
def override_get_current_user():
    return {"user_id": "testuser", "token": "testtoken"}

app.dependency_overrides[get_current_user] = override_get_current_user

client = TestClient(app)

def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

@patch("api.routes.call_ml_service", new_callable=AsyncMock)
def test_upload_file(mock_call_ml_service, mock_s3, mock_supabase):
    """Test file upload endpoint with mocked S3, Supabase, and ML service."""
    mock_call_ml_service.return_value = {"result": "success"}
    headers = {"Authorization": "Bearer testtoken"}
    response = client.post("/upload", files={"file": ("test.csv", b"test data")}, headers=headers)
    assert response.status_code == 200
    assert "file_id" in response.json() or "id" in response.json()

def test_list_files(mock_supabase):
    """Test listing uploaded files with mocked Supabase."""
    # Mock Supabase response
    mock_supabase.table.return_value.select.return_value.order.return_value.execute.return_value.data = [{"id": "123", "filename": "test.csv"}]
    
    headers = {"Authorization": "Bearer testtoken"}
    response = client.get("/files", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_job_status(mock_supabase):
    """Test retrieving job status with mocked Supabase."""
    # Mock Supabase response
    mock_supabase.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {"status": "PENDING"}
    
    headers = {"Authorization": "Bearer testtoken"}
    response = client.get("/jobs/123", headers=headers)
    assert response.status_code == 200
    assert response.json()["status"] == "PENDING"

def test_get_results(mock_supabase):
    """Test retrieving forecast results with mocked Supabase."""
    # Mock Supabase response
    mock_supabase.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {"results": {"forecast": [], "metrics": {}}}
    
    headers = {"Authorization": "Bearer testtoken"}
    response = client.get("/results/123", headers=headers)
    assert response.status_code == 200
    assert "results" in response.json()

@patch("httpx.AsyncClient.post", new_callable=AsyncMock)
def test_forecast_endpoint(mock_post, mock_supabase):
    """Test the forecast endpoint with mocked ML service response."""
    mock_post.return_value.status_code = 200
    mock_post.return_value.json = AsyncMock(return_value={"id": "123"})
    mock_post.return_value.raise_for_status = AsyncMock()
    headers = {"Authorization": "Bearer testtoken"}
    response = client.post(
        "/forecast",
        json={"data": [], "model_type": "xgboost", "forecast_horizon": 7, "feature_groups": [], "target_col": "sales", "date_col": "date", "menu_col": "menu"},
        headers=headers
    )
    assert response.status_code == 200
    assert "id" in response.json() 