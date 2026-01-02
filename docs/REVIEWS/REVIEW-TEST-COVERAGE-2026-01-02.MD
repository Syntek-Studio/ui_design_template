# Test Coverage Review: Storybook Stories and TypeScript Components

**Review Date**: 02 January 2026
**Reviewer**: Code Review Agent
**Project Version**: 0.7.1
**Branch**: us001/template-init-cli

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Executive Summary](#executive-summary)
- [Current Test Coverage](#current-test-coverage)
  - [Existing Tests](#existing-tests)
  - [Existing Storybook Stories](#existing-storybook-stories)
- [Test Coverage Gaps](#test-coverage-gaps)
  - [Component Tests Missing](#component-tests-missing)
    - [Web Components Missing Tests](#web-components-missing-tests)
    - [Mobile Components Missing Tests](#mobile-components-missing-tests)
  - [Utility Function Tests Missing](#utility-function-tests-missing)
  - [Design Token Tests Missing](#design-token-tests-missing)
- [Vitest Configuration Analysis](#vitest-configuration-analysis)
- [Recommendations](#recommendations)
  - [Priority 1: Critical Component Tests](#priority-1-critical-component-tests)
  - [Priority 2: Utility Function Tests](#priority-2-utility-function-tests)
  - [Priority 3: Design Token Tests](#priority-3-design-token-tests)
  - [Priority 4: Integration Tests](#priority-4-integration-tests)
- [Testing Strategy](#testing-strategy)
  - [Recommended Testing Pyramid](#recommended-testing-pyramid)
  - [Test Environment Setup](#test-environment-setup)
  - [Coverage Goals](#coverage-goals)
  - [CI/CD Integration](#cicd-integration)
- [Next Steps](#next-steps)
  - [Immediate Actions (Week 1)](#immediate-actions-week-1)
  - [Short-term Actions (Week 2-3)](#short-term-actions-week-2-3)
  - [Medium-term Actions (Month 1-2)](#medium-term-actions-month-1-2)
  - [Long-term Actions (Month 3+)](#long-term-actions-month-3)
- [Verdict](#verdict)

---

## Executive Summary

This review examines the test coverage for the @syntek-studio/ui component library, focusing on:

1. Existing test coverage for scripts and utilities
2. Storybook story coverage for components
3. Missing test coverage for TypeScript components
4. Gaps in utility function and design token testing

**Key Findings:**

- **Storybook Stories**: ✅ Comprehensive coverage for web Button component (1 story file with 28+ stories)
- **Component Tests**: ❌ No unit tests exist for any React components (web or mobile)
- **Utility Tests**: ❌ No tests for utility functions (classNames, componentStyles)
- **Design Token Tests**: ❌ No tests for design token validation
- **Script Tests**: ✅ Good coverage for CLI initialisation scripts (4 test files)

**Test Coverage Score**: ~15% (only scripts tested, no component or utility tests)

---

## Current Test Coverage

### Existing Tests

**Location**: `scripts/__tests__/`

All existing tests are for the CLI template initialisation scripts:

| Test File                 | Purpose                                          | Status         |
| ------------------------- | ------------------------------------------------ | -------------- |
| `validators.test.ts`      | Package name, hex colour, description validation | ✅ 143 tests   |
| `file-operations.test.ts` | File I/O operations (read, write, backup)        | ✅ 51 tests    |
| `replacements.test.ts`    | Template placeholder replacement logic           | ✅ Tests exist |
| `init-template.test.ts`   | Template initialisation workflow                 | ✅ Tests exist |

**Coverage**: Scripts are well-tested with comprehensive edge case coverage.

### Existing Storybook Stories

**Location**: `src/web/components/Button/Button.stories.tsx`

The web Button component has excellent Storybook documentation:

**Stories Count**: 28 stories covering:

- ✅ All 9 variants (primary, secondary, tertiary, outline, ghost, link, destructive, success, warning)
- ✅ All 5 sizes (xs, sm, md, lg, xl)
- ✅ All states (disabled, loading, with icons, full width)
- ✅ All 9 rounded options (none, sm, base, md, lg, xl, 2xl, 3xl, full)
- ✅ Accessibility features (toggle buttons, menu buttons, aria attributes)
- ✅ Composite stories (all variants, all sizes, form buttons, icon combinations)

**Mobile Button**: ❌ No Storybook stories file found (expected: `src/mobile/components/Button/Button.stories.native.tsx`)

---

## Test Coverage Gaps

### Component Tests Missing

**No test files exist for any React components.**

#### Web Components Missing Tests

**Location**: `src/web/components/`

| Component | Stories | Unit Tests | Integration Tests |
| --------- | ------- | ---------- | ----------------- |
| Button    | ✅ 28   | ❌ Missing | ❌ Missing        |

**Expected Test File**: `src/web/components/Button/Button.test.tsx`

**Critical Test Cases Missing:**

1. **Rendering Tests**
   - Renders children correctly
   - Applies correct className combinations
   - Renders with default props
   - Renders with custom props

2. **Variant Tests**
   - Each variant applies correct CSS classes
   - Variant classes match design system

3. **Size Tests**
   - Each size applies correct padding/text sizing
   - Icon-only sizes apply correct classes

4. **State Tests**
   - Disabled state prevents onClick
   - Loading state shows spinner
   - Loading state hides icons
   - Loading state prevents interaction

5. **Icon Tests**
   - iconLeft renders before text
   - iconRight renders after text
   - iconOnly hides text
   - iconOnly without aria-label triggers console warning

6. **Accessibility Tests**
   - aria-label is applied correctly
   - aria-pressed is applied for toggle buttons
   - aria-expanded is applied for menu buttons
   - aria-busy is set during loading
   - Disabled buttons have aria-disabled

7. **Event Handler Tests**
   - onClick is called when button clicked
   - onClick is NOT called when disabled
   - onClick is NOT called when loading

8. **Edge Cases**
   - Full width applies w-full class
   - Custom className is merged correctly
   - Type attribute is set correctly

#### Mobile Components Missing Tests

**Location**: `src/mobile/components/`

| Component | Stories    | Unit Tests | Integration Tests |
| --------- | ---------- | ---------- | ----------------- |
| Button    | ❌ Missing | ❌ Missing | ❌ Missing        |

**Expected Test File**: `src/mobile/components/Button/Button.test.tsx` or `Button.native.test.tsx`

**Expected Story File**: `src/mobile/components/Button/Button.stories.native.tsx`

**Critical Test Cases Missing:**

1. **Rendering Tests**
   - Renders with React Native Pressable
   - Renders Text component with correct classes
   - ActivityIndicator shows during loading

2. **Platform-Specific Tests**
   - Pressable onPress handler works
   - Minimum 44x44 touch target enforced
   - Active state classes apply on press

3. **Accessibility Tests**
   - accessibilityRole="button" is set
   - accessibilityLabel is applied
   - accessibilityHint is applied
   - accessibilityState.disabled works
   - accessibilityState.busy works during loading

### Utility Function Tests Missing

**Location**: `src/utils/`

| Utility File         | Purpose                     | Tests      |
| -------------------- | --------------------------- | ---------- |
| `classNames.ts`      | CSS class name manipulation | ❌ Missing |
| `componentStyles.ts` | Component style mappings    | ❌ Missing |

**Expected Test File**: `src/utils/__tests__/classNames.test.ts`

**Critical Test Cases Missing for `cn()` function:**

1. Combines multiple class strings
2. Filters out falsy values (false, null, undefined)
3. Handles empty strings
4. Handles boolean conditional classes
5. Trims and removes extra whitespace
6. Returns empty string for all falsy inputs

**Expected Test File**: `src/utils/__tests__/componentStyles.test.ts`

**Critical Test Cases Missing:**

1. **Size Classes**
   - All size variants have correct Tailwind classes
   - Icon-only size classes create square aspect ratios
   - Mobile size classes meet 44x44 minimum touch target

2. **Variant Classes**
   - Web variant classes include hover states
   - Mobile variant classes exclude hover states
   - All variants have correct colour mappings

3. **Text Colour Classes**
   - Solid variants use white text
   - Transparent variants use dark text
   - Sufficient contrast ratios

4. **Spinner Classes**
   - Spinner sizes scale with button sizes
   - Spinner colours contrast with backgrounds

5. **Rounded Classes**
   - All rounded variants map to correct Tailwind utilities

### Design Token Tests Missing

**Location**: `src/tokens/`

| Token File       | Purpose                | Tests      |
| ---------------- | ---------------------- | ---------- |
| `colours.ts`     | Colour palette         | ❌ Missing |
| `spacing.ts`     | Spacing scale          | ❌ Missing |
| `typography.ts`  | Font definitions       | ❌ Missing |
| `breakpoints.ts` | Responsive breakpoints | ❌ Missing |
| `shadows.ts`     | Shadow definitions     | ❌ Missing |
| `borders.ts`     | Border styles          | ❌ Missing |

**Expected Test Files**: `src/tokens/__tests__/*.test.ts`

**Critical Test Cases Missing:**

1. **Colour Tokens**
   - Valid hex codes for all colours
   - Sufficient contrast ratios (WCAG AA/AAA)
   - No duplicate colour values
   - Primary/secondary colours exist
   - Semantic colours exist (success, warning, error, info)

2. **Spacing Tokens**
   - Follows consistent scale (4px grid)
   - All values are numbers or valid CSS strings
   - No gaps in spacing scale

3. **Typography Tokens**
   - Font families are valid
   - Font sizes have corresponding line heights
   - Font weights are valid CSS values

4. **Breakpoint Tokens**
   - Breakpoints are in ascending order
   - All breakpoints are numbers
   - Standard breakpoints exist (sm, md, lg, xl)

5. **Shadow Tokens**
   - Valid CSS box-shadow syntax
   - Shadow values increase with elevation

6. **Border Tokens**
   - Border radius values are valid
   - Border widths are valid

---

## Vitest Configuration Analysis

**Current Configuration** (`vitest.config.ts`):

```typescript
test: {
  include: ['scripts/**/*.{test,spec}.{js,ts}'],
  exclude: ['node_modules', 'dist', '.storybook-web'],
}
```

**Issues:**

1. ❌ **Only includes script tests** - Component and utility tests are excluded
2. ❌ **No src/ directory included** - All component tests would be ignored
3. ❌ **No .tsx files** - React component tests won't run
4. ✅ Excludes node_modules and build directories correctly

**Recommended Configuration:**

```typescript
test: {
  include: [
    'scripts/**/*.{test,spec}.{js,ts}',
    'src/**/*.{test,spec}.{ts,tsx}',  // Add component tests
  ],
  exclude: ['node_modules', 'dist', '.storybook-web'],
  environment: 'node',  // Change to 'jsdom' for React component tests
  setupFiles: ['./vitest.setup.ts'],  // Add setup file for React Testing Library
}
```

**Additional Dependencies Needed:**

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @testing-library/react-native  # For mobile component tests
```

---

## Recommendations

### Priority 1: Critical Component Tests

**Immediate Action Required**: Add unit tests for Button components (both web and mobile).

**Run**: `/syntek-dev-suite:test-writer` to generate test files for:

1. `src/web/components/Button/Button.tsx`
2. `src/mobile/components/Button/Button.native.tsx`

**Expected Outcomes:**

- `src/web/components/Button/Button.test.tsx` created with 30+ test cases
- `src/mobile/components/Button/Button.native.test.tsx` created with 25+ test cases
- Test coverage >80% for Button components

**Test Focus:**

- Rendering correctness
- Prop handling
- Event handlers
- Accessibility compliance
- Edge cases and error conditions

### Priority 2: Utility Function Tests

**Action Required**: Add tests for utility functions to ensure reliability.

**Create Test Files:**

1. `src/utils/__tests__/classNames.test.ts`
   - Test the `cn()` function thoroughly
   - Test the `mergeClasses()` function
   - Edge cases: empty inputs, falsy values, duplicates

2. `src/utils/__tests__/componentStyles.test.ts`
   - Validate all size class mappings
   - Validate all variant class mappings
   - Ensure no undefined values in mappings
   - Test type safety

**Expected Outcomes:**

- 100% test coverage for utility functions
- Type safety validation
- Confidence in shared style utilities

### Priority 3: Design Token Tests

**Action Required**: Validate design tokens to prevent inconsistencies.

**Create Test Files:**

1. `src/tokens/__tests__/colours.test.ts`
   - Validate hex code format
   - Test colour contrast ratios
   - Ensure semantic colours exist

2. `src/tokens/__tests__/spacing.test.ts`
   - Validate 4px grid system
   - Test scale consistency

3. `src/tokens/__tests__/typography.test.ts`
   - Validate font families
   - Test font size/line height pairings

4. `src/tokens/__tests__/breakpoints.test.ts`
   - Validate ascending order
   - Test standard breakpoints exist

5. `src/tokens/__tests__/shadows.test.ts`
   - Validate CSS syntax
   - Test elevation scale

6. `src/tokens/__tests__/borders.test.ts`
   - Validate radius values
   - Test width values

**Expected Outcomes:**

- Design system consistency guaranteed
- Catch token errors before they reach production
- Automated validation in CI/CD

### Priority 4: Integration Tests

**Action Required**: Add integration tests for complete component workflows.

**Test Scenarios:**

1. **Form Integration**
   - Button submits form correctly
   - Disabled button prevents submission
   - Loading button shows feedback

2. **Component Composition**
   - Button with icon renders correctly
   - Button with custom className merges styles
   - Button with all props works together

3. **Accessibility Flow**
   - Keyboard navigation works
   - Screen reader announcements correct
   - Focus management proper

**Expected Outcomes:**

- Confidence in component behaviour
- Catch integration bugs early
- Better UX validation

---

## Testing Strategy

### Recommended Testing Pyramid

```
        /\
       /E2E\          (Future: Playwright/Cypress)
      /------\
     /Integration\    (Priority 4: Component workflows)
    /------------\
   /  Unit Tests  \   (Priority 1-3: Components, Utils, Tokens)
  /----------------\
```

### Test Environment Setup

**For Web Components:**

```bash
# Install React Testing Library
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Update vitest.config.ts environment to 'jsdom'
# Create vitest.setup.ts with RTL matchers
```

**For Mobile Components:**

```bash
# Install React Native Testing Library
npm install -D @testing-library/react-native

# Create separate vitest.config.native.ts
# Mock React Native components
```

### Coverage Goals

| Component Type    | Current Coverage | Target Coverage | Priority |
| ----------------- | ---------------- | --------------- | -------- |
| Web Components    | 0%               | 80%+            | P1       |
| Mobile Components | 0%               | 80%+            | P1       |
| Utils             | 0%               | 100%            | P2       |
| Tokens            | 0%               | 90%+            | P3       |
| Scripts           | ~85%             | Maintain        | P4       |

### CI/CD Integration

**Add to GitHub Actions workflow:**

```yaml
- name: Run tests
  run: npm test

- name: Check coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./test_results/coverage/coverage-final.json
```

---

## Next Steps

### Immediate Actions (Week 1)

1. ✅ **Review Complete** - This document created
2. ⬜ **Update vitest.config.ts** - Include src/ directory and .tsx files
3. ⬜ **Install Testing Dependencies** - React Testing Library, jsdom
4. ⬜ **Create vitest.setup.ts** - Configure test environment
5. ⬜ **Run `/syntek-dev-suite:test-writer`** - Generate Button component tests

### Short-term Actions (Week 2-3)

6. ⬜ **Add Utility Tests** - classNames.ts and componentStyles.ts
7. ⬜ **Add Token Tests** - All design token files
8. ⬜ **Create Mobile Stories** - Button.stories.native.tsx
9. ⬜ **Setup CI Coverage** - GitHub Actions integration
10. ⬜ **Establish Coverage Thresholds** - Fail builds below 80%

### Medium-term Actions (Month 1-2)

11. ⬜ **Add New Component Tests** - As components are created
12. ⬜ **Integration Tests** - Component workflows
13. ⬜ **Accessibility Tests** - axe-core integration
14. ⬜ **Visual Regression** - Chromatic or Percy
15. ⬜ **Performance Tests** - React Profiler benchmarks

### Long-term Actions (Month 3+)

16. ⬜ **E2E Tests** - Playwright for critical flows
17. ⬜ **Cross-browser Testing** - BrowserStack integration
18. ⬜ **Mobile E2E** - Detox for React Native
19. ⬜ **Mutation Testing** - Stryker for test quality
20. ⬜ **Contract Testing** - Pact for API consumers

---

## Verdict

**Status**: ⚠️ **Request Changes - Critical Test Coverage Gaps Found**

**Summary**:

The project has:

- ✅ Excellent Storybook documentation for web Button component
- ✅ Good CLI script test coverage
- ❌ Zero unit tests for React components
- ❌ Zero tests for utility functions
- ❌ Zero tests for design tokens
- ❌ Vitest configuration excludes component tests

**Blocking Issues**:

1. **No component tests** - Cannot verify component behaviour
2. **No utility tests** - Shared utilities are untested
3. **Vitest misconfigured** - Won't run component tests even if created
4. **Missing test infrastructure** - No React Testing Library setup

**Recommended Actions**:

1. Update vitest configuration to include `src/**/*.{test,spec}.{ts,tsx}`
2. Install React Testing Library and jsdom
3. Run `/syntek-dev-suite:test-writer` to generate component tests
4. Establish minimum coverage thresholds (80% for components)

**Timeline**: 1-2 weeks to achieve baseline test coverage (Priority 1-2 items)

---

**Review completed on**: 02 January 2026
**Next review scheduled**: After test implementation (2-3 weeks)
