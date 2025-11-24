/**
 * Card Component - Web Implementation
 *
 * Uses Tailwind CSS for styling
 */

import React from 'react'
import type { CardProps } from './Card.types'

const elevationClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  elevation = 'md',
  padding = 'md',
  className = '',
  onPress,
  testID,
}) => {
  const Component = onPress ? 'button' : 'div'

  return (
    <Component
      onClick={onPress}
      data-testid={testID}
      className={`
        bg-white rounded-lg border border-secondary-200
        ${elevationClasses[elevation]}
        ${onPress ? 'cursor-pointer transition-shadow hover:shadow-lg' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {(title || subtitle) && (
        <div className={`border-b border-secondary-200 ${paddingClasses[padding]}`}>
          {title && (
            <h3 className="text-lg font-semibold text-secondary-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-secondary-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </Component>
  )
}

Card.displayName = 'Card'
