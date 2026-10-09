from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_racik_resep():
    response = client.post(
        "/api/racik-resep",
        json={
            "country": "Indonesia",
            "process": "Natural / Dry",
            "aroma": 8.5,
            "aftertaste": 8.0,
            "acidity": 7.5
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "suhu_air" in data["data"]
    
    # Check if we can get a health check
    response_health = client.get("/")
    assert response_health.status_code == 200

if __name__ == "__main__":
    test_racik_resep()
    print("All tests passed!")
