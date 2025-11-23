@echo off
title PostgreSQL - View Admin User

echo Connecting to PostgreSQL...
echo.

psql -U postgres -d nardarena -c "SELECT id, email, username, role, \"isActive\", \"isEmailVerified\" FROM users WHERE email='admin@nardarena.com';"

echo.
pause
