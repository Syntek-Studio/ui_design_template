# US028: Internationalisation (i18n) Support

**Status:** To Do
**ClickUp ID:** [86c7a9964](https://app.clickup.com/t/86c7a9964)
**Priority:** Could Have
**Story Points:** 8
**Sprint:** Sprint 22

## User Story

As a design system user in a global team,
I want the component library to support internationalisation,
so that components can display content in different languages and follow locale-specific conventions.

## Acceptance Criteria

### Scenario 1: String Resource Management

- **Given** a component displays user-facing strings
- **When** the application is configured for i18n
- **Then** strings are externalized to translation files
- **And** components accept translatable keys instead of hardcoded text
- **And** translation system resolves strings at runtime

### Scenario 2: Locale-Specific Formatting

- **Given** components display dates, numbers, or currency
- **When** locale is changed
- **Then** formatting respects locale conventions
- **And** date formats follow locale standards
- **And** currency symbols and formats are correct

### Scenario 3: RTL Support

- **Given** application uses right-to-left language
- **When** components render
- **Then** layout is mirrored appropriately
- **And** flex directions are reversed
- **And** text direction is set correctly

## Dependencies

- Components framework established
- Design token system in place

## Tasks

- [ ] Create i18n documentation structure
- [ ] Define translation key naming conventions
- [ ] Create translation file templates
- [ ] Add locale detection mechanism
- [ ] Implement date/number formatting utilities
- [ ] Document RTL implementation
- [ ] Create RTL variants for components
- [ ] Add rtl class support to styling
- [ ] Create examples: using i18n in components
- [ ] Document locale switching mechanism
- [ ] Add Storybook controls for locale switching

## Notes

i18n support should be optional and not required for basic usage. The design system should document how to properly handle translations in consuming applications rather than trying to solve all i18n problems within the component library itself.

---

**Last Updated:** 01/01/2026
