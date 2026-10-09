from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
import datetime

class RecommendationHistory(Base):
    __tablename__ = "recommendation_history"

    id = Column(Integer, primary_key=True, index=True)
    
    # Input Pengguna
    country = Column(String, index=True)
    process = Column(String, index=True)
    aroma = Column(Float)
    aftertaste = Column(Float)
    acidity = Column(Float)
    
    # Hasil Prediksi ML
    suhu_air = Column(String)
    ukuran_gilingan = Column(String)
    
    # Timestamp
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
