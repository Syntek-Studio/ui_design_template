/**
 * shadows.ts - Shadow definitions for elevation and visual hierarchy
 *
 * Provides a scale of shadow intensities for creating depth and visual
 * prominence. Shadows are essential for establishing visual hierarchy and
 * distinguishing layered elements on the screen.
 *
 * ## Shadow Scale
 *
 * Eight shadow levels from no shadow to maximum depth:
 *
 * - **none**: No shadow (flat, baseline elements)
 * - **sm**: 1px elevation, subtle emphasis (small badges, labels)
 * - **base**: 2px elevation, default elevation (interactive elements)
 * - **md**: 4px elevation, standard emphasis (cards, containers)
 * - **lg**: 10px elevation, elevated prominence (floating panels, dropdowns)
 * - **xl**: 20px elevation, prominent emphasis (popovers, tooltips)
 * - **2xl**: 25px elevation, maximum depth (modals, overlays)
 * - **inner**: Inset shadow, depressed/embedded effect (inputs, borders)
 *
 * ## Shadow Composition
 *
 * Shadows use multiple layers (offset X, offset Y, blur, spread) to create
 * realistic depth. The opacity and blur radius increase with elevation level,
 * mimicking how shadows appear in the physical world.
 *
 * Shadow anatomy:
 * - **Offset**: X and Y positioning relative to element (always downward)
 * - **Blur radius**: Softness of the shadow edge (larger = softer)
 * - **Spread radius**: Expansion of shadow area (usually negative/none)
 * - **Opacity**: Alpha transparency (25%, 10%, or 5%)
 *
 * ## Usage Guidelines
 *
 * ### Interaction Elevation
 * - **Buttons, links**: none or base (interactive, same level)
 * - **Input fields**: base (interactive, bordered)
 * - **Cards**: md (elevated, distinct container)
 * - **Popovers**: lg (floating, above content)
 * - **Modals**: xl or 2xl (maximum layering)
 *
 * ### Visual Hierarchy
 * Lower elevations appear closer, higher elevations appear further (more depth).
 * Use consistent elevation for elements of the same importance.
 *
 * ### Accessibility
 * Shadows alone should not convey information. Use with clear visual
 * separation, borders, or text cues for complete accessibility.
 *
 * @example
 * import { shadows } from '@syntek-studio/ui';
 * const cardShadow = shadows.md;      // Standard cards
 * const floatingShadow = shadows.lg;  // Floating panels
 * const subtleShadow = shadows.sm;    // Small elements
 * const modalShadow = shadows['2xl']; // Overlays
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 * @see {@link https://material.io/design/environment/elevation.html} Material Design Elevation
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const

export type Shadows = typeof shadows
