/**
 * @fileoverview Storybook stories for the Button component
 *
 * This file provides interactive documentation and examples of the Button component
 * for both design review and developer reference. Stories demonstrate all variants,
 * sizes, states, and accessibility features.
 *
 * ## Story Organisation
 *
 * Stories are grouped by feature:
 * - **Variants**: Primary, Secondary, Tertiary, Outline, Ghost, Link, Destructive, Success, Warning
 * - **Sizes**: XS, SM, MD, LG, XL
 * - **States**: Disabled, Loading
 * - **Icons**: Left, Right, Icon-only
 * - **Combinations**: All variants + sizes + rounded options
 * - **Use Cases**: Form buttons, toggle buttons, menu buttons
 *
 * ## Testing Stories in Storybook
 *
 * 1. Run Storybook: `npm run storybook:mobile`
 * 2. Navigate to "Mobile > Button" in the left sidebar
 * 3. Select a story to view it
 * 4. Use the controls panel (bottom) to try different prop combinations
 * 5. Open the accessibility tab to verify WCAG compliance
 *
 * ## Mobile-Specific Notes
 *
 * - Stories use Pressable (not button) for iOS/Android compatibility
 * - Text must be wrapped in React Native Text component
 * - No hover states (mobile-only has active: state)
 * - Touch targets must be minimum 44x44 points
 * - Accessibility labels required for icon-only buttons
 *
 * @see {@link https://storybook.js.org/} Storybook documentation
 * @see {@link https://reactnative.dev/docs/pressable} React Native Pressable
 */

import type { Meta, StoryObj } from '@storybook/react'
import { View, Text as RNText } from 'react-native'
import { Button } from './Button.native'

/**
 * The Mobile Button component: A comprehensive, accessible button for React Native
 *
 * This Storybook showcases all features, variants, sizes, states, and accessibility
 * properties of the Button component. Use these stories as:
 *
 * - **Design Reference**: See all visual variants and combinations
 * - **Developer Guide**: Copy examples for your own code
 * - **Accessibility Test**: Verify WCAG 2.1 compliance with screen readers
 * - **Interactive Testing**: Use the controls panel to test prop combinations
 *
 * ## Key Features Demonstrated
 *
 * - **9 Visual Variants**: primary, secondary, tertiary, outline, ghost, link,
 *   destructive, success, warning
 * - **5 Sizes**: xs, sm, md, lg, xl with consistent 44x44px minimum touch targets
 * - **9 Border Radius Options**: none, sm, base, md, lg, xl, 2xl, 3xl, full
 * - **Icon Support**: Left, right, and icon-only configurations
 * - **Loading States**: Native ActivityIndicator spinner
 * - **Disabled States**: Visual feedback and accessibility announcements
 * - **Full Width Option**: Stretch to container width
 * - **Custom Styling**: Extend with Nativewind classes via className prop
 *
 * ## Accessibility Compliance
 *
 * All stories are WCAG 2.1 AA compliant:
 * - Minimum 44x44 point touch targets (Level AAA)
 * - Semantic button role with accessibilityRole
 * - Labels for icon-only buttons
 * - Hints for additional context
 * - State announcements for disabled/loading
 * - Colour contrast ≥4.5:1 (WCAG AA)
 *
 * ## Navigation
 *
 * Use the left sidebar to browse stories:
 * - **Variants**: See each variant individually
 * - **Sizes**: See each size individually
 * - **Rounded**: See each border-radius option
 * - **Icons**: See different icon configurations
 * - **States**: See disabled and loading states
 * - **Combinations**: See multiple elements together
 * - **Use Cases**: See real-world patterns (forms, toggles, etc.)
 *
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} WCAG 2.1 Guidelines
 * @see {@link https://reactnative.dev/docs/accessibility} React Native Accessibility
 */
const meta: Meta<typeof Button> = {
  title: 'Mobile/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'outline',
        'ghost',
        'link',
        'destructive',
        'success',
        'warning',
      ],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button is icon-only',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Icon components for examples (using View + Text as placeholder icons)
