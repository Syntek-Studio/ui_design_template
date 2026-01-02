/**
 * typography.ts - Typography scale for consistent text styling
 *
 * Provides a complete typography system with predefined font families, sizes,
 * and weights. Ensures consistent text styling and visual hierarchy across
 * all web and mobile components.
 *
 * ## Font Families
 *
 * Three font families optimised for different use cases:
 * - **sans**: Inter system-ui sans-serif (primary, body text)
 * - **serif**: Georgia serif (typography-heavy content)
 * - **mono**: Fira Code monospace (code samples, technical content)
 *
 * ## Font Sizes
 *
 * Seven size scales from xs (12px) to 6xl (60px) with corresponding line heights.
 * Each size maintains proper vertical rhythm:
 *
 * - **xs**: 12px / 16px line-height (captions, labels)
 * - **sm**: 14px / 20px line-height (small text)
 * - **base**: 16px / 24px line-height (body text, default)
 * - **lg**: 18px / 28px line-height (larger body text)
 * - **xl**: 20px / 28px line-height (subheadings)
 * - **2xl**: 24px / 32px line-height (headings)
 * - **3xl**: 30px / 36px line-height (large headings)
 * - **4xl**: 36px / 40px line-height (hero headings)
 * - **5xl**: 48px / 1 line-height (display size)
 * - **6xl**: 60px / 1 line-height (maximum display size)
 *
 * ## Font Weights
 *
 * Nine weights from thin (100) to black (900) for semantic emphasis:
 * - **thin**: 100 (rarely used)
 * - **extralight**: 200
 * - **light**: 300 (muted content)
 * - **normal**: 400 (default/body)
 * - **medium**: 500 (emphasis)
 * - **semibold**: 600 (headings, labels)
 * - **bold**: 700 (strong emphasis)
 * - **extrabold**: 800
 * - **black**: 900 (maximum emphasis)
 *
 * ## Vertical Rhythm
 *
 * Line heights are carefully chosen to maintain vertical rhythm and readability:
 * - Small text (xs, sm): Tighter line heights (1.33-1.43x)
 * - Body text (base, lg): Comfortable line heights (1.5x)
 * - Headings (2xl and up): Tighter line heights (1.1-1.25x)
 * - Display sizes (5xl, 6xl): No line-height constraint (1)
 *
 * @example
 * import { typography } from '@syntek-studio/ui';
 * const fontSize = typography.fontSize.lg;        // { size: 18, lineHeight: 28 }
 * const fontWeight = typography.fontWeight.bold;  // 700
 * const fontFamily = typography.fontFamily.mono;  // Fira Code, monospace
 * const headingSize = typography.fontSize['3xl']; // { size: 30, lineHeight: 36 }
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: { size: 12, lineHeight: 16 },
    sm: { size: 14, lineHeight: 20 },
    base: { size: 16, lineHeight: 24 },
    lg: { size: 18, lineHeight: 28 },
    xl: { size: 20, lineHeight: 28 },
    '2xl': { size: 24, lineHeight: 32 },
    '3xl': { size: 30, lineHeight: 36 },
    '4xl': { size: 36, lineHeight: 40 },
    '5xl': { size: 48, lineHeight: 1 },
    '6xl': { size: 60, lineHeight: 1 },
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const

export type Typography = typeof typography
