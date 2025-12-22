#!/bin/bash
set -e

echo "Running test suite..."

npm test

echo "Running type check..."
npm run type-check

echo "Running linter..."
npm run lint

echo "All checks complete!"
