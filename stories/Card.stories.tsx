import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../src/components/Card/Card.web'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a card component with default styling.',
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title.',
  },
}

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle that provides additional context',
    children: 'This card has both title and subtitle.',
  },
}

export const NoElevation: Story = {
  args: {
    title: 'No Shadow',
    elevation: 'none',
    children: 'This card has no shadow.',
  },
}

export const SmallElevation: Story = {
  args: {
    title: 'Small Shadow',
    elevation: 'sm',
    children: 'This card has a small shadow.',
  },
}

export const MediumElevation: Story = {
  args: {
    title: 'Medium Shadow',
    elevation: 'md',
    children: 'This card has a medium shadow.',
  },
}

export const LargeElevation: Story = {
  args: {
    title: 'Large Shadow',
    elevation: 'lg',
    children: 'This card has a large shadow.',
  },
}

export const XLElevation: Story = {
  args: {
    title: 'Extra Large Shadow',
    elevation: 'xl',
    children: 'This card has an extra large shadow.',
  },
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: 'This card has no padding.',
  },
}

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: 'This card has small padding.',
  },
}

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: 'This card has large padding.',
  },
}

export const Interactive: Story = {
  args: {
    title: 'Interactive Card',
    subtitle: 'Click me!',
    children: 'This card is clickable and shows a hover effect.',
    onPress: () => alert('Card clicked!'),
  },
}
