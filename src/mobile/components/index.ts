/**
 * @module mobile/components
 *
 * React Native mobile component exports for iOS and Android applications.
 *
 * This module provides the central export point for all React Native mobile components
 * built with TypeScript, Nativewind 4 (Tailwind CSS for React Native), and React Native.
 * Components are designed for touch interfaces with full accessibility and type safety.
 *
 * ## Components Exported
 *
 * - **Button**: Pressable button component optimised for touch interfaces
 *   - Uses React Native Pressable for optimal touch feel and performance
 *   - Supports 9 style variants: primary, secondary, tertiary, outline, ghost, link,
 *     destructive, success, warning
 *   - 5 size options: xs, sm, md (default), lg, xl
 *   - Icon support: iconLeft, iconRight, iconOnly
 *   - Loading state with native ActivityIndicator spinner
 *   - Disabled state with visual feedback
 *   - Full width option for layout flexibility
 *   - Minimum 44x44 point touch targets (WCAG 2.5.5 accessibility standard)
 *   - Complete accessibility support for iOS VoiceOver and Android TalkBack
 *
 * ## Architecture & Conventions
 *
 * All mobile components in this library follow consistent patterns:
 *
 * **Technology Stack:**
 * - React Native for cross-platform mobile UI
 * - TypeScript for type safety and developer experience
 * - Nativewind 4 for Tailwind CSS styling on mobile
 * - React Native Reanimated for advanced animations (when needed)
 *
 * **File Structure:**
 * Each component lives in its own folder:
 * - `ComponentName.native.tsx` - Component implementation
 * - `ComponentName.stories.native.tsx` - Storybook documentation and examples
 * - `index.ts` - Re-export module
 *
 * **Documentation Standards:**
 * - Module-level JSDoc comments explaining purpose and usage
 * - JSDoc comments for all exported types, interfaces, and components
 * - @param documentation for component props
 * - @example sections demonstrating common usage patterns
 * - Inline comments for complex logic
 *
 * **Type Safety:**
 * - Props interfaces exported alongside components
 * - Type aliases for size, variant, and rounded values
 * - TypeScript strict mode enabled
 *
 * **Accessibility (WCAG 2.1 AA compliant):**
 * - accessibilityRole for semantic elements
 * - accessibilityLabel for all interactive elements
 * - accessibilityHint for contextual information
 * - accessibilityState for dynamic states
 * - Minimum touch target size (44x44 points)
 * - High contrast colours
 * - Screen reader support
 *
 * ## Component Variants
 *
 * Components use Nativewind classes for styling with consistent variants:
 *
 * **Sizes:** xs, sm, md, lg, xl
 * - Responsive padding and text sizes
 * - Touch targets scale while maintaining minimum 44x44 requirement
 *
 * **Visual Variants:**
 * - **primary**: Main call-to-action with solid background
 * - **secondary**: Secondary action alternative
 * - **tertiary**: Subtle emphasis for tertiary actions
 * - **outline**: Bordered button with transparent background
 * - **ghost**: Minimal styling that blends into interface
 * - **link**: Styled as text link for navigation
 * - **destructive**: Red styling for delete/remove actions
 * - **success**: Green styling for confirmations
 * - **warning**: Yellow styling for cautions
 *
 * **Border Radius:** none, sm, base, md, lg, xl, 2xl, 3xl, full
 * - Full range from sharp corners to pill shape
 *
 * ## Platform Differences from Web
 *
 * React Native mobile components use different native APIs than web components:
 *
 * | Feature              | Web                    | Mobile                   |
 * | -------------------- | ---------------------- | ------------------------ |
 * | Button element       | `<button>`             | `<Pressable>`            |
 * | Text rendering       | Text directly          | Wrapped in `<Text>`      |
 * | Click handler        | `onClick`              | `onPress`                |
 * | Hover states         | `hover:` CSS class     | Not supported            |
 * | Active states        | `:active` pseudo-class | `active:` Tailwind class |
 * | Container            | `<div>`                | `<View>`                 |
 * | Screen reader        | ARIA attributes        | Accessibility props      |
 * | Safe area            | Not needed             | `<SafeAreaView>`         |
 *
 * ## Styling with Nativewind
 *
 * Components use Nativewind (Tailwind CSS compiled for React Native):
 *
 * **Styling Approach:**
 * - Apply Tailwind utility classes directly via `className` prop
 * - Classes are compiled to React Native stylesheet at build time
 * - No CSS-in-JS runtime overhead
 * - Full Tailwind feature support (responsive, dark mode, etc.)
 *
 * **Usage Example:**
 * ```typescript
 * // Good - use Nativewind utility classes
 * <Button className="bg-blue-500 px-4 py-2 rounded-lg">
 *   Click me
 * </Button>
 *
 * // Avoid - stylesheet (doesn't work with Nativewind)
 * const styles = StyleSheet.create({
 *   button: { backgroundColor: 'blue' }
 * });
 * ```
 *
 * **Customisation:**
 * - className prop extends or overrides default component styles
 * - Responsive classes (sm:, md:, lg:) work for different screen sizes
 * - Dark mode classes (dark:) are supported
 * - Active state classes (active:) for pressed state
 *
 * ## Import & Usage Patterns
 *
 * Components are imported via the Mobile namespace from the main library:
 *
 * ```typescript
 * import { Mobile } from '@syntek-studio/ui';
 *
 * // Button with default variant (primary)
 * <Mobile.Button onPress={handlePress}>
 *   Submit
 * </Mobile.Button>
 *
 * // With variant, size, and icons
 * <Mobile.Button
 *   variant="secondary"
 *   size="lg"
 *   iconLeft={<SaveIcon />}
 *   onPress={handleSave}
 * >
 *   Save Draft
 * </Mobile.Button>
 *
 * // Icon-only with accessibility label
 * <Mobile.Button
 *   iconOnly
 *   accessibilityLabel="Close menu"
 *   onPress={handleClose}
 * >
 *   <CloseIcon />
 * </Mobile.Button>
 *
 * // Loading state during async operation
 * <Mobile.Button loading={isLoading}>
 *   {isLoading ? 'Submitting...' : 'Submit'}
 * </Mobile.Button>
 * ```
 *
 * ## Accessibility Features
 *
 * All components support comprehensive accessibility for touch interfaces:
 *
 * **Screen Readers:**
 * - iOS VoiceOver for blind and low-vision users
 * - Android TalkBack for blind and low-vision users
 * - Proper role announcement (e.g., "button")
 * - State announcements (e.g., "disabled", "loading")
 *
 * **Touch Targets:**
 * - Minimum 44x44 point size (WCAG 2.5.5 Level AAA)
 * - Adequate spacing between interactive elements
 * - All components maintain minimum target size
 *
 * **Labels & Hints:**
 * - accessibilityLabel describes element purpose
 * - accessibilityHint provides additional context
 * - Essential for icon-only buttons
 *
 * **States:**
 * - accessibilityState indicates dynamic states
 * - disabled state prevents interaction
 * - selected/checked state for toggles
 * - expanded/collapsed state for menus
 * - busy state for loading
 *
 * **Colour Contrast:**
 * - All colour variants meet WCAG AA standard (4.5:1 contrast ratio)
 * - Suitable for users with colour blindness
 *
 * @example
 * // Basic button with default primary variant
 * import { Mobile } from '@syntek-studio/ui';
 *
 * export function MyScreen() {
 *   return (
 *     <Mobile.Button onPress={() => console.log('pressed')}>
 *       Click me
 *     </Mobile.Button>
 *   );
 * }
 *
 * @example
 * // Form with primary and secondary buttons
 * export function FormExample() {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleSubmit = async () => {
 *     setIsLoading(true);
 *     try {
 *       await submitForm();
 *     } finally {
 *       setIsLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <View className="gap-3">
 *       <Mobile.Button
 *         variant="primary"
 *         fullWidth
 *         loading={isLoading}
 *         onPress={handleSubmit}
 *       >
 *         Submit
 *       </Mobile.Button>
 *       <Mobile.Button
 *         variant="outline"
 *         fullWidth
 *         disabled={isLoading}
 *         onPress={handleCancel}
 *       >
 *         Cancel
 *       </Mobile.Button>
 *     </View>
 *   );
 * }
 *
 * @example
 * // Icon button with accessibility
 * export function IconButtonExample() {
 *   return (
 *     <Mobile.Button
 *       iconOnly
 *       variant="secondary"
 *       accessibilityLabel="Delete item"
 *       accessibilityHint="Permanently removes this item"
 *       onPress={handleDelete}
 *     >
 *       <TrashIcon />
 *     </Mobile.Button>
 *   );
 * }
 *
 * @see {@link https://reactnative.dev/docs/accessibility} React Native Accessibility Docs
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} WCAG 2.1 Guidelines
 * @see {@link https://www.nativewind.dev/} Nativewind Documentation
 * @see {@link https://github.com/react-native-community/hooks} React Native Hooks
 */

// Mobile components
export * from './Button'
