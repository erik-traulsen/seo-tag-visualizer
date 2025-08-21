import requests
import time

print("🔍 Testing backend server...")
time.sleep(8)

try:
    response = requests.get('http://localhost:8000/health', timeout=5)
    print("✅ SUCCESS! Backend server is running!")
    print("Status:", response.status_code)
    print("Response:", response.json())
    
    # Test the analyze endpoint
    print("\n🧪 Testing analyze endpoint with Lonely Octopus...")
    analyze_response = requests.post(
        'http://localhost:8000/analyze', 
        json={'url': 'https://www.lonelyoctopus.com/'}, 
        timeout=30
    )
    print("✅ Analyze endpoint working!")
    print("Score:", analyze_response.json()['score'])
    
except Exception as e:
    print("❌ Backend server not responding:", str(e))
    print("\n💡 Try these steps:")
    print("1. Make sure you're in the backend directory")
    print("2. Run: python main.py")
    print("3. Wait for 'Application startup complete' message")
