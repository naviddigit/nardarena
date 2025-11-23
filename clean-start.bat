@echo off
echo ==========================================
echo   Clean Start - NardAria v3
echo ==========================================
echo.

REM Kill all existing node processes
echo [1/3] Cleaning up old processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Start backend
echo [2/3] Starting Backend (Port 3002)...
cd backgammon-auth-backend
start "NardAria Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

REM Start frontend
echo [3/3] Starting Frontend (Port 5173)...
cd ..\backgammon-frontend
start "NardAria Frontend" cmd /k "npm run dev"

echo.
echo ==========================================
echo   All services started!
echo ==========================================
echo.
echo Backend:  http://localhost:3002
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul
