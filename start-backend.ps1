Write-Host "🚀 Starting SEO Tag Visualizer Backend Server..." -ForegroundColor Green
Write-Host "📍 Navigating to backend directory..." -ForegroundColor Yellow

Set-Location -Path "backend"

Write-Host "🔧 Starting FastAPI server on http://localhost:8000" -ForegroundColor Cyan
Write-Host "📋 API Documentation will be available at http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "❌ Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host "=" * 60 -ForegroundColor Gray

try {
    python main.py
} catch {
    Write-Host "❌ Error starting server: $_" -ForegroundColor Red
    Write-Host "💡 Make sure Python and dependencies are installed:" -ForegroundColor Yellow
    Write-Host "   pip install -r requirements.txt" -ForegroundColor White
}

Write-Host "✅ Server stopped." -ForegroundColor Green
pause
