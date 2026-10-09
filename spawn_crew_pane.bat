@echo off
echo ========================================================
echo Memecah agen menjadi 2 kru (Frontend & Backend) di Panes
echo ========================================================
echo.
echo Membuka kru di Windows Terminal Split Pane...
wt -d "%~dp0backend" cmd /k "title Crewmate: Backend && pi --model google/gemini-1.5-pro --name BackendCrew" ; split-pane -V -d "%~dp0frontend" cmd /k "title Crewmate: Frontend && pi --model google/gemini-1.5-pro --name FrontendCrew"
