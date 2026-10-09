# ==============================================================================
# ml_service.py — CoffeeBrewingAI Service (OOP)
# Bertanggung jawab untuk memuat model ML dan melakukan prediksi resep.
# ==============================================================================

import os
import numpy as np

# Coba import joblib; tandai jika tidak tersedia
try:
    import joblib
    JOBLIB_AVAILABLE = True
except ImportError:
    JOBLIB_AVAILABLE = False

# Path ke direktori model relatif terhadap file ini
MODEL_DIR = os.path.join(os.path.dirname(__file__), "ai_models")


class CoffeeBrewingAI:
    """
    Service class untuk memuat model Machine Learning dan memprediksi
    parameter seduhan V60 optimal berdasarkan profil biji kopi.
    """

    def __init__(self):
        """
        Inisialisasi: muat semua model .pkl dari folder ai_models/.
        Set flag `is_ready` berdasarkan keberhasilan pemuatan.
        """
        self.is_ready: bool = False
        self.error_message: str = ""

        # Jaga-jaga jika joblib tidak terinstal
        if not JOBLIB_AVAILABLE:
            self.error_message = "Library 'joblib' tidak terinstal di environment."
            return

        try:
            # ----------------------------------------------------------------
            # Muat Label Encoders (untuk mengubah string → integer)
            # ----------------------------------------------------------------
            self.le_country = joblib.load(
                os.path.join(MODEL_DIR, "le_country.pkl")
            )
            self.le_process = joblib.load(
                os.path.join(MODEL_DIR, "le_process.pkl")
            )

            # ----------------------------------------------------------------
            # Muat Decision Tree Classifiers (model prediksi)
            # ----------------------------------------------------------------
            self.model_suhu = joblib.load(
                os.path.join(MODEL_DIR, "model_suhu_kopi.pkl")
            )
            self.model_grind = joblib.load(
                os.path.join(MODEL_DIR, "model_grind_kopi.pkl")
            )

            # Tandai model siap digunakan
            self.is_ready = True
            print("[CoffeeBrewingAI] [OK] Semua model berhasil dimuat.")

        except FileNotFoundError as e:
            self.error_message = (
                f"File model tidak ditemukan: {e.filename}. "
                "Pastikan semua file .pkl ada di folder 'ai_models/'."
            )
            print(f"[CoffeeBrewingAI] [ERROR] {self.error_message}")

        except Exception as e:
            self.error_message = f"Gagal memuat model: {str(e)}"
            print(f"[CoffeeBrewingAI] [ERROR] {self.error_message}")

    def predict_recipe(
        self,
        country: str,
        process: str,
        aroma: float,
        aftertaste: float,
        acidity: float,
    ) -> dict:
        """
        Memprediksi parameter seduhan V60 berdasarkan profil kopi.

        Args:
            country     : Negara asal biji kopi (misal: "Indonesia")
            process     : Metode pasca-panen (misal: "Natural / Dry")
            aroma       : Skor aroma (6.0 – 10.0)
            aftertaste  : Skor aftertaste (6.0 – 10.0)
            acidity     : Skor kecerahan asam (6.0 – 10.0)

        Returns:
            dict berisi "suhu_air" dan "ukuran_gilingan"

        Raises:
            RuntimeError : Jika model belum siap
            ValueError   : Jika nilai input tidak dikenal oleh encoder
        """
        if not self.is_ready:
            raise RuntimeError(
                f"Model AI belum siap. {self.error_message}"
            )

        # ----------------------------------------------------------------
        # Encode input teks → integer menggunakan Label Encoder
        # ----------------------------------------------------------------
        try:
            country_enc = self.le_country.transform([country])[0]
        except ValueError:
            known = list(self.le_country.classes_)
            raise ValueError(
                f"Negara '{country}' tidak dikenal. Pilihan valid: {known}"
            )

        try:
            process_enc = self.le_process.transform([process])[0]
        except ValueError:
            known = list(self.le_process.classes_)
            raise ValueError(
                f"Proses '{process}' tidak dikenal. Pilihan valid: {known}"
            )

        # ----------------------------------------------------------------
        # Susun array fitur: [country, process, aroma, aftertaste, acidity]
        # ----------------------------------------------------------------
        features = np.array(
            [[country_enc, process_enc, aroma, aftertaste, acidity]],
            dtype=float,
        )

        # ----------------------------------------------------------------
        # Prediksi menggunakan kedua model Decision Tree
        # ----------------------------------------------------------------
        suhu_air: str = str(self.model_suhu.predict(features)[0])
        ukuran_gilingan: str = str(self.model_grind.predict(features)[0])

        return {
            "suhu_air": suhu_air,
            "ukuran_gilingan": ukuran_gilingan,
        }


# Singleton instance — dibuat satu kali saat modul dimuat
brewing_ai = CoffeeBrewingAI()

