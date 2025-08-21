#!/usr/bin/env powershell
# SEO Tag Visualizer - Complete Application Startup Script
# This script starts both the backend and frontend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SEO Tag Visualizer - Full Stack App  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# Check if ports are already in use
Write-Host "Checking ports..." -ForegroundColor Yellow
if (Test-Port 8000) {
    Write-Host "WARNING: Port 8000 is already in use (Backend)" -ForegroundColor Red
    Write-Host "Please stop any existing backend server and try again." -ForegroundColor Red
    pause
    exit 1
}

if (Test-Port 3000) {
    Write-Host "WARNING: Port 3000 is already in use (Frontend)" -ForegroundColor Red
    Write-Host "Please stop any existing frontend server and try again." -ForegroundColor Red
    pause
    exit 1
}

Write-Host "Ports 3000 and 8000 are available!" -ForegroundColor Green
Write-Host ""

# Install dependencies if needed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Node.js dependencies!" -ForegroundColor Red
        pause
        exit 1
    }
}

# Check Python dependencies
try {
    python -c "import fastapi, uvicorn, requests, beautifulsoup4" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
        pip install -r requirements.txt
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to install Python dependencies!" -ForegroundColor Red
            pause
            exit 1
        }
    }
} catch {
    Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
}

Write-Host "Dependencies ready!" -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Write-Host "Location: backend/simple_server.py" -ForegroundColor Gray
Write-Host "URL: http://localhost:8000" -ForegroundColor Gray

$backendJob = Start-Job -ScriptBlock {
    Set-Location $args[0]
    Set-Location "backend"
    python simple_server.py
} -ArgumentList (Get-Location)

Start-Sleep -Seconds 3

# Check if backend started successfully
if (Test-Port 8000) {
    Write-Host "Backend Server: STARTED!" -ForegroundColor Green
} else {
    Write-Host "Backend Server: FAILED TO START!" -ForegroundColor Red
    Stop-Job $backendJob
    Remove-Job $backendJob
    pause
    exit 1
}

Write-Host ""

# Start Frontend Server
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "Location: React Development Server" -ForegroundColor Gray
Write-Host "URL: http://localhost:3000" -ForegroundColor Gray

$frontendJob = Start-Job -ScriptBlock {
    Set-Location $args[0]
    npm start
} -ArgumentList (Get-Location)

# Wait for frontend to start
Write-Host "Waiting for frontend server to start..." -ForegroundColor Yellow
$timeout = 60  # 60 seconds timeout
$elapsed = 0
do {
    Start-Sleep -Seconds 2
    $elapsed += 2
    Write-Host "." -NoNewline -ForegroundColor Yellow
} while (-not (Test-Port 3000) -and $elapsed -lt $timeout)

Write-Host ""

if (Test-Port 3000) {
    Write-Host "Frontend Server: STARTED!" -ForegroundColor Green
} else {
    Write-Host "Frontend Server: FAILED TO START!" -ForegroundColor Red
    Stop-Job $backendJob, $frontendJob
    Remove-Job $backendJob, $frontendJob
    pause
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "     APPLICATION SUCCESSFULLY STARTED   " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend App: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Both servers are running in the background." -ForegroundColor White
Write-Host "Press any key to stop all servers and exit..." -ForegroundColor Yellow
pause

# Cleanup
Write-Host ""
Write-Host "Stopping servers..." -ForegroundColor Yellow
Stop-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
Remove-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue

# Kill any remaining processes on these ports
try {
    $processes = Get-NetTCPConnection -LocalPort 3000, 8000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    foreach ($pid in $processes) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
} catch {
    # Ignore errors
}

Write-Host "All servers stopped." -ForegroundColor Green
Write-Host "Thank you for using SEO Tag Visualizer!" -ForegroundColor Cyan
