/**
 * @fileoverview Button Component Storybook Stories
 *
 * Comprehensive Storybook stories for the Button component, demonstrating
 * all available variants, sizes, states, and accessibility features.
 *
 * These stories serve multiple purposes:
 * 1. **Visual Documentation**: Show how buttons look with different configurations
 * 2. **Interactive Testing**: Test button behaviour in Storybook's interactive UI
 * 3. **Accessibility Testing**: Verify keyboard and screen reader support
 * 4. **Developer Reference**: Quick reference for available props and patterns
 * 5. **Design System**: Reference for design consistency across the application
 *
 * ## Story Organisation
 *
 * Stories are grouped by category:
 * - **Variants**: All visual style variants (primary, secondary, etc.)
 * - **Sizes**: All available size options
 * - **States**: Different button states (disabled, loading, etc.)
 * - **Icons**: Icon usage patterns (left, right, icon-only)
 * - **Radius**: Border radius variations (square, rounded, pill)
 * - **Combined**: Complex combinations demonstrating real-world usage
 *
 * ## Accessibility in Stories
 *
 * All stories include appropriate ARIA attributes:
 * - Icon-only buttons have aria-label
 * - Toggle buttons have aria-pressed
 * - Menu buttons have aria-expanded and aria-haspopup
 * - Loading buttons have aria-busy
 *
 * Run Storybook and use:
 * - Keyboard (Tab) to navigate
 * - Keyboard (Enter/Space) to activate
 * - Screen reader to verify announcements
 * - axe accessibility checker (Storybook addon)
 *
 * ## Interactive Testing
 *
 * Use Storybook's Controls panel to:
 * - Change variant and size
 * - Toggle disabled and loading states
 * - See real-time prop changes
 * - Test different combinations
 *
 * ## Browser Testing
 *
 * Test these stories in:
 * - Chrome/Edge (latest)
 * - Firefox (latest)
 * - Safari (latest)
 * - Mobile browsers (iOS Safari, Chrome Android)
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

/**
 * Storybook metadata for the Button component
 *
 * Configures:
 * - Component title and path
 * - Auto-generated documentation
 * - Default layout and parameters
 * - Control types for interactive testing
 * - Accessibility checker configuration
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive, accessible button component with support for multiple variants, sizes, and states. Built with TypeScript, React, and Tailwind CSS 4. Implements WCAG 2.1 AA accessibility standards.',
      },
    },
  },
  argTypes: {
    /**
     * Visual style variant control
     *
     * Allows selecting different button variants in Storybook:
     * - primary: Main call-to-action
     * - secondary: Alternative action
     * - tertiary: Subtle action
     * - ghost: Minimal styling
     * - link: Text link style
     * - outline: Bordered button
     * - destructive: Delete/remove action
     * - success: Positive confirmation
     * - warning: Cautionary action
     */
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
    /**
     * Size control for button dimensions
     *
     * Options:
     * - xs: 20px (extra small)
     * - sm: 32px (small)
     * - md: 40px (medium, default)
     * - lg: 48px (large)
     * - xl: 56px (extra large)
     */
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button (height and padding)',
    },
    /**
     * Border radius control
     *
     * Options control corner rounding:
     * - none: Square corners (sharp)
     * - sm to 3xl: Increasing roundness
     * - full: Pill-shaped (9999px)
     */
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius of the button',
    },
    /**
     * Disabled state control
     *
     * Prevents interaction and shows visual indication (50% opacity).
     * Screen readers announce disabled state.
     */
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled and cannot be interacted with',
    },
    /**
     * Loading state control
     *
     * Shows animated spinner and prevents interaction.
     * Use during async operations (form submission, API calls).
     * Screen readers announce aria-busy state.
     */
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state with spinner',
    },
    /**
     * Full width control
     *
     * Makes button take 100% of container width.
     * Useful for mobile layouts and full-width forms.
     */
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width of container',
    },
    /**
     * Icon-only mode control
     *
     * Removes text display and uses icon-only sizing.
     * REQUIRES aria-label for accessibility.
     * Component warns if iconOnly=true without aria-label.
     */
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button is icon-only (no text)',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

/**
 * Icon components for Storybook examples
 *
 * These are example SVG icons used in button stories to demonstrate
 * icon usage patterns (iconLeft, iconRight, iconOnly).
 * In real applications, use proper icon libraries (e.g., react-icons, heroicons).
 */

