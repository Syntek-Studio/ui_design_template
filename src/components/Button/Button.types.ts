/**
 * Shared Button types and props for both web and native platforms
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode

  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean

  /**
   * Click handler
   */
  onPress?: () => void

  /**
   * Additional CSS classes (web) or style object (native)
   */
  className?: string

  /**
   * Test ID for testing
   */
  testID?: string
}
