#!/bin/bash
#
# Production Build Script
#
# Prepares the library for production publication.
# Requires explicit confirmation to proceed as this is a significant operation.
#
# Usage:
#   ./scripts/env/production.sh
#
# What it does:
#   1. Requires user confirmation (safety check)
#   2. Runs full test suite
#   3. Builds the library for production
#   4. Provides instructions for version bump and publication
#
# Version numbering:
#   - Production uses semantic versioning (major.minor.patch)
#   - Example: 0.7.1 → 0.8.0 (minor) or 0.7.2 (patch)
#   - Run AFTER this script: npm version <patch|minor|major>
#
# Safety measures:
#   - Requires explicit "yes" confirmation
#   - Runs in strict mode (set -e) to fail fast
#   - Must pass all tests before building
#   - Cannot use --force, must fix all issues
#
# Environment:
#   - Requires Node.js, npm, and git
#   - Must have clean working directory
#   - Should be run from main or release branch
#
# Workflow:
#   1. Run this script: ./scripts/env/production.sh
#   2. Confirm with "yes"
#   3. After successful build, run: npm version <patch|minor|major>
#   4. Then run: npm publish
#   5. Create a GitHub release from the git tag
#
# Exit codes:
#   0 - Successful production build
#   1 - User cancelled, tests failed, or build failed
#

set -e

echo "Building for production..."

# Safety check: Require explicit confirmation
# This prevents accidental production releases
read -r -p "Are you sure you want to build for PRODUCTION? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Build cancelled."
    exit 1
fi

# Run tests first
# All tests must pass before production release
./scripts/env/test.sh

# Build the package
# Outputs CJS and ESM formats to dist/ ready for npm publishing
npm run build

echo "Production build complete!"
echo "Run 'npm version <patch|minor|major>' then 'npm publish' to release"
