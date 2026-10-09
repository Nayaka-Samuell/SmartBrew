import os
import joblib
import pandas as pd
import random
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

def train_dummy_models():
    print("Menyiapkan dataset biji kopi yang diperluas...")
    
    # Daftar negara penghasil kopi besar
    countries = [
        # Indonesia
        'Indonesia', 'Sumatra', 'Java', 'Bali', 'Sulawesi', 'Papua', 'Flores',
        # Afrika
        'Ethiopia', 'Kenya', 'Rwanda', 'Burundi', 'Tanzania', 'Uganda',
        # Amerika Tengah & Selatan
        'Colombia', 'Brazil', 'Costa Rica', 'Guatemala', 'Panama', 'Peru', 'Ecuador', 'Honduras',
        # Asia lainnya
        'Vietnam', 'India', 'Yemen', 'Myanmar'
    ]
    
    # Proses
    processes = ['Natural / Dry', 'Washed / Wet', 'Honey', 'Anaerobic', 'Experimental']
    
    # Target hasil (simplifikasi dummy rules)
    suhu_options = ['88C', '89C', '90C', '91C', '92C', '93C', '94C']
    grind_options = ['Medium-Fine', 'Medium', 'Medium-Coarse', 'Coarse']

    data = []
    
    # Generate 500 baris data dummy dengan variasi acak agar model tidak error saat user mencoba negara ini
    for _ in range(500):
        country = random.choice(countries)
        process = random.choice(processes)
        aroma = round(random.uniform(6.0, 10.0), 1)
        aftertaste = round(random.uniform(6.0, 10.0), 1)
        acidity = round(random.uniform(6.0, 10.0), 1)
        
        # Simple logic to make the tree learn something vaguely realistic
        if process == 'Natural / Dry' or process == 'Anaerobic':
            suhu = random.choice(['88C', '89C', '90C'])
            grind = random.choice(['Medium-Coarse', 'Coarse'])
        elif process == 'Washed / Wet':
            suhu = random.choice(['92C', '93C', '94C'])
            grind = random.choice(['Medium-Fine', 'Medium'])
        else:
            suhu = random.choice(['90C', '91C', '92C'])
            grind = random.choice(['Medium', 'Medium-Coarse'])
            
        # High acidity/aroma -> hotter water sometimes
        if acidity > 8.5:
            suhu = '93C'
            
        data.append({
            'country': country,
            'process': process,
            'aroma': aroma,
            'aftertaste': aftertaste,
            'acidity': acidity,
            'suhu_air': suhu,
            'ukuran_gilingan': grind
        })
    
    df = pd.DataFrame(data)

    print("Melatih Label Encoder...")
    le_country = LabelEncoder()
    df['country_enc'] = le_country.fit_transform(df['country'])
    
    le_process = LabelEncoder()
    df['process_enc'] = le_process.fit_transform(df['process'])

    X = df[['country_enc', 'process_enc', 'aroma', 'aftertaste', 'acidity']]
    y_suhu = df['suhu_air']
    y_grind = df['ukuran_gilingan']

    print("Melatih model Decision Tree...")
    model_suhu = DecisionTreeClassifier(max_depth=5)
    model_suhu.fit(X, y_suhu)

    model_grind = DecisionTreeClassifier(max_depth=5)
    model_grind.fit(X, y_grind)

    # Path folder penyimpanan
    model_dir = os.path.join(os.path.dirname(__file__), "ai_models")
    os.makedirs(model_dir, exist_ok=True)

    print("Menyimpan model ke folder ai_models/...")
    joblib.dump(le_country, os.path.join(model_dir, "le_country.pkl"))
    joblib.dump(le_process, os.path.join(model_dir, "le_process.pkl"))
    joblib.dump(model_suhu, os.path.join(model_dir, "model_suhu_kopi.pkl"))
    joblib.dump(model_grind, os.path.join(model_dir, "model_grind_kopi.pkl"))

    print("[OK] Selesai! Model yang diperluas berhasil dibuat.")

if __name__ == "__main__":
    train_dummy_models()