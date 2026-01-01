#!/bin/bash
set -e

echo "Building for production..."

read -p "Are you sure you want to build for PRODUCTION? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Build cancelled."
    exit 1
fi

# Run tests first
./test.sh

# Build the package
npm run build

echo "Production build complete!"
echo "Run 'npm version <patch|minor|major>' then 'npm publish' to release"
