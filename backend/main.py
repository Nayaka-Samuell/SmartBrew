# ==============================================================================
# main.py — FastAPI Entry Point
# Smart Brewer & Co. Backend API
# ==============================================================================

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from sqlalchemy.orm import Session

# Import singleton AI service
from ml_service import brewing_ai

# Database imports
import models
from database import engine, get_db

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# ==============================================================================
# Inisialisasi Aplikasi FastAPI
# ==============================================================================

app = FastAPI(
    title="Smart Brewer & Co. API",
    description="Backend API untuk rekomendasi resep seduhan V60 berbasis Machine Learning.",
    version="1.0.0",
)

# ==============================================================================
# CORS Middleware — WAJIB agar frontend Next.js (localhost:3000) bisa request
# ==============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================================================================
# Pydantic Models — Skema Validasi Input & Output
# ==============================================================================


class CoffeeRequest(BaseModel):
    """Skema request body untuk endpoint /api/racik-resep."""

    country: str = Field(
        ...,
        example="Indonesia",
        description="Negara asal biji kopi.",
    )
    process: str = Field(
        ...,
        example="Natural / Dry",
        description="Metode proses pasca-panen.",
    )
    aroma: float = Field(
        ...,
        ge=6.0,
        le=10.0,
        example=8.0,
        description="Skor aroma (6.0–10.0).",
    )
    aftertaste: float = Field(
        ...,
        ge=6.0,
        le=10.0,
        example=7.5,
        description="Skor aftertaste (6.0–10.0).",
    )
    acidity: float = Field(
        ...,
        ge=6.0,
        le=10.0,
        example=7.8,
        description="Skor kecerahan asam (6.0–10.0).",
    )


class DataResponse(BaseModel):
    suhu_air: str
    ukuran_gilingan: str

class RecipeResponse(BaseModel):
    """Skema response dari endpoint /api/racik-resep."""
    status: str
    data: Optional[DataResponse] = None
    message: Optional[str] = None


# ==============================================================================
# Data Statis Ensiklopedia (Dipindahkan dari Frontend)
# ==============================================================================

ENCYCLOPEDIA_DB = {
    "arabica": {
        "id": "arabica",
        "name": "Arabica",
        "emoji": "",
        "image": "/arabica.jpg",
        "sciName": "Coffea arabica",
        "altitude": "600 – 2.200 mdpl",
        "caffeine": "~1,2% – 1,5%",
        "flavor": "Kompleks, asam cerah, floral, buah-buahan",
        "aroma": "Harum, manis, nuansa karamel",
        "body": "Ringan hingga sedang",
        "note": "Pilihan utama kopi specialty dunia.",
        "bg": "bg-amber-50 border-amber-200",
        "badge": "bg-amber-100 text-amber-800",
        "detail": "Kopi Arabica adalah jenis kopi yang paling banyak dikonsumsi di seluruh dunia (menguasai sekitar 60-70% pasar global). Arabica sangat peka terhadap penyakit tanaman dan harus ditumbuhkan pada dataran tinggi yang sejuk. Karena perawatannya yang sulit, harganya cenderung lebih mahal, namun sepadan dengan spektrum rasa yang sangat luas dan kompleks."
    },
    "robusta": {
        "id": "robusta",
        "name": "Robusta",
        "emoji": "",
        "image": "/robusta.jpg",
        "sciName": "Coffea canephora",
        "altitude": "0 – 800 mdpl",
        "caffeine": "~2,0% – 2,7%",
        "flavor": "Kuat, pahit, tanah (earthy), kacang-kacangan",
        "aroma": "Kayu, biji-bijian, cokelat gelap",
        "body": "Berat, tebal",
        "note": "Tulang punggung espresso & kopi instan.",
        "bg": "bg-coffee-50 border-coffee-200",
        "badge": "bg-coffee-100 text-coffee-800",
        "detail": "Kopi Robusta memiliki daya tahan yang jauh lebih tangguh terhadap penyakit (leaf rust) dan dapat ditanam di dataran rendah. Kandungan kafeinnya nyaris dua kali lipat lebih tinggi dari Arabica, yang bertindak sebagai pestisida alami bagi tanaman ini. Rasa pahitnya yang khas dan cremanya yang tebal membuatnya sangat ideal untuk espresso blend."
    }
}


