@echo off
title Nard Arena - Stop Services

echo ========================================
echo   Stopping Nard Arena Services
echo ========================================
echo.

REM Stop Backend on Port 3002
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3002" 2^>nul') do (
    echo Stopping Backend on Port 3002 ^(PID: %%a^)
    taskkill /F /PID %%a >nul 2>&1
)

REM Stop Frontend on Port 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" 2^>nul') do (
    echo Stopping Frontend on Port 5173 ^(PID: %%a^)
    taskkill /F /PID %%a >nul 2>&1
)

REM Check if any processes were found
netstat -ano | findstr ":3002 :5173" >nul 2>&1
if errorlevel 1 (
    echo [OK] All Nard Arena services stopped!
) else (
    echo [WARNING] Some services may still be running
)

echo.
echo Done!
timeout /t 2 /nobreak >nul
