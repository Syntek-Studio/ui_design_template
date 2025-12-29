/**
 * classNames.ts
 *
 * Utility functions for managing and combining CSS class names.
 * Provides type-safe class name manipulation for both web and mobile platforms.
 */

/**
 * Combines multiple class names into a single string, filtering out falsy values.
 *
 * Useful for conditionally applying class names based on component state or props.
 * Handles strings, numbers, undefined, null, and boolean values gracefully.
 *
 * @param classes - Array of class names or conditional values
 * @returns A single space-separated string of valid class names
 *
 * @example
 * const btnClass = cn('btn', isActive && 'active', 'rounded');
 * // Returns: "btn active rounded" if isActive is true
 * // Returns: "btn rounded" if isActive is false
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ').trim();
}

/**
 * Merges multiple class name strings, removing duplicates and trimming whitespace.
 *
 * Processes each class string, splits on whitespace, removes duplicates,
 * and returns a clean merged string.
 *
 * @param classes - Array of class name strings to merge
 * @returns A deduplicated and trimmed string of class names
 *
 * @example
 * const merged = mergeClasses('px-4 py-2', 'px-4 text-white', 'rounded');
 * // Returns: "px-4 py-2 text-white rounded"
 */
export function mergeClasses(...classes: string[]): string {
  const classSet = new Set<string>();

  classes.forEach(cls => {
    cls.split(/\s+/).forEach(c => {
      if (c) classSet.add(c);
    });
  });

  return Array.from(classSet).join(' ');
}
