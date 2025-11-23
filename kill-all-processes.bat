@echo off
echo ==========================================
echo   Stopping All Node Processes
echo ==========================================
echo.

REM Kill all node processes
echo Killing all node.exe processes...
taskkill /F /IM node.exe >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    echo [OK] All node processes killed successfully!
) else (
    echo [INFO] No node processes were running.
)

echo.
echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo.
echo ==========================================
echo   All processes cleaned up!
echo ==========================================
echo.
pause
