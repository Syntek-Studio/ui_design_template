# US014: GitHub Actions Release and Publishing Pipeline

**Status:** To Do
**ClickUp ID:** [86c7a9877](https://app.clickup.com/t/86c7a9877)
**Priority:** Must Have
**Story Points:** 8
**Sprint:**Sprint 09

## User Story

As a release manager,
I want an automated release pipeline that version bumps, builds, publishes, and creates releases,
so that publishing new versions is consistent and error-free.

## Acceptance Criteria

### Scenario 1: Automatic Release Workflow

-**Given**a commit is pushed with specific keywords (e.g., [release])

-**When**the release workflow is triggered

-**Then**version bump is calculated (major/minor/patch)

-**And**CHANGELOG is updated automatically

-**And**package is built and tested

-**And**package is published to npm

-**And**GitHub release is created with release notes

### Scenario 2: Semantic Versioning

-**Given**commits follow conventional commits format

-**When**release workflow runs

-**Then**version is automatically determined from commit messages

-**And**CHANGELOG entries are generated from commits

-**And**version follows semver (major.minor.patch)

### Scenario 3: Publishing to npm

-**Given**all checks pass

-**When**release workflow publishes

-**Then**package is published with correct version

-**And**npm registry is updated

-**And**package is immediately available via npm install

-**And** GitHub release includes installation instructions

## Dependencies

- US013 (CI Pipeline - must pass before release)

- npm authentication needs to be configured

- Semantic versioning scripts needed (Phase 4)

## Tasks

- [ ] Create .github/workflows/release.yml

- [ ] Add release trigger configuration

- [ ] Add version bump step using semantic versioning

- [ ] Add CHANGELOG generation step

- [ ] Add build step verification

- [ ] Add npm publish step with authentication

- [ ] Configure npm registry credentials

- [ ] Add GitHub release creation step

- [ ] Add release notes generation

- [ ] Add git commit and tag creation

- [ ] Document release process in docs/PUBLISHING.md

- [ ] Test release workflow on staging branch

## Notes

The release pipeline should be automated but safe, with multiple verification steps. It should provide clear feedback
and be easily reversible if issues are discovered after publishing.

---

**Last Updated:** 01/01/2026
