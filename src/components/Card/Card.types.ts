/**
 * Shared Card types and props for both web and native platforms
 */

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode

  /**
   * Card title
   */
  title?: string

  /**
   * Card subtitle or description
   */
  subtitle?: string

  /**
   * Shadow elevation
   * @default 'md'
   */
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Padding size
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'

  /**
   * Additional CSS classes (web) or style object (native)
   */
  className?: string

  /**
   * Click handler for interactive cards
   */
  onPress?: () => void

  /**
   * Test ID for testing
   */
  testID?: string
}
