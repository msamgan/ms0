#!/bin/bash

# Start PHP-FPM in the background
php-fpm -D

# Check if node_modules exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Running npm install..."
    npm install
fi

# Start Vite dev server in the foreground
echo "Starting Vite development server..."
npm run dev
