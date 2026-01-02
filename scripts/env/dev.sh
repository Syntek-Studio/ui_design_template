#!/bin/bash
#
# Development Environment Setup Script
#
# Sets up the development environment for working on the UI component library.
# This script handles dependency installation and starts the build watch mode.
#
# Usage:
#   ./scripts/env/dev.sh
#
# What it does:
#   1. Installs npm dependencies if node_modules doesn't exist
#   2. Starts the build in watch mode (rebuilds on file changes)
#   3. Provides instructions for starting Storybook
#
# Environment:
#   - Requires Node.js and npm to be installed
#   - Runs in strict mode (set -e) to fail on errors
#
# Next steps after running:
#   - Run 'npm run storybook:web' in another terminal for component development
#   - Edit components in src/web/components/ or src/mobile/components/
#   - Watch mode will automatically rebuild on save
#
# Exit codes:
#   0 - Success
#   1 - npm install or npm run dev failed
#

set -e

echo "Starting development environment..."

# Install dependencies if needed
# This check prevents unnecessary reinstalls when node_modules already exists
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Start in watch mode
# Watch mode automatically rebuilds the library when source files change
echo "Starting watch mode..."
echo "Run 'npm run storybook:web' in another terminal for component development"
npm run dev
