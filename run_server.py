#!/usr/bin/env python3
"""
Simple server runner for the SEO Tag Visualizer backend
"""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    print("Starting SEO Tag Visualizer Backend Server...")
    print("Server will be available at: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        # Import and run the FastAPI app directly
        from main import app
        import uvicorn
        
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=8000,
            reload=False,  # Disable reload for stability
            log_level="info"
        )
        
    except KeyboardInterrupt:
        print("\nServer stopped by user.")
    except ImportError as e:
        print(f"Import error: {e}")
        print("Make sure all dependencies are installed: pip install -r requirements.txt")
    except Exception as e:
        print(f"Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
