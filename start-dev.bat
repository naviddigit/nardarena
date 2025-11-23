@echo off
title Nard Arena - Start Development

echo ========================================
echo   Nard Arena Development Server
echo ========================================
echo.

echo [1/3] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    pause
    exit /b 1
)
echo [OK] Node.js is installed
echo.

echo [2/3] Checking PostgreSQL...
sc query postgresql-x64-18 | find "RUNNING" >nul 2>&1
if errorlevel 1 (
    echo [WARNING] PostgreSQL service not running!
    echo Trying to start it...
    net start postgresql-x64-18 >nul 2>&1
    timeout /t 2 /nobreak >nul
    sc query postgresql-x64-18 | find "RUNNING" >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Could not start PostgreSQL
        echo Backend will not work! Continue? (Y/N)
        choice /C YN /N /M ""
        if errorlevel 2 exit /b 1
    ) else (
        echo [OK] PostgreSQL started!
    )
) else (
    echo [OK] PostgreSQL is running
)
echo.

echo [3/3] Starting Services...
echo.

REM Check if backend is already running
netstat -ano | findstr ":3002" >nul 2>&1
if errorlevel 1 (
    echo Starting Backend on Port 3002...
    cd /d "%~dp0backgammon-auth-backend"
    start "Backend - Port 3002" cmd /k "npm run dev"
    echo Backend window opened!
    timeout /t 5 /nobreak >nul
) else (
    echo [OK] Backend already running on Port 3002
)
echo.

REM Check if frontend is already running
netstat -ano | findstr ":5173" >nul 2>&1
if errorlevel 1 (
    echo Starting Frontend on Port 5173...
    cd /d "%~dp0backgammon-frontend"
    start "Frontend - Port 5173" cmd /k "npm run dev"
    echo Frontend window opened!
) else (
    echo [OK] Frontend already running on Port 5173
)

echo.
echo ========================================
echo   Services Started!
echo ========================================
echo.
echo Backend:  http://localhost:3002
echo Frontend: http://localhost:5173
echo.
echo Admin: admin@nardarena.com / admin123
echo.
echo Two windows opened - Keep them open!
echo ========================================
echo.
pause