const SaveIcon = () => (
  <View className="w-4 h-4 items-center justify-center">
    <RNText>💾</RNText>
  </View>
)

const PlusIcon = () => (
  <View className="w-4 h-4 items-center justify-center">
    <RNText>➕</RNText>
  </View>
)

const TrashIcon = () => (
  <View className="w-4 h-4 items-center justify-center">
    <RNText>🗑️</RNText>
  </View>
)

const ChevronDownIcon = () => (
  <View className="w-4 h-4 items-center justify-center">
    <RNText>▼</RNText>
  </View>
)

/**
 * Primary buttons are the main call-to-action. Use for the most important
 * action on a screen or in a section.
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
}

/**
 * Secondary buttons are for secondary actions. Use alongside primary buttons
 * for alternative or less important actions.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
}

/**
 * Tertiary buttons provide subtle emphasis. Use for tertiary actions or
 * in dense interfaces.
 */
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
    size: 'md',
  },
}

/**
 * Outline buttons have a border with transparent background. Use for
 * secondary actions that need more visual weight than ghost buttons.
 */
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Ghost buttons have minimal styling. Use for actions that should blend
 * into the interface or appear alongside content.
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
}

/**
 * Link buttons look like text links. Use for navigation or actions that
 * should appear as inline text.
 */
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'md',
  },
}

/**
 * Destructive buttons indicate dangerous or destructive actions. Use for
 * delete, remove, or other irreversible actions.
 */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'md',
  },
}

/**
 * Success buttons indicate positive or completion actions. Use for
 * confirmations, approvals, or successful operations.
 */
export const Success: Story = {
  args: {
    children: 'Approve',
    variant: 'success',
    size: 'md',
  },
}

/**
 * Warning buttons indicate caution. Use for actions that require
 * user attention or may have consequences.
 */
export const Warning: Story = {
  args: {
    children: 'Proceed with Caution',
    variant: 'warning',
    size: 'md',
  },
}

/**
 * Extra small size (xs) - For compact interfaces or inline actions.
 * Maintains minimum 44x44 touch target.
 */
export const ExtraSmall: Story = {
  args: {
    children: 'Extra Small',
    size: 'xs',
  },
}

/**
 * Small size (sm) - For secondary actions or compact layouts.
 */
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

/**
 * Medium size (md) - Default size for most use cases.
 */
export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
}

/**
 * Large size (lg) - For primary actions or prominent CTAs.
 */
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
}

/**
 * Extra large size (xl) - For hero sections or prominent actions.
 */
export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large Button',
    size: 'xl',
  },
}

/**
 * Disabled state prevents interaction. Shows reduced opacity
 * and is announced to screen readers.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

/**
 * Loading state displays a native ActivityIndicator and prevents interaction.
 * Use during async operations like form submission or data fetching.
 */
export const Loading: Story = {
  args: {
    children: 'Submitting...',
    loading: true,
  },
}

/**
 * Button with icon on the left side. Use to provide visual context
 * for the button's action.
 */
export const WithIconLeft: Story = {
  args: {
    children: 'Save',
    iconLeft: <SaveIcon />,
  },
}

/**
 * Button with icon on the right side. Common for dropdown buttons
 * or actions that expand content.
 */
export const WithIconRight: Story = {
  args: {
    children: 'More Options',
    iconRight: <ChevronDownIcon />,
  },
}

/**
 * Icon-only button. Must include accessibilityLabel for screen readers.
 * Use when space is limited or in toolbars.
 */
export const IconOnly: Story = {
  args: {
    children: <PlusIcon />,
    iconOnly: true,
    accessibilityLabel: 'Add item',
  },
}

/**
 * Icon-only delete button with destructive variant.
 */
export const IconOnlyDestructive: Story = {
  args: {
    children: <TrashIcon />,
    iconOnly: true,
    variant: 'destructive',
    accessibilityLabel: 'Delete item',
  },
}

/**
 * Full width button takes up 100% of parent container width.
 * Common in forms or mobile layouts.
 */
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
}

