/**
 * borders.ts - Border radius and width definitions
 *
 * Provides predefined border radius and width values for consistent and
 * cohesive corner rounding and border styling across all components. These
 * tokens help establish a design system with predictable corner treatments
 * and emphasis through borders.
 *
 * ## Border Radius
 *
 * Nine radius scales from sharp corners to perfect circles:
 *
 * - **none** (0px): Sharp, hard corners (minimal use)
 * - **sm** (2px): Subtle rounding (rare, very subtle)
 * - **base** (4px): Minimal rounding (conservative)
 * - **md** (6px): Moderate rounding (balanced)
 * - **lg** (8px): Pronounced rounding, default (most components)
 * - **xl** (12px): Very rounded (larger components)
 * - **2xl** (16px): Highly rounded (prominent containers)
 * - **3xl** (24px): Extremely rounded (large displays, hero sections)
 * - **full** (9999px): Perfect circle (avatars, badges, circular buttons)
 *
 * ### Radius Usage
 * - **Buttons**: lg (8px) default, xl for larger buttons
 * - **Cards**: lg or xl (8-12px)
 * - **Inputs**: lg or md (6-8px)
 * - **Badges**: full (perfect circle)
 * - **Avatars**: full (perfect circle)
 * - **Pills/tags**: full (oval shape)
 * - **Modals**: xl or 2xl (16px+)
 *
 * ## Border Width
 *
 * Five width levels from no border to thick emphasis:
 *
 * - **0** (0px): No border (baseline)
 * - **1** (1px): Hair-line, very subtle (light dividers)
 * - **2** (2px): Standard border (default, interactive elements)
 * - **4** (4px): Prominent border (focus states, emphasis)
 * - **8** (8px): Thick, bold border (heavy emphasis, active states)
 *
 * ### Width Usage
 * - **Dividers**: 1px (light separation)
 * - **Input borders**: 1-2px (default interactive)
 * - **Focus indicators**: 2px (visible focus ring)
 * - **Emphasis states**: 4px (important focus, attention)
 * - **Heavy emphasis**: 8px (maximum attention, rare)
 *
 * ## Accessibility
 *
 * - Avoid relying on border alone for information. Use colour, text, or icons.
 * - Focus indicators should have sufficient width (2px minimum) for visibility.
 * - Maintain adequate contrast between border colour and background.
 *
 * @example
 * import { borders } from '@syntek-studio/ui';
 * const buttonRadius = borders.radius.lg;     // 8px (default button)
 * const largeRadius = borders.radius.xl;      // 12px (large card)
 * const circleAvatar = borders.radius.full;   // Perfect circle
 * const inputBorder = borders.width[1];       // 1px (standard input)
 * const focusBorder = borders.width[2];       // 2px (focus state)
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const borders = {
  radius: {
    none: 0,
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
  },
  width: {
    0: 0,
    1: 1,
    2: 2,
    4: 4,
    8: 8,
  },
} as const

export type Borders = typeof borders