TOKO_DB = [
    {
        "id": "tuku",
        "name": "Toko Kopi Tuku",
        "location": "Jakarta",
        "image": "/tuku.jpg",
        "desc": "Pelopor kopi susu gula aren kekinian di Indonesia. Terkenal dengan 'Es Kopi Susu Tetangga'.",
        "specialty": "Kopi Susu Gula Aren",
        "rating": 4.8
    },
    {
        "id": "anomali",
        "name": "Anomali Coffee",
        "location": "Bali & Jakarta",
        "image": "/anomali.jpg",
        "desc": "Kurator kopi nusantara sejati. Mereka me-roast sendiri biji kopi single origin dari seluruh Indonesia.",
        "specialty": "Single Origin Nusantara",
        "rating": 4.7
    },
    {
        "id": "filosofi",
        "name": "Filosofi Kopi",
        "location": "Jakarta (Blok M)",
        "image": "/filosofi.jpg",
        "desc": "Lahir dari sebuah buku dan film ikonik, kedai ini menjadi destinasi wajib para penikmat kopi indie.",
        "specialty": "Lestari Blend, Perfecto Blend",
        "rating": 4.6
    },
    {
        "id": "seniman",
        "name": "Seniman Coffee Studio",
        "location": "Ubud, Bali",
        "image": "/seniman.jpg",
        "desc": "Pusat inovasi kopi di Ubud. Menyajikan kopi dengan sentuhan seni, dari metode seduh hingga presentasi.",
        "specialty": "Espresso Blend, Coffee Cocktails",
        "rating": 4.9
    }
]

PROSES_DB = [
    {
        "id": "washed",
        "name": "Washed / Wet",
        "icon": "💧",
        "image": "/washed.jpg",
        "color": "border-l-blue-400 bg-blue-50",
        "badge": "bg-blue-100 text-blue-800",
        "desc": "Kulit dan lendir dihilangkan sepenuhnya dengan air sebelum biji dikeringkan. Menghasilkan rasa yang sangat bersih, menonjolkan terroir asli.",
        "flavor": "Cerah, asam bersih, jeruk, bunga — body ringan.",
        "examples": "Ethiopia Yirgacheffe, Guatemala Antigua"
    },
    {
        "id": "natural",
        "name": "Natural / Dry",
        "icon": "☀️",
        "image": "/natural.jpg",
        "color": "border-l-yellow-400 bg-yellow-50",
        "badge": "bg-yellow-100 text-yellow-800",
        "desc": "Buah kopi dikeringkan utuh bersama kulitnya di bawah sinar matahari. Gula buah terserap perlahan ke dalam biji.",
        "flavor": "Fruity intens, stroberi, blueberry — body berat, manis.",
        "examples": "Brazil Cerrado, Ethiopia Sidama"
    },
    {
        "id": "honey",
        "name": "Honey Process",
        "icon": "🍯",
        "image": "/honey.jpg",
        "color": "border-l-orange-400 bg-orange-50",
        "badge": "bg-orange-100 text-orange-800",
        "desc": "Kulit dibuang, namun sebagian lendir (mucilage) yang lengket seperti madu dibiarkan menempel saat pengeringan.",
        "flavor": "Manis karamel, brown sugar, buah matang — balance.",
        "examples": "Costa Rica Tarrazu, Flores Bajawa Honey"
    },
    {
        "id": "anaerobic",
        "name": "Anaerobic Fermentation",
        "icon": "🔬",
        "image": "/anaerobic.jpg",
        "color": "border-l-purple-400 bg-purple-50",
        "badge": "bg-purple-100 text-purple-800",
        "desc": "Difermentasi dalam tangki tertutup kedap udara sebelum diproses lebih lanjut, menghasilkan profil rasa yang gila dan eksotis.",
        "flavor": "Kompleks, winey, anggur fermentasi, rempah — eksotis.",
        "examples": "Panama Geisha Anaerobic, Colombia Pink Bourbon"
    }
]

SANGRAI_DB = [
    {
        "id": "light",
        "name": "Light Roast",
        "color": "bg-[#c6a382]",
        "desc": "Disangrai dengan waktu singkat. Mempertahankan karakter asli (terroir) biji kopi secara maksimal.",
        "flavor": "Asam cerah (bright acidity), floral, fruity, seperti teh."
    },
    {
        "id": "medium",
        "name": "Medium Roast",
        "color": "bg-[#8b5a2b]",
        "desc": "Titik seimbang antara karakter asli biji dan rasa karamelisasi dari proses pemanggangan.",
        "flavor": "Balance, manis karamel, cokelat, sedikit fruity."
    },
    {
        "id": "dark",
        "name": "Dark Roast",
        "color": "bg-[#3e2723]",
        "desc": "Disangrai hingga minyak alami keluar. Karakter asli biji memudar digantikan rasa sangrai yang kuat.",
        "flavor": "Pahit, roasty, cokelat gelap, smokey, body tebal."
    }
]

