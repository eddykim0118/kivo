import pytest
from unittest.mock import patch

@pytest.fixture(autouse=True)
def mock_supabase():
    with patch("api.services.supabase") as mock:
        # For handle_file_upload
        mock.table.return_value.insert.return_value.execute.return_value.data = [{"id": "123"}]
        # For list_uploaded_files
        mock.table.return_value.select.return_value.order.return_value.execute.return_value.data = [{"id": "123", "filename": "test.csv"}]
        # For get_job_status
        mock.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {"status": "PENDING"}
        # For get_results
        mock.table.return_value.select.return_value.eq.return_value.single.return_value.execute.return_value.data = {"results": {"forecast": [], "metrics": {}}}
        yield mock

@pytest.fixture(autouse=True)
def mock_s3():
    with patch("api.services.s3_client") as mock:
        mock.put_object.return_value = None
        yield mock 