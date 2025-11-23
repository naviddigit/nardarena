@echo off
echo Opening pgAdmin...
start "" "C:\Program Files\PostgreSQL\18\pgAdmin 4\runtime\pgAdmin4.exe"
timeout /t 5 /nobreak >nul
start http://localhost:5050
echo.
echo If browser didn't open, go to: http://localhost:5050
pause
