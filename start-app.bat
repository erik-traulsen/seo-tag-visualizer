@echo off
title SEO Tag Visualizer - Full Stack Startup
color 0A

echo.
echo ========================================
echo   SEO Tag Visualizer - Full Stack App
echo ========================================
echo.

echo [1/4] Checking dependencies...
if not exist node_modules (
    echo Installing Node.js dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install Node.js dependencies!
        pause
        exit /b 1
    )
)

echo [2/4] Installing Python dependencies...
pip install -r requirements.txt >nul 2>&1

echo [3/4] Starting Backend Server...
start "SEO Backend Server" /min cmd /c "cd backend && python simple_server.py"
timeout /t 5 /nobreak >nul

echo [4/4] Starting Frontend Server...
start "SEO Frontend Server" /min cmd /c "npm start"

echo.
echo ========================================
echo     SERVERS STARTING...
echo ========================================
echo.
echo Backend API:  http://localhost:8000
echo Frontend App: http://localhost:3000
echo.
echo Both servers are starting in separate windows.
echo The browser should open automatically in ~30 seconds.
echo.
echo Close this window to keep servers running, or
pause