/**
 * Save/disk icon for demonstrating iconLeft/iconRight usage
 * Common action icon for "Save" buttons
 */
const SaveIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
  </svg>
)

/**
 * Plus/add icon for demonstrating icon-only buttons
 * Common action icon for "Add" or "Create" buttons
 */
const PlusIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
)

/**
 * Trash/delete icon for demonstrating destructive icon-only buttons
 * Common action icon for "Delete" buttons
 */
const TrashIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
)

/**
 * Chevron down icon for demonstrating iconRight with menu buttons
 * Common action icon for "More options" or dropdown buttons
 */
const ChevronDownIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
)

/**
 * Primary button - Main call-to-action
 *
 * Use for the most important action on a page, form, or section.
 * Primary buttons have the highest visual weight and draw the user's attention.
 * Typically used for actions like:
 * - Submit form
 * - Save changes
 * - Continue
 * - Create new item
 *
 * **Accessibility**: Uses `primary` variant which has sufficient colour
 * contrast (WCAG AA 4.5:1) and clear focus indicators.
 *
 * **Keyboard**: Fully keyboard accessible - press Tab to focus, Enter/Space to activate.
 *
 * **Screen Reader**: Announces as "button" with text "Primary Button".
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
}

/**
 * Secondary button - Alternative action
 *
 * Use alongside primary buttons for secondary or less important actions.
 * Secondary buttons have less visual weight than primary buttons but more
 * than tertiary or ghost buttons.
 *
 * Typical use cases:
 * - Save as draft (when primary is "Publish")
 * - Secondary form submission
 * - Alternative action with less urgency
 *
 * **Design Pattern**: Often paired with primary button for form actions:
 * - Primary: "Save"
 * - Secondary: "Save Draft"
 *
 * **Accessibility**: Sufficient colour contrast and clear focus indicators.
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
 * Extra large size (xl) - For hero sections or landing pages.
 */
export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large Button',
    size: 'xl',
  },
}

/**
 * Disabled state prevents interaction. Shows reduced opacity
 * and changes cursor to not-allowed.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

/**
 * Loading state displays a spinner and prevents interaction.
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
 * Icon-only button. Must include aria-label for accessibility.
 * Use when space is limited or in toolbars.
 */
export const IconOnly: Story = {
  args: {
    children: <PlusIcon />,
    iconOnly: true,
    'aria-label': 'Add item',
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
    'aria-label': 'Delete item',
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
  parameters: {
    layout: 'padded',
  },
}

/**
 * Toggle button using aria-pressed attribute. Use for buttons that
 * switch between two states (on/off, enabled/disabled).
 */
export const ToggleButton: Story = {
  args: {
    children: 'Toggle Feature',
    'aria-pressed': false,
  },
}

/**
 * Menu button with aria-haspopup and aria-expanded. Use for buttons
 * that open dropdown menus or expandable content.
 */
export const MenuButton: Story = {
  args: {
    children: 'Menu',
    iconRight: <ChevronDownIcon />,
    'aria-haspopup': 'menu',
    'aria-expanded': false,
  },
}

/**
 * All button variants displayed together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
      </div>
    </div>
  ),
}

/**
 * All button sizes displayed together for comparison.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

/**
 * Buttons with different icon configurations.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex gap-2 items-center">
        <Button iconLeft={<SaveIcon />}>Save</Button>
        <Button iconRight={<ChevronDownIcon />}>Options</Button>
        <Button iconOnly aria-label="Add">
          <PlusIcon />
        </Button>
        <Button iconOnly variant="destructive" aria-label="Delete">
          <TrashIcon />
        </Button>
      </div>
    </div>
  ),
}

/**
 * Form example with primary and secondary buttons.
 */
export const FormButtons: Story = {
  render: () => (
    <div className="flex gap-3 p-8">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </div>
  ),
}

/**
 * Responsive button sizes using Tailwind classes.
 * Shows how buttons can adapt to different screen sizes.
 */
export const ResponsiveSize: Story = {
  args: {
    children: 'Responsive Button',
    className: 'text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6',
  },
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
    <div className="flex flex-col gap-6 p-8">
      <h3 className="text-lg font-semibold">Border Radius Options</h3>
      <div className="flex flex-wrap gap-4 items-center">
        <Button rounded="none">None (Square)</Button>
        <Button rounded="sm">Small</Button>
        <Button rounded="base">Base</Button>
        <Button rounded="md">Medium</Button>
        <Button rounded="lg">Large (Default)</Button>
        <Button rounded="xl">Extra Large</Button>
        <Button rounded="2xl">2XL</Button>
        <Button rounded="3xl">3XL</Button>
        <Button rounded="full">Full (Pill)</Button>
      </div>
    </div>
  ),
}

