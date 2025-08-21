@echo off
echo Starting SEO Tag Visualizer Backend...
echo.
echo Installing Python dependencies...
pip install -r requirements.txt
echo.
echo Starting FastAPI server on http://localhost:8000
cd backend
python main.py
pause
