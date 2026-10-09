import subprocess
import time
import requests

def run_tests():
    print("Starting server...")
    server = subprocess.Popen(["uvicorn", "main:app", "--port", "8001"])
    
    # Wait for server to start
    time.sleep(3)
    
    try:
        # Test health
        res = requests.get("http://127.0.0.1:8001/")
        assert res.status_code == 200, "Health check failed"
        
        # Test ML recommendation
        data = {
            "country": "Indonesia",
            "process": "Natural / Dry",
            "aroma": 8.5,
            "aftertaste": 8.0,
            "acidity": 7.5
        }
        res = requests.post("http://127.0.0.1:8001/api/racik-resep", json=data)
        assert res.status_code == 200, f"Recommendation failed: {res.text}"
        
        json_data = res.json()
        assert json_data["status"] == "success"
        print("Success! Response:", json_data)
        print("All tests passed!")
        
    finally:
        server.terminate()
        server.wait()

if __name__ == "__main__":
    run_tests()
