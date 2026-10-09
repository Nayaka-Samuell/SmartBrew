@echo off
echo ========================================================
echo Memecah agen menjadi 2 kru (Frontend & Backend)
echo Model: Gemini 1.5 Pro (versi Pro tertinggi saat ini)
echo ========================================================
echo.

echo Menyiapkan kru Backend...
start cmd /k "title Crewmate: Backend && cd backend && pi --model google/gemini-1.5-pro --name BackendCrew"

echo Menyiapkan kru Frontend...
start cmd /k "title Crewmate: Frontend && cd frontend && pi --model google/gemini-1.5-pro --name FrontendCrew"

echo.
echo Kedua kru (agen) sudah berhasil dipanggil di jendela terpisah!
echo Mereka sekarang berfokus di foldernya masing-masing.
echo.
pause
