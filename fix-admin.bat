@echo off
title PostgreSQL - Fix Admin NOW

echo Fixing admin account...
echo.

psql -U postgres -d nardarena -c "UPDATE users SET \"isActive\"=true, \"isEmailVerified\"=true WHERE email='admin@nardarena.com';"

echo.
echo Done! Admin is now active.
pause
