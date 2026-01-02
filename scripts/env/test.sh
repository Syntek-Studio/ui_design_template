#!/bin/bash
#
# Quality Assurance Check Script
#
# Runs the complete test and quality assurance suite before building or deploying.
# This script ensures code quality, type safety, and linting standards are met.
#
# Usage:
#   ./scripts/env/test.sh
#
# What it does:
#   1. Runs all unit tests (vitest)
#   2. Runs TypeScript type checking
#   3. Runs ESLint checks
#
# Test coverage:
#   - Unit tests for all modules (scripts/__tests__/)
#   - Component tests for web and mobile components
#   - File operations and template initialisation tests
#   - Validator and replacement logic tests
#
# Exit codes:
#   0 - All tests, type checks, and lints passed
#   1 - Any test, type check, or lint failed
#
# Note:
#   - Runs in strict mode (set -e) to fail fast on first error
#   - Each check must pass before moving to the next
#   - Required before committing or pushing code
#

set -e

echo "Running test suite..."
npm test

echo "Running type check..."
npm run type-check

echo "Running linter..."
npm run lint

echo "All checks complete!"
