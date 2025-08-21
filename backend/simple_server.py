#!/usr/bin/env python3
"""
Simple HTTP server for testing the SEO analyzer without FastAPI/uvicorn
"""

import json
import sys
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import threading

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import our SEO analyzer
try:
    from main import SEOAnalyzer
    analyzer = SEOAnalyzer()
    print("✅ SEO Analyzer imported successfully")
except Exception as e:
    print(f"❌ Failed to import SEO Analyzer: {e}")
    sys.exit(1)

class SEOHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {"status": "healthy"}
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/analyze':
            try:
                # Read request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                url = data.get('url')
                if not url:
                    self.send_error(400, "URL is required")
                    return
                
                print(f"🔍 Analyzing: {url}")
                
                # Analyze the URL
                result = analyzer.analyze_url(url)
                
                # Convert to dict for JSON serialization
                response_data = {
                    "url": result.url,
                    "score": result.score,
                    "tags": {k: {
                        "tag": v.tag,
                        "value": v.value,
                        "status": v.status,
                        "message": v.message
                    } for k, v in result.tags.items()},
                    "previews": result.previews
                }
                
                # Send response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response_json = json.dumps(response_data, indent=2)
                self.wfile.write(response_json.encode())
                
                print(f"✅ Analysis complete. Score: {result.score}/100")
                
            except Exception as e:
                print(f"❌ Error analyzing URL: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                error_response = {"detail": str(e)}
                self.wfile.write(json.dumps(error_response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        # Suppress default logging
        pass

def main():
    port = 8000
    server_address = ('', port)
    
    print("🚀 Starting SEO Tag Visualizer Backend Server...")
    print(f"📡 Server running at: http://localhost:{port}")
    print(f"🔍 Health check: http://localhost:{port}/health")
    print(f"📋 Analyze endpoint: POST http://localhost:{port}/analyze")
    print("❌ Press Ctrl+C to stop")
    print("-" * 60)
    
    try:
        httpd = HTTPServer(server_address, SEOHandler)
        print(f"✅ Server started successfully on port {port}")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")

if __name__ == "__main__":
    main()
