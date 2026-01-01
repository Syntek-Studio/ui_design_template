#!/bin/bash
set -e

echo "Building for staging (prerelease)..."

# Run tests first
./test.sh

# Build the package
npm run build

# Bump prerelease version
npm version prerelease --preid=staging

echo "Staging build complete!"
echo "Run 'npm publish --tag staging' to publish prerelease"