/**
 * Toggle button using accessibilityState. Use for buttons that
 * switch between two states (on/off, enabled/disabled).
 */
export const ToggleButton: Story = {
  args: {
    children: 'Toggle Feature',
    accessibilityState: { selected: false },
  },
}

/**
 * Menu button with accessibilityState for expandable content.
 */
export const MenuButton: Story = {
  args: {
    children: 'Menu',
    iconRight: <ChevronDownIcon />,
    accessibilityState: { expanded: false },
    accessibilityHint: 'Opens menu with additional options',
  },
}

/**
 * All button variants displayed together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <View className="flex-col gap-4 p-8">
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </View>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </View>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
      </View>
    </View>
  ),
}

/**
 * All button sizes displayed together for comparison.
 */
export const AllSizes: Story = {
  render: () => (
    <View className="flex-col items-center gap-4 p-8">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </View>
  ),
}

/**
 * Buttons with different icon configurations.
 */
export const WithIcons: Story = {
  render: () => (
    <View className="flex-col gap-4 p-8">
      <View className="flex-row gap-2 items-center flex-wrap">
        <Button iconLeft={<SaveIcon />}>Save</Button>
        <Button iconRight={<ChevronDownIcon />}>Options</Button>
      </View>
      <View className="flex-row gap-2 items-center flex-wrap">
        <Button iconOnly accessibilityLabel="Add">
          <PlusIcon />
        </Button>
        <Button iconOnly variant="destructive" accessibilityLabel="Delete">
          <TrashIcon />
        </Button>
      </View>
    </View>
  ),
}

/**
 * Form example with primary and secondary buttons.
 */
export const FormButtons: Story = {
  render: () => (
    <View className="flex-row gap-3 p-8">
      <Button variant="outline" className="flex-1">
        Cancel
      </Button>
      <Button variant="primary" className="flex-1">
        Submit
      </Button>
    </View>
  ),
}

/**
 * Square button with no border radius (rounded="none").
 * Use for sharp, modern interfaces or when aligning with other square elements.
 */
export const SquareButton: Story = {
  args: {
    children: 'Square Button',
    rounded: 'none',
  },
}

/**
 * Small border radius (rounded="sm").
 * Provides subtle rounding for a slightly softer appearance.
 */
export const SmallRadius: Story = {
  args: {
    children: 'Small Radius',
    rounded: 'sm',
  },
}

/**
 * Pill-shaped button with full border radius (rounded="full").
 * Common for tags, badges, or distinctive CTAs.
 */
export const PillButton: Story = {
  args: {
    children: 'Pill Button',
    rounded: 'full',
  },
}

/**
 * All border radius options displayed for comparison.
 * Shows the full range from sharp corners to pill shape.
 */
export const AllRoundedVariants: Story = {
  render: () => (
    <View className="flex-col gap-4 p-8">
      <RNText className="text-lg font-semibold">Border Radius Options</RNText>
      <View className="flex-row flex-wrap gap-2">
        <Button rounded="none">None</Button>
        <Button rounded="sm">Small</Button>
        <Button rounded="base">Base</Button>
        <Button rounded="md">Medium</Button>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Button rounded="lg">Large</Button>
        <Button rounded="xl">XL</Button>
        <Button rounded="2xl">2XL</Button>
        <Button rounded="3xl">3XL</Button>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Button rounded="full">Full (Pill)</Button>
      </View>
    </View>
  ),
}

/**
 * Square buttons with different variants.
 * Demonstrates how square corners work with all button variants.
 */
export const SquareVariants: Story = {
  render: () => (
    <View className="flex-col gap-4 p-8">
      <RNText className="text-lg font-semibold">Square Buttons</RNText>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="primary" rounded="none">
          Primary
        </Button>
        <Button variant="secondary" rounded="none">
          Secondary
        </Button>
        <Button variant="tertiary" rounded="none">
          Tertiary
        </Button>
      </View>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="outline" rounded="none">
          Outline
        </Button>
        <Button variant="ghost" rounded="none">
          Ghost
        </Button>
      </View>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="destructive" rounded="none">
          Destructive
        </Button>
        <Button variant="success" rounded="none">
          Success
        </Button>
        <Button variant="warning" rounded="none">
          Warning
        </Button>
      </View>
    </View>
  ),
}

