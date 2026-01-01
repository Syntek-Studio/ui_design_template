# US006: Automated Token Generation Script

**Status:** To Do
**Priority:** Must Have
**Story Points:** 8
**Sprint:** Sprint 03

## User Story

As a design system maintainer,
I want an automated script that generates all token files from the theme configuration,
so that I can keep tokens in sync with the source configuration without manual updates.

## Acceptance Criteria

### Scenario 1: Token File Generation
- **Given** src/config/theme.config.ts is defined
- **When** `npm run generate-tokens` is executed
- **Then** all token files in src/tokens/ are regenerated
- **And** TypeScript export files are created with proper types
- **And** CSS custom properties are generated for use in stylesheets
- **And** JSON exports are created for documentation and tooling

### Scenario 2: Colour Shade Generation
- **Given** theme.config.ts defines a base primary colour
- **When** tokens are generated
- **Then** all 50, 100, 200, ..., 900 shades are automatically calculated
- **And** shades follow a consistent lightness/darkness curve
- **And** contrast ratios are maintained for accessibility

### Scenario 3: Error Handling and Validation
- **Given** theme.config.ts has invalid colour values
- **When** token generation runs
- **Then** clear error messages are shown
- **And** the process fails gracefully without modifying existing files
- **And** validation rules check for colour accessibility

## Dependencies

- US005 (Centralised Theme Config)

## Tasks

- [ ] Create scripts/generate-tokens.js with token generation logic
- [ ] Implement colour shade generation algorithm
- [ ] Create TypeScript token file generators
- [ ] Create CSS custom properties generator
- [ ] Create JSON token export generator
- [ ] Add colour accessibility validation
- [ ] Implement error handling and reporting
- [ ] Add success message with generated file paths
- [ ] Update package.json with "generate-tokens" script
- [ ] Add tests for shade generation accuracy
- [ ] Document token generation process

## Notes

The token generation should be deterministic and reproducible. Generated files should be commitable to version control, and the build process should validate they are up-to-date.

---

**Last Updated:** 01/01/2026
