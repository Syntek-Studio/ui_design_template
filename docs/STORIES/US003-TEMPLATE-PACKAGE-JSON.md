# US003: Template Package.json Configuration

**Status:** To Do
**ClickUp ID:** [86c7a97v7](https://app.clickup.com/t/86c7a97v7)
**Priority:** Must Have
**Story Points:** 3
**Sprint:**Sprint 02

## User Story

As a template user,
I want a template package.json file that gets customised during initialisation,
so that the scaffolded project has the correct package name and metadata.

## Acceptance Criteria

### Scenario 1: Template Package.json Creation

-**Given**the template init CLI is run

-**When**a new project is being created

-**Then**package.template.json is copied and processed

-**And**placeholders like {{packageName}}, {{description}} are replaced with user inputs

-**And**the final package.json is valid and ready to use

### Scenario 2: Scripts Configuration

-**Given**package.template.json defines build scripts

-**When**replacement occurs

-**Then**all scripts remain intact and functional

-**And**scripts reference local paths correctly (not template paths)

### Scenario 3: Peer Dependencies

-**Given**package.template.json defines peer dependencies

-**When**the template is initialised

-**Then**peer dependencies are preserved in the output package.json

-**And** npm can successfully install all dependencies

## Dependencies

- US001 (Template Init CLI)

- US002 (Template Config Metadata)

## Tasks

- [ ] Create package.template.json in project root

- [ ] Define placeholder variables: {{packageName}}, {{description}}, {{author}}

- [ ] Copy package.json structure with all required scripts

- [ ] Ensure peer dependencies are listed correctly

- [ ] Add devDependencies for build tools, linting, testing

- [ ] Create replacement logic in init script

- [ ] Add validation for final package.json structure

- [ ] Test npm install works with generated package.json

## Notes

The template package.json should include all necessary scripts for development, building, linting, and testing. It
should be a complete, ready-to-use configuration.

---

**Last Updated:** 01/01/2026
