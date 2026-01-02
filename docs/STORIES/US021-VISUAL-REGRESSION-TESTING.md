# US021: Visual Regression Testing with Chromatic

**Status:** To Do
**ClickUp ID:** [86c7a98pt](https://app.clickup.com/t/86c7a98pt)
**Priority:** Should Have
**Story Points:** 5
**Sprint:**Sprint 14

## User Story

As a component developer,
I want visual regression testing to catch unintended styling changes,
so that component visual appearance is maintained across versions.

## Acceptance Criteria

### Scenario 1: Chromatic Integration

-**Given**Chromatic is configured

-**When**stories are pushed to Chromatic service

-**Then**visual snapshots are captured for all story variants

-**And**new snapshots are compared against baseline

-**And**visual changes are highlighted for review

### Scenario 2: Visual Change Detection

-**Given**a component's styling is changed

-**When**CI pipeline runs

-**Then**Chromatic detects visual changes

-**And**changes are highlighted in the Chromatic UI

-**And**team can approve or reject changes

-**And**approved changes become new baseline

### Scenario 3: CI Integration

-**Given**a PR is opened with visual changes

-**When**CI runs Chromatic tests

-**Then**Chromatic check is reported on PR

-**And**unreviewed changes block PR merge (if configured)

-**And** approved changes show as passing

## Dependencies

- US017 (Enhanced Storybook Config)

- US013 (CI Pipeline)

## Tasks

- [ ] Create Chromatic account and get project token

- [ ] Install @chromatic-com/storybook addon

- [ ] Configure Chromatic in Storybook config

- [ ] Add Chromatic build step to CI workflow

- [ ] Configure baseline snapshots

- [ ] Set up Chromatic checks on GitHub

- [ ] Create documentation for visual testing workflow

- [ ] Add example of reviewing visual changes

- [ ] Configure baseline update process

- [ ] Add Chromatic badge to README

- [ ] Document visual regression testing best practices

## Notes

Visual regression testing is valuable for preventing accidental styling changes. Chromatic provides cloud-based service
with good integration into GitHub workflows. All stories should have visual regression testing enabled.

---

**Last Updated:** 01/01/2026