SEDUH_DB = [
    {
        "id": "v60",
        "name": "Pour Over (V60)",
        "icon": "☕",
        "desc": "Metode seduh manual menggunakan filter kertas. Menghasilkan secangkir kopi yang sangat bersih (clean cup) dan menonjolkan aroma serta keasaman (acidity). Sangat cocok untuk kopi specialty bersangrai Light - Medium."
    },
    {
        "id": "espresso",
        "name": "Espresso",
        "icon": "⚡",
        "desc": "Diekstraksi dengan tekanan tinggi (9 bar). Menghasilkan kopi yang sangat kental, pekat, dan memiliki crema. Merupakan fondasi (base) untuk menu turunan seperti Latte, Cappuccino, dan Americano."
    },
    {
        "id": "french_press",
        "name": "French Press",
        "icon": "🫖",
        "desc": "Kopi direndam utuh lalu ditekan dengan saringan logam. Minyak alami (coffee oils) tidak tersaring, menghasilkan body yang sangat tebal dan tekstur yang pekat. Cocok untuk Medium - Dark roast."
    }
]

# ==============================================================================
# Endpoints
# ==============================================================================


@app.get("/", tags=["Health Check"])
def root():
    """Health check endpoint — verifikasi bahwa API berjalan."""
    return {
        "status": "ok",
        "app": "Smart Brewer & Co. API",
        "version": "1.0.0",
        "ai_ready": brewing_ai.is_ready,
    }


@app.get("/api/status", tags=["Health Check"])
def get_status():
    """Cek status kesiapan model AI."""
    return {
        "ai_ready": brewing_ai.is_ready,
        "message": (
            "Model AI siap digunakan." if brewing_ai.is_ready
            else brewing_ai.error_message
        ),
    }


@app.get("/api/ensiklopedia", tags=["Ensiklopedia"])
def get_ensiklopedia():
    """Mengembalikan daftar pop-up singkat ensiklopedia kopi."""
    # Return minimal data for the pop-up cards
    results = []
    for key, val in ENCYCLOPEDIA_DB.items():
        results.append({
            "id": val["id"],
            "name": val["name"],
            "emoji": val["emoji"],
            "image": val["image"],
            "note": val["note"],
            "bg": val["bg"],
            "badge": val["badge"]
        })
    return {"status": "success", "data": results}


@app.get("/api/toko", tags=["Toko"])
def get_toko():
    return {"status": "success", "data": TOKO_DB}

@app.get("/api/ensiklopedia/proses", tags=["Ensiklopedia"])
def get_proses_pasca_panen():
    return {"status": "success", "data": PROSES_DB}

@app.get("/api/ensiklopedia/sangrai", tags=["Ensiklopedia"])
def get_sangrai():
    return {"status": "success", "data": SANGRAI_DB}

@app.get("/api/ensiklopedia/seduh", tags=["Ensiklopedia"])
def get_seduh():
    return {"status": "success", "data": SEDUH_DB}

@app.get("/api/ensiklopedia/{kopi_id}", tags=["Ensiklopedia"])
def get_ensiklopedia_detail(kopi_id: str):
    """Mengembalikan detail penjelasan ensiklopedia kopi."""
    if kopi_id not in ENCYCLOPEDIA_DB:
        raise HTTPException(status_code=404, detail="Data kopi tidak ditemukan")
    return {"status": "success", "data": ENCYCLOPEDIA_DB[kopi_id]}

