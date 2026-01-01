#!/bin/bash
set -e

echo "Starting development environment..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    npm install
fi

# Start in watch mode
echo "Starting watch mode..."
echo "Run 'npm run storybook:web' in another terminal for component development"
npm run dev
