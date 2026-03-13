@echo off
REM Smart Task Manager - Quick Start Script for Windows

echo ==================================
echo Smart Task Manager - Quick Start
echo ==================================
echo.

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing pnpm...
    call npm install -g pnpm
)

REM Setup Backend
echo.
echo Package setup Backend...
echo ==================================
cd backend
call pnpm install

echo.
echo Backend dependencies installed!
echo.
echo To start backend server, run:
echo   pnpm dev
echo Server will run on: http://localhost:5000
echo.

REM Setup Frontend
echo.
echo Package setup Frontend...
echo ==================================
cd ..\frontend
call pnpm install

echo.
echo Frontend dependencies installed!
echo.
echo To start frontend app, run:
echo   pnpm start
echo.

echo ==================================
echo Setup Complete!
echo ==================================
echo.
echo Next Steps:
echo 1. Open two terminal windows
echo 2. In first terminal: cd backend ^&^& pnpm dev
echo 3. In second terminal: cd frontend ^&^& pnpm start
echo 4. Select platform (i for iOS, a for Android, w for web)
echo 5. Register a new account or login
echo.
echo Enjoy using Smart Task Manager!
echo.
pause
