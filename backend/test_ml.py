import requests

data = {
    "country": "Indonesia",
    "process": "Natural / Dry",
    "aroma": 8.5,
    "aftertaste": 8.0,
    "acidity": 7.5
}
try:
    # We will test using ml_service directly since the server is not running
    import sys
    sys.path.append("C:/Users/nayaka/OneDrive/Documents/SEMESTER 5/Project Mandiri/backend")
    from ml_service import brewing_ai
    
    if brewing_ai.is_ready:
        res = brewing_ai.predict_recipe(**data)
        print("Prediksi berhasil:", res)
    else:
        print("Model belum siap:", brewing_ai.error_message)
except Exception as e:
    print("Error:", e)
