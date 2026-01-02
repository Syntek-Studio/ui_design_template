#!/bin/bash
#
# Staging Build Script
#
# Prepares the library for staging/prerelease publication.
# This script runs all tests, builds the library, and bumps the prerelease version.
#
# Usage:
#   ./scripts/env/staging.sh
#
# What it does:
#   1. Runs full test suite (test.sh)
#   2. Builds the library (npm run build)
#   3. Bumps version with prerelease tag (e.g., 0.7.1 → 0.7.2-staging.0)
#   4. Updates package.json and creates git tags
#
# Version numbering:
#   - Staging versions use --preid=staging
#   - Example progression: 0.7.1 → 0.7.2-staging.0 → 0.7.2-staging.1
#   - Provides testing versions before production release
#
# Environment:
#   - Requires Node.js, npm, and git
#   - Runs in strict mode (set -e) to fail fast on errors
#   - Must have clean working directory (no uncommitted changes)
#
# Next steps:
#   - Publish with: npm publish --tag staging
#   - This publishes to npm with 'staging' distribution tag
#   - Install staging version: npm install @syntek-studio/ui@staging
#
# Exit codes:
#   0 - Successful staging build
#   1 - Tests failed, build failed, or version bump failed
#

set -e

echo "Building for staging (prerelease)..."

# Run tests first
# This ensures staging release is built from tested code
./scripts/env/test.sh

# Build the package
# Outputs CJS and ESM formats to dist/
npm run build

# Bump prerelease version
# Creates new prerelease version and updates package.json
npm version prerelease --preid=staging

echo "Staging build complete!"
echo "Run 'npm publish --tag staging' to publish prerelease"
