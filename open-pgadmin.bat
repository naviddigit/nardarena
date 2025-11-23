@echo off
title PostgreSQL - Install pgAdmin

echo ========================================
echo   Installing pgAdmin (Web Interface)
echo ========================================
echo.

echo Checking if pgAdmin is installed...
where pgadmin4 >nul 2>&1
if %errorlevel% equ 0 (
    echo pgAdmin is already installed!
    echo Starting pgAdmin...
    start "" "C:\Program Files\pgAdmin 4\runtime\pgAdmin4.exe"
    timeout /t 3
    start http://localhost:5050
    echo.
    echo pgAdmin should open in your browser
    pause
    exit /b 0
)

echo pgAdmin not found!
echo.
echo Option 1: Download and install pgAdmin
echo   URL: https://www.pgadmin.org/download/pgadmin-4-windows/
echo.
echo Option 2: Use Adminer (lightweight PHP tool)
echo   I can set it up for you
echo.
choice /C 12 /N /M "Choose (1=Download pgAdmin, 2=Setup Adminer): "

if errorlevel 2 goto setup_adminer
if errorlevel 1 goto download_pgadmin

:download_pgadmin
start https://www.pgadmin.org/download/pgadmin-4-windows/
echo.
echo Opening download page...
echo After installing, run this file again to start pgAdmin
pause
exit /b 0

:setup_adminer
echo.
echo Installing Adminer...
echo.

:: Check if PHP is installed
where php >nul 2>&1
if errorlevel 1 (
    echo PHP not found. Installing via Chocolatey...
    choco install php -y
    if errorlevel 1 (
        echo Failed to install PHP
        echo Please install XAMPP or PHP manually
        pause
        exit /b 1
    )
)

:: Download Adminer
mkdir "%~dp0..\adminer" 2>nul
cd /d "%~dp0..\adminer"
echo Downloading Adminer...
curl -L -o adminer.php https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php

echo.
echo Starting Adminer on http://localhost:8080
echo.
start "Adminer" cmd /k "php -S localhost:8080 adminer.php"
timeout /t 3
start http://localhost:8080/adminer.php

echo.
echo ========================================
echo Adminer is running!
echo ========================================
echo.
echo Open: http://localhost:8080/adminer.php
echo.
echo Login details:
echo   System: PostgreSQL
echo   Server: localhost
echo   Username: postgres
echo   Password: 123456
echo   Database: nardarena
echo ========================================
pause
exit /b 0
