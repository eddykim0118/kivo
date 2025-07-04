# Sales Forecasting Application

A full-stack application for sales forecasting with a React frontend and FastAPI backend.

## Project Structure

```
forecasting-app/
├── frontend/          # React TypeScript frontend
└── backend/           # FastAPI Python backend
```

## Quick Start with Docker

1. Make sure you have Docker Desktop installed on your system:
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop

2. Build and start the services:
   ```bash
   docker compose up --build
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development with Docker

The application is configured for development with hot reloading:

- Frontend changes will automatically reload in the browser
- Backend changes will automatically restart the server
- Node modules and Python packages are properly cached
- Source code is mounted as volumes for instant updates

## Manual Setup (Alternative)

If you prefer to run the services directly:

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd forecasting-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd forecasting-app/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   uvicorn app:app --reload
   ```

## Features

- Data upload and validation
- Model configuration
- Sales forecasting
- Results visualization
- Interactive dashboard

## Development Notes

- The frontend runs on port 3000 and connects to the backend on port 8000
- Hot reloading is enabled for both frontend and backend
- Environment variables are configured in docker-compose.yml
- Node modules and Python packages are cached in Docker volumes
- No need for local virtual environments when using Docker
