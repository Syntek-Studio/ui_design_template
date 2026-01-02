/**
 * classNames.ts - Class Name Utility Functions
 *
 * Utility functions for managing and combining CSS class names across the component library.
 * Provides type-safe class name manipulation for both web (Tailwind CSS) and mobile
 * (Nativewind) platforms.
 *
 * ## Features
 *
 * - Conditional class application without bloat
 * - Falsy value filtering (undefined, null, false)
 * - Class deduplication with mergeClasses()
 * - Type-safe interface with full TypeScript support
 * - Cross-platform compatibility (web and mobile)
 *
 * ## Usage
 *
 * ```typescript
 * import { cn, mergeClasses } from '@/utils';
 *
 * // Conditional classes
 * const buttonClass = cn('btn', isActive && 'active', disabled && 'opacity-50');
 *
 * // Merged with deduplication
 * const merged = mergeClasses('px-4 py-2', 'px-4 bg-blue', 'rounded');
 * ```
 *
 * @module utils/classNames
 */

/**
 * Combines multiple class names into a single space-separated string,
 * filtering out falsy values (false, undefined, null, 0, empty strings).
 *
 * Provides a clean, type-safe way to conditionally apply CSS classes without
 * resulting in empty strings or excessive whitespace. Commonly used with
 * ternary operators or logical AND operators to conditionally add classes
 * based on component state or props.
 *
 * ## Behaviour
 *
 * - Accepts multiple arguments of various types
 * - Filters out falsy values: false, 0, '', undefined, null
 * - Trims whitespace from the final result
 * - Returns a clean, space-separated class string
 *
 * ## Performance Notes
 *
 * This function is lightweight and suitable for use in render functions.
 * Time complexity: O(n) where n is the number of arguments.
 * Space complexity: O(m) where m is the length of the resulting string.
 *
 * ## Cross-Platform
 *
 * Works identically on both web and mobile platforms.
 * Use with Tailwind CSS classes (web) and Nativewind classes (mobile).
 *
 * @param classes - Variable number of class name values:
 *   - Non-empty strings: included in result
 *   - Falsy values (false, undefined, null): filtered out
 *   - Numbers: coerced to strings
 *
 * @returns A single space-separated string of valid class names, trimmed
 *   of leading/trailing whitespace. Returns empty string if all values
 *   are falsy.
 *
 * @example
 * // Basic usage with string literals
 * const basic = cn('btn', 'px-4', 'py-2');
 * // Returns: "btn px-4 py-2"
 *
 * @example
 * // Conditional classes with boolean expressions
 * const conditional = cn(
 *   'base-button',
 *   isActive && 'active',
 *   isDisabled && 'opacity-50 cursor-not-allowed',
 *   'rounded-lg'
 * );
 * // Returns: "base-button active opacity-50 cursor-not-allowed rounded-lg" (if isActive and isDisabled are true)
 *
 * @example
 * // Filtering falsy values
 * const filtered = cn('btn', undefined, false, '', null, 'active');
 * // Returns: "btn active" (falsy values removed, empty string removed)
 *
 * @example
 * // Using with ternary operators
 * const ternary = cn(
 *   'btn',
 *   isLoading ? 'loading' : 'ready',
 *   variant === 'primary' ? 'bg-blue-600' : 'bg-grey-100'
 * );
 *
 * @example
 * // Empty result with all falsy values
 * const empty = cn(false, undefined, null);
 * // Returns: ""
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ').trim()
}

/**
 * Merges multiple class name strings into a single string,
 * removing duplicate class names and trimming excess whitespace.
 *
 * Useful when combining multiple class strings that may have overlapping
 * class names (e.g., when applying base styles and then conditional overrides).
 * Automatically handles multiple consecutive spaces, tabs, and newlines
 * in the input strings.
 *
 * ## Behaviour
 *
 * - Accepts multiple class name strings as arguments
 * - Splits each string on any whitespace (space, tab, newline)
 * - Removes empty strings and duplicate class names (case-sensitive)
 * - Returns a clean, single-space-separated result
 * - Whitespace order is not preserved (order is determined by Set insertion order)
 *
 * ## Edge Cases
 *
 * - Empty strings are filtered out automatically
 * - Multiple consecutive spaces are treated as a single separator
 * - Duplicates are kept in first-occurrence order (Set ordering)
 * - Empty input results in an empty string
 * - Whitespace-only strings are filtered out
 *
 * ## Performance Notes
 *
 * Uses a Set for O(1) deduplication. Time complexity: O(n * m) where n is the
 * number of input strings and m is the average length. Suitable for merge
 * operations during component styling but not for tight render loops with
 * many merges.
 *
 * ## Difference from cn()
 *
 * - `cn()`: Combines variadic values with falsy filtering
 * - `mergeClasses()`: Merges existing class strings with deduplication
 *
 * Use `mergeClasses()` when composing style strings from multiple sources
 * (e.g., base styles + theme styles + custom overrides).
 *
 * @param classes - Variable number of class name strings to merge.
 *   Each string may contain multiple space-separated class names.
 *   Empty strings and whitespace-only strings are safely ignored.
 *
 * @returns A deduplicated, single-space-separated string of class names.
 *   Returns an empty string if no valid class names are provided.
 *
 * @example
 * // Basic merge with duplicate class
 * const merged = mergeClasses('px-4 py-2', 'px-4 text-white', 'rounded');
 * // Returns: "px-4 py-2 text-white rounded" (px-4 appears once)
 *
 * @example
 * // Merging base and override styles
 * const baseClasses = 'px-4 py-2 bg-blue-600 text-white';
 * const overrideClasses = 'px-6 bg-blue-800';
 * const merged = mergeClasses(baseClasses, overrideClasses);
 * // Returns: "px-4 py-2 bg-blue-600 text-white px-6 bg-blue-800"
 * // Note: Both px-4 and px-6 are included (deduplication doesn't resolve conflicts)
 * // In practice, CSS specificity determines which class wins
 *
 * @example
 * // Handling whitespace
 * const merged = mergeClasses(
 *   'px-4  py-2',      // Double space
 *   'px-4\n  text-white', // Newline and multiple spaces
 *   'rounded'
 * );
 * // Returns: "px-4 py-2 text-white rounded"
 *
 * @example
 * // With empty strings
 * const merged = mergeClasses('btn', '', 'active', null as any, 'rounded');
 * // Returns: "btn active rounded" (empty string filtered out)
 *
 * @example
 * // Empty input
 * const empty = mergeClasses('', '', '  ');
 * // Returns: ""
 */
export function mergeClasses(...classes: string[]): string {
  const classSet = new Set<string>()

  classes.forEach((cls) => {
    cls.split(/\s+/).forEach((c) => {
      if (c) classSet.add(c)
    })
  })

  return Array.from(classSet).join(' ')
}
