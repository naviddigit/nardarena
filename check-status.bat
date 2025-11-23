@echo off
title Nard Arena - Status Check

echo ========================================
echo   Nard Arena Service Status
echo ========================================
echo.

echo [1/4] Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo     [X] Not installed
) else (
    for /f "tokens=*" %%a in ('node --version') do echo     [OK] %%a
)
echo.

echo [2/4] PostgreSQL
pg_isready -U postgres >nul 2>&1
if errorlevel 1 (
    echo     [X] Not running
) else (
    echo     [OK] Running
)
echo.

echo [3/4] Backend (Port 3002)
curl -s http://localhost:3002/health >nul 2>&1
if errorlevel 1 (
    echo     [X] Not running
) else (
    echo     [OK] http://localhost:3002
)
echo.

echo [4/4] Frontend (Port 5173)
curl -s http://localhost:5173 >nul 2>&1
if errorlevel 1 (
    echo     [X] Not running
) else (
    echo     [OK] http://localhost:5173
)
echo.

echo ========================================
echo.
pause
