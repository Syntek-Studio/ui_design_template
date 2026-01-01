# US015: Versioning and Semantic Release Scripts

**Status:** To Do
**Priority:** Must Have
**Story Points:** 5
**Sprint:** Sprint 10

## User Story

As a release manager,
I want scripts that handle semantic versioning and CHANGELOG generation,
so that version numbers and release notes are automatically managed.

## Acceptance Criteria

### Scenario 1: Semantic Version Bumping
- **Given** `npm run version` is executed
- **When** the script analyzes recent commits
- **Then** it determines correct version bump (major/minor/patch)
- **And** package.json version is updated
- **And** version is tagged in git
- **And** previous version is available for reference

### Scenario 2: CHANGELOG Generation
- **Given** commits follow conventional commits format
- **When** version script runs
- **Then** CHANGELOG.md is automatically updated
- **And** entries are grouped by type (feat, fix, docs, etc.)
- **And** entries include commit hashes and author information
- **And** migration guides are included for breaking changes

### Scenario 3: Pre-Release Versions
- **Given** a pre-release version is needed (alpha, beta, rc)
- **When** version script is run with pre-release flag
- **Then** version is updated to include pre-release identifier
- **And** pre-release is marked in CHANGELOG
- **And** version can be published without affecting stable releases

## Dependencies

- US013 (CI Pipeline)
- Conventional commits are used throughout the project

## Tasks

- [ ] Create scripts/version.js for version management
- [ ] Implement semantic version calculation from commits
- [ ] Add version update to package.json
- [ ] Add git tag creation
- [ ] Create CHANGELOG.md if it doesn't exist
- [ ] Implement CHANGELOG.md update logic
- [ ] Group changelog entries by type
- [ ] Add support for pre-release versions
- [ ] Add version history tracking
- [ ] Update package.json with "version" script
- [ ] Document versioning strategy in docs/PUBLISHING.md
- [ ] Add tests for version calculation logic

## Notes

Versioning should follow Semantic Versioning 2.0.0 (semver.org) and be automatically determined from conventional commits. This ensures consistency and enables automation of the release process.

---

**Last Updated:** 01/01/2026