/**
 * Square buttons with different variants.
 * Demonstrates how square corners work with all button variants.
 */
export const SquareVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-lg font-semibold">Square Buttons (rounded="none")</h3>
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary" rounded="none">
          Primary
        </Button>
        <Button variant="secondary" rounded="none">
          Secondary
        </Button>
        <Button variant="tertiary" rounded="none">
          Tertiary
        </Button>
        <Button variant="outline" rounded="none">
          Outline
        </Button>
        <Button variant="ghost" rounded="none">
          Ghost
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button variant="destructive" rounded="none">
          Destructive
        </Button>
        <Button variant="success" rounded="none">
          Success
        </Button>
        <Button variant="warning" rounded="none">
          Warning
        </Button>
      </div>
    </div>
  ),
}

/**
 * Pill buttons with different variants.
 * Demonstrates how pill shape works with all button variants.
 */
export const PillVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-lg font-semibold">Pill Buttons (rounded="full")</h3>
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary" rounded="full">
          Primary
        </Button>
        <Button variant="secondary" rounded="full">
          Secondary
        </Button>
        <Button variant="tertiary" rounded="full">
          Tertiary
        </Button>
        <Button variant="outline" rounded="full">
          Outline
        </Button>
        <Button variant="ghost" rounded="full">
          Ghost
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button variant="destructive" rounded="full">
          Destructive
        </Button>
        <Button variant="success" rounded="full">
          Success
        </Button>
        <Button variant="warning" rounded="full">
          Warning
        </Button>
      </div>
    </div>
  ),
}

/**
 * Square icon-only buttons.
 * Perfect for toolbars or compact interfaces.
 */
export const SquareIconButtons: Story = {
  render: () => (
    <div className="flex gap-2 p-8">
      <Button iconOnly rounded="none" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button iconOnly rounded="none" variant="secondary" aria-label="Save">
        <SaveIcon />
      </Button>
      <Button iconOnly rounded="none" variant="destructive" aria-label="Delete">
        <TrashIcon />
      </Button>
      <Button iconOnly rounded="none" variant="outline" aria-label="Options">
        <ChevronDownIcon />
      </Button>
    </div>
  ),
}

/**
 * Circular icon buttons (rounded="full").
 * Common for floating action buttons or social media icons.
 */
export const CircularIconButtons: Story = {
  render: () => (
    <div className="flex gap-2 p-8">
      <Button iconOnly rounded="full" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button iconOnly rounded="full" variant="secondary" aria-label="Save">
        <SaveIcon />
      </Button>
      <Button iconOnly rounded="full" variant="destructive" aria-label="Delete">
        <TrashIcon />
      </Button>
      <Button iconOnly rounded="full" variant="outline" aria-label="Options">
        <ChevronDownIcon />
      </Button>
    </div>
  ),
}

/**
 * Size and rounded combinations.
 * Shows how different sizes look with various border radii.
 */
export const SizeAndRoundedCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Square buttons at all sizes</h4>
        <div className="flex items-center gap-2">
          <Button size="xs" rounded="none">
            XS Square
          </Button>
          <Button size="sm" rounded="none">
            SM Square
          </Button>
          <Button size="md" rounded="none">
            MD Square
          </Button>
          <Button size="lg" rounded="none">
            LG Square
          </Button>
          <Button size="xl" rounded="none">
            XL Square
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Pill buttons at all sizes</h4>
        <div className="flex items-center gap-2">
          <Button size="xs" rounded="full">
            XS Pill
          </Button>
          <Button size="sm" rounded="full">
            SM Pill
          </Button>
          <Button size="md" rounded="full">
            MD Pill
          </Button>
          <Button size="lg" rounded="full">
            LG Pill
          </Button>
          <Button size="xl" rounded="full">
            XL Pill
          </Button>
        </div>
      </div>
    </div>
  ),
}