SHOP_BEANS_DB = [
    {
        "id": "b01",
        "name": "Ethiopia Yirgacheffe",
        "origin": "Yirgacheffe, Ethiopia",
        "price": 125000,
        "image": "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop",
        "process": "Washed",
        "roast": "Light Roast",
        "tasting_notes": ["Jasmine", "Bergamot", "Lemon", "Black Tea"],
        "description": "Kopi klasik dari tempat kelahiran kopi. Menawarkan profil rasa floral yang elegan dengan keasaman cerah yang mengingatkan pada teh Earl Grey."
    },
    {
        "id": "b02",
        "name": "Colombia Finca El Paraiso",
        "origin": "Cauca, Colombia",
        "price": 185000,
        "image": "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop",
        "process": "Double Anaerobic",
        "roast": "Light-Medium Roast",
        "tasting_notes": ["Lychee", "Peach", "Rose", "Strawberry Yogurt"],
        "description": "Kopi eksotis hasil fermentasi anaerobik ganda oleh Diego Bermudez. Rasa buah persik dan leci yang meledak dengan aroma mawar manis."
    },
    {
        "id": "b03",
        "name": "Flores Manggarai",
        "origin": "Manggarai, Flores, Indonesia",
        "price": 95000,
        "image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
        "process": "Yellow Honey",
        "roast": "Medium Roast",
        "tasting_notes": ["Brown Sugar", "Green Apple", "Milk Chocolate", "Walnut"],
        "description": "Kopi andalan Nusantara dengan rasa seimbang antara manisnya karamel dan sedikit rasa asam apel hijau yang menyegarkan."
    },
    {
        "id": "b04",
        "name": "Guatemala Antigua",
        "origin": "Antigua Valley, Guatemala",
        "price": 110000,
        "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
        "process": "Fully Washed",
        "roast": "Medium-Dark Roast",
        "tasting_notes": ["Dark Chocolate", "Caramel", "Spices", "Smokey"],
        "description": "Ditanam di tanah vulkanik yang kaya, memberikan cita rasa cokelat pekat yang khas dan sentuhan rempah serta smokey dari alam."
    },
    {
        "id": "b05",
        "name": "Kopi Bubuk Authentic",
        "origin": "Java, Indonesia",
        "price": 75000,
        "image": "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop",
        "process": "Natural",
        "roast": "Dark Roast",
        "tasting_notes": ["Dark Chocolate", "Nutty", "Bold"],
        "description": "Kopi bubuk tradisional dengan cita rasa autentik dan mantap, cocok untuk seduhan tubruk atau kopi susu."
    },
    {
        "id": "b06",
        "name": "Biji Kopi Premium",
        "origin": "Aceh Gayo, Indonesia",
        "price": 150000,
        "image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
        "process": "Semi-Washed",
        "roast": "Medium Roast",
        "tasting_notes": ["Spices", "Earth", "Tobacco", "Sweet Caramel"],
        "description": "Biji kopi premium pilihan dengan aroma rempah dan sentuhan earthy khas kopi Gayo kualitas ekspor."
    }
]

@app.get("/api/shop/beans", tags=["Shop"])
def get_shop_beans():
    """Mengembalikan daftar biji kopi yang dijual beserta detail spesifik jualan."""
    return {"status": "success", "data": SHOP_BEANS_DB}

@app.post(
    "/api/racik-resep",
    response_model=RecipeResponse,
    tags=["Smart Brewer AI"],
    summary="Dapatkan Rekomendasi Resep Seduhan V60",
)
def racik_resep(request: CoffeeRequest, db: Session = Depends(get_db)):
    """
    Menerima profil biji kopi dan mengembalikan rekomendasi
    parameter seduhan V60 (suhu air & grind size) dari model ML.
    """
    # Cek apakah model siap
    if not brewing_ai.is_ready:
        raise HTTPException(
            status_code=503,
            detail={
                "success": False,
                "message": (
                    f"Model AI belum siap. {brewing_ai.error_message}"
                ),
            },
        )

    try:
        # Panggil predict dari singleton AI service
        result = brewing_ai.predict_recipe(
            country=request.country,
            process=request.process,
            aroma=request.aroma,
            aftertaste=request.aftertaste,
            acidity=request.acidity,
        )
        
        # Simpan ke Database SQLite
        new_history = models.RecommendationHistory(
            country=request.country,
            process=request.process,
            aroma=request.aroma,
            aftertaste=request.aftertaste,
            acidity=request.acidity,
            suhu_air=result["suhu_air"],
            ukuran_gilingan=result["ukuran_gilingan"]
        )
        db.add(new_history)
        db.commit()
        db.refresh(new_history)

        return RecipeResponse(
            status="success",
            data=DataResponse(
                suhu_air=result["suhu_air"],
                ukuran_gilingan=result["ukuran_gilingan"]
            ),
            message="Resep berhasil diracik!"
        )

    except ValueError as e:
        # Input tidak dikenal oleh Label Encoder
        raise HTTPException(status_code=422, detail=str(e))

    except Exception as e:
        # Error tidak terduga lainnya
        raise HTTPException(status_code=500, detail=str(e))

