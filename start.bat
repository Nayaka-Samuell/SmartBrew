@echo off
echo ========================================================
echo Memulai Smart Brewer ^& Co. App
echo ========================================================
echo.

:: Menjalankan Backend FastAPI di background (jendela baru)
echo [1/2] Menjalankan Backend FastAPI (port 8000)...
cd backend
start cmd /k "title Backend FastAPI && uvicorn main:app --reload"

:: Kembali ke folder utama
cd ..

:: Menginstal dependencies frontend jika belum ada (opsional, tapi bagus untuk jaga-jaga)
if not exist "frontend\node_modules\" (
    echo [2/2] Menginstal dependencies Frontend Next.js...
    cd frontend
    npm install
    cd ..
)

:: Menjalankan Frontend Next.js
echo [2/2] Menjalankan Frontend Next.js (port 3000)...
cd frontend
start cmd /k "title Frontend Next.js && npm run dev"

echo.
echo Semua layanan sedang berjalan di jendela baru!
echo - API Backend   : http://localhost:8000
echo - Frontend Web  : http://localhost:3000
echo.
echo Tekan tombol apa saja untuk menutup jendela ini...
pause > nul
