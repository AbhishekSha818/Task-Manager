#!/bin/bash

# Smart Task Manager - Quick Start Script
# This script helps you get the app running quickly

echo "=================================="
echo "Smart Task Manager - Quick Start"
echo "=================================="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
echo "=================================="
cd backend
pnpm install

echo ""
echo "✅ Backend dependencies installed!"
echo ""
echo "Starting backend server..."
echo "Run: pnpm dev"
echo "Server will run on: http://localhost:5000"
echo ""

# Setup Frontend
echo ""
echo "📱 Setting up Frontend..."
echo "=================================="
cd ../frontend
pnpm install

echo ""
echo "✅ Frontend dependencies installed!"
echo ""
echo "Starting frontend app..."
echo "Run: pnpm start"
echo ""

echo "=================================="
echo "Setup Complete! 🎉"
echo "=================================="
echo ""
echo "Next Steps:"
echo "1. In one terminal: cd backend && pnpm dev"
echo "2. In another terminal: cd frontend && pnpm start"
echo "3. Select platform (i for iOS, a for Android, w for web)"
echo "4. Register a new account or login"
echo ""
echo "Enjoy using Smart Task Manager! 🚀"
