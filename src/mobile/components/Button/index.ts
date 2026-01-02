/**
 * @module mobile/components/Button
 *
 * Mobile Button component export module for React Native applications.
 *
 * This module exports the Button component and all associated type definitions.
 * The Button is a foundational interactive element optimised for touch interfaces
 * on iOS and Android with support for multiple variants, sizes, icons, loading
 * states, and comprehensive accessibility features.
 *
 * ## What's Exported
 *
 * ### Component
 * - **Button**: React Native component using Pressable for optimal touch handling
 *
 * ### Type Definitions
 * - **ButtonProps**: Interface defining all component properties
 * - **ButtonSize**: Type union for size variants (xs, sm, md, lg, xl)
 * - **ButtonVariant**: Type union for visual variants (9 options)
 * - **ButtonRounded**: Type union for border-radius options
 *
 * ## React Native Implementation Details
 *
 * The Button component is built on React Native primitives:
 * - **Pressable**: Main interactive container (replaces `<button>` from web)
 * - **Text**: Required for all text rendering (React Native constraint)
 * - **View**: Container for icons and layout
 * - **ActivityIndicator**: Native loading spinner for loading state
 *
 * ## Key Mobile Features
 *
 * **Touch Optimization:**
 * - Minimum 44x44 point touch target (WCAG 2.5.5 Level AAA)
 * - Uses onPress handler (not onClick)
 * - Supports onPressIn/onPressOut for additional feedback
 *
 * **Visual Feedback:**
 * - 9 distinct visual variants for different use cases
 * - 5 size options with responsive scaling
 * - 9 border-radius options from square to pill shape
 * - Disabled state with reduced opacity
 * - Loading state with native ActivityIndicator
 * - Active state via active: Tailwind class
 *
 * **Accessibility (WCAG 2.1 AA):**
 * - accessibilityRole="button" for semantic meaning
 * - accessibilityLabel for icon-only buttons (required)
 * - accessibilityHint for additional context
 * - accessibilityState for toggle/expandable buttons
 * - Screen reader support: iOS VoiceOver, Android TalkBack
 * - Proper state announcements (disabled, loading, etc.)
 * - Colour contrast ≥4.5:1 (WCAG AA standard)
 *
 * **Styling:**
 * - Nativewind (Tailwind CSS for React Native) classes
 * - className prop for customisation
 * - Responsive design support (sm:, md:, lg: prefixes)
 * - Dark mode support (dark: prefix)
 *
 * ## Import & Usage
 *
 * ### From @syntek-studio/ui main export
 * ```typescript
 * import { Mobile } from '@syntek-studio/ui';
 *
 * <Mobile.Button onPress={handlePress}>
 *   Click me
 * </Mobile.Button>
 * ```
 *
 * ### Direct import from component
 * ```typescript
 * import { Button, type ButtonProps } from '@syntek-studio/ui/mobile';
 *
 * <Button variant="primary" size="lg" onPress={handlePress}>
 *   Click me
 * </Button>
 * ```
 *
 * ## Common Usage Patterns
 *
 * ### Basic Button
 * ```typescript
 * <Button onPress={() => console.log('pressed')}>
 *   Press me
 * </Button>
 * ```
 *
 * ### With Variant and Size
 * ```typescript
 * <Button
 *   variant="secondary"
 *   size="lg"
 *   onPress={handleAction}
 * >
 *   Large Secondary Button
 * </Button>
 * ```
 *
 * ### With Icons
 * ```typescript
 * <Button
 *   variant="primary"
 *   iconLeft={<SaveIcon />}
 *   iconRight={<ArrowIcon />}
 *   onPress={handleSave}
 * >
 *   Save Changes
 * </Button>
 * ```
 *
 * ### Icon-Only (Requires accessibilityLabel)
 * ```typescript
 * <Button
 *   iconOnly
 *   accessibilityLabel="Close menu"
 *   onPress={handleClose}
 * >
 *   <CloseIcon />
 * </Button>
 * ```
 *
 * ### Loading State
 * ```typescript
 * <Button
 *   loading={isSubmitting}
 *   onPress={handleSubmit}
 * >
 *   {isSubmitting ? 'Submitting...' : 'Submit'}
 * </Button>
 * ```
 *
 * ### Form Buttons
 * ```typescript
 * <View className="flex-row gap-3">
 *   <Button
 *     variant="outline"
 *     className="flex-1"
 *     onPress={handleCancel}
 *   >
 *     Cancel
 *   </Button>
 *   <Button
 *     variant="primary"
 *     className="flex-1"
 *     onPress={handleSubmit}
 *   >
 *     Submit
 *   </Button>
 * </View>
 * ```
 *
 * ### Toggle Button with State
 * ```typescript
 * <Button
 *   accessibilityState={{ selected: isActive }}
 *   onPress={toggleFeature}
 * >
 *   {isActive ? 'Active' : 'Inactive'}
 * </Button>
 * ```
 *
 * ## Platform Differences
 *
 * | Feature              | Web          | Mobile                   |
 * | -------------------- | ------------ | ------------------------ |
 * | Component            | `<button>`   | `<Pressable>` in RN      |
 * | Text Rendering       | Direct       | Wrapped in `<Text>`      |
 * | Touch Handler        | `onClick`    | `onPress`                |
 * | Hover States         | `hover:`     | Not supported            |
 * | Active States        | `:active`    | `active:` Tailwind class |
 * | Long Press           | Not native   | `onLongPress` prop       |
 * | Screen Readers       | ARIA attrs   | Accessibility props      |
 * | Safe Area            | Not needed   | `<SafeAreaView>`         |
 *
 * ## Accessibility Compliance
 *
 * This component follows WCAG 2.1 Level AA guidelines:
 *
 * **2.5.5 Target Size (Level AAA):**
 * - Minimum 44x44 point touch targets on all size options
 * - Adequate spacing between buttons
 *
 * **2.4.3 Focus Order:**
 * - Proper tab order via Pressable
 * - Focus visible on touch
 *
 * **1.4.3 Contrast (Minimum):**
 * - All colour variants meet 4.5:1 contrast ratio
 * - Support for users with colour blindness
 *
 * **1.3.1 Info and Relationships:**
 * - Semantic button role
 * - State information via accessibilityState
 *
 * **2.1.1 Keyboard:**
 * - Full keyboard navigation support
 * - No keyboard traps
 *
 * **3.2.2 On Input:**
 * - No automatic form submission
 * - Predictable behaviour
 *
 * ## Testing
 *
 * Test Button component with:
 * - **Storybook**: `npm run storybook:mobile`
 * - **Unit Tests**: Vitest with React Native Testing Library
 * - **Manual Testing**: iOS Simulator or Android Emulator
 * - **Screen Readers**: iOS VoiceOver, Android TalkBack
 *
 * ## Related Files
 *
 * - {@link ./Button.native.tsx} - Component implementation
 * - {@link ./Button.stories.native.tsx} - Storybook documentation
 * - {@link ../index.ts} - Mobile components barrel export
 * - {@link ../../index.ts} - Main library entry point
 *
 * @see {@link https://reactnative.dev/docs/pressable} React Native Pressable documentation
 * @see {@link https://reactnative.dev/docs/accessibility} React Native Accessibility guide
 * @see {@link https://www.nativewind.dev/} Nativewind documentation
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} WCAG 2.1 Quick Reference
 */

export {
  Button,
  type ButtonProps,
  type ButtonRounded,
  type ButtonSize,
  type ButtonVariant,
} from './Button.native'
