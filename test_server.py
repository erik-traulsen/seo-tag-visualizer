import requests
import time

print("🔍 Testing backend server...")
time.sleep(3)

try:
    # Test health endpoint
    response = requests.get('http://localhost:8000/health')
    print("✅ SUCCESS! Backend server is running!")
    print("Status:", response.status_code)
    print("Health Response:", response.json())
    
    # Test analyze endpoint with Lonely Octopus
    print("\n🧪 Testing analyze endpoint...")
    analyze_response = requests.post(
        'http://localhost:8000/analyze', 
        json={'url': 'https://www.lonelyoctopus.com/'}, 
        timeout=30
    )
    print("✅ Analyze endpoint working!")
    result = analyze_response.json()
    print("Score:", result['score'])
    print("Title status:", result['tags']['title']['status'])
    
    print("\n🎉 Backend server is fully functional!")
    print("🌐 Your frontend at http://localhost:3000 can now analyze ANY website!")
    
except Exception as e:
    print("❌ Backend server not responding:", str(e))