/**
 * Pill buttons with different variants.
 * Demonstrates how pill shape works with all button variants.
 */
export const PillVariants: Story = {
  render: () => (
    <View className="flex-col gap-4 p-8">
      <RNText className="text-lg font-semibold">Pill Buttons</RNText>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="primary" rounded="full">
          Primary
        </Button>
        <Button variant="secondary" rounded="full">
          Secondary
        </Button>
        <Button variant="tertiary" rounded="full">
          Tertiary
        </Button>
      </View>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="outline" rounded="full">
          Outline
        </Button>
        <Button variant="ghost" rounded="full">
          Ghost
        </Button>
      </View>
      <View className="flex-row gap-2 flex-wrap">
        <Button variant="destructive" rounded="full">
          Destructive
        </Button>
        <Button variant="success" rounded="full">
          Success
        </Button>
        <Button variant="warning" rounded="full">
          Warning
        </Button>
      </View>
    </View>
  ),
}

/**
 * Square icon-only buttons.
 * Perfect for toolbars or compact interfaces.
 */
export const SquareIconButtons: Story = {
  render: () => (
    <View className="flex-row gap-2 p-8">
      <Button iconOnly rounded="none" accessibilityLabel="Add">
        <PlusIcon />
      </Button>
      <Button iconOnly rounded="none" variant="secondary" accessibilityLabel="Save">
        <SaveIcon />
      </Button>
      <Button iconOnly rounded="none" variant="destructive" accessibilityLabel="Delete">
        <TrashIcon />
      </Button>
      <Button iconOnly rounded="none" variant="outline" accessibilityLabel="Options">
        <ChevronDownIcon />
      </Button>
    </View>
  ),
}

/**
 * Circular icon buttons (rounded="full").
 * Common for floating action buttons or social media icons.
 */
export const CircularIconButtons: Story = {
  render: () => (
    <View className="flex-row gap-2 p-8">
      <Button iconOnly rounded="full" accessibilityLabel="Add">
        <PlusIcon />
      </Button>
      <Button iconOnly rounded="full" variant="secondary" accessibilityLabel="Save">
        <SaveIcon />
      </Button>
      <Button iconOnly rounded="full" variant="destructive" accessibilityLabel="Delete">
        <TrashIcon />
      </Button>
      <Button iconOnly rounded="full" variant="outline" accessibilityLabel="Options">
        <ChevronDownIcon />
      </Button>
    </View>
  ),
}

/**
 * Size and rounded combinations.
 * Shows how different sizes look with various border radii.
 */
export const SizeAndRoundedCombinations: Story = {
  render: () => (
    <View className="flex-col gap-6 p-8">
      <View>
        <RNText className="text-sm font-medium mb-2">Square buttons at all sizes</RNText>
        <View className="flex-row items-center gap-2 flex-wrap">
          <Button size="xs" rounded="none">
            XS
          </Button>
          <Button size="sm" rounded="none">
            SM
          </Button>
          <Button size="md" rounded="none">
            MD
          </Button>
          <Button size="lg" rounded="none">
            LG
          </Button>
          <Button size="xl" rounded="none">
            XL
          </Button>
        </View>
      </View>
      <View>
        <RNText className="text-sm font-medium mb-2">Pill buttons at all sizes</RNText>
        <View className="flex-row items-center gap-2 flex-wrap">
          <Button size="xs" rounded="full">
            XS
          </Button>
          <Button size="sm" rounded="full">
            SM
          </Button>
          <Button size="md" rounded="full">
            MD
          </Button>
          <Button size="lg" rounded="full">
            LG
          </Button>
          <Button size="xl" rounded="full">
            XL
          </Button>
        </View>
      </View>
    </View>
  ),
}
