# US022: Implement Input/TextInput Component

**Status:** To Do
**ClickUp ID:** [86c7a98rv](https://app.clickup.com/t/86c7a98rv)
**Priority:** Should Have
**Story Points:** 5
**Sprint:** Sprint 15

## User Story

As an application developer,
I want an Input component for text entry,
so that I can easily add form fields to my applications.

## Acceptance Criteria

### Scenario 1: Web Input Component

- **Given** an application imports Input component
- **When** it renders the component
- **Then** an HTML `<input>` element is created
- **And** it supports props: type, placeholder, value, onChange, disabled, required
- **And** it applies default styling from design tokens
- **And** focus states are clearly visible

### Scenario 2: Mobile TextInput Component

- **Given** a React Native app imports Mobile.Input
- **When** it renders the component
- **Then** a React Native `<TextInput>` is created
- **And** it supports props: placeholder, value, onChangeText, editable, secureTextEntry
- **And** mobile touch targets are at least 44x44pt
- **And** keyboard handling is appropriate for input type

### Scenario 3: Accessibility

- **Given** Input is rendered
- **When** accessibility checks run
- **Then** associated label is present
- **And** placeholder is not used as sole label
- **And** error messages are properly linked
- **And** required fields are marked

## Dependencies

- US005 (Centralised Theme Config)
- US008 (Component Defaults Config)

## Tasks

- [ ] Create src/web/components/Input/Input.tsx
- [ ] Create src/mobile/components/Input/Input.native.tsx
- [ ] Add Input stories for web and mobile
- [ ] Implement all input types: text, email, password, number, etc.
- [ ] Add focus and disabled state styling
- [ ] Add validation error styling
- [ ] Write unit tests for Input component
- [ ] Write accessibility tests for Input
- [ ] Document Input props and usage
- [ ] Add Input to component exports in index.ts
- [ ] Create examples: form field with label and error

## Notes

Input component should handle all common input types and provide clear visual feedback for all states (default, focus, disabled, error). It should work seamlessly with form validation libraries.

---

**Last Updated:** 01/01/2026
