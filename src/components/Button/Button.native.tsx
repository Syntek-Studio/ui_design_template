/**
 * Button Component - React Native Implementation
 *
 * Uses Nativewind for styling
 */

import React from 'react'
import { Pressable, Text } from 'react-native'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary: 'bg-primary-600 active:bg-primary-800',
  secondary: 'bg-secondary-600 active:bg-secondary-800',
  outline: 'border-2 border-primary-600 active:bg-primary-100',
  ghost: 'active:bg-primary-100',
}

const textVariantClasses = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary-600',
  ghost: 'text-primary-600',
}

const sizeClasses = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
}

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onPress,
  className = '',
  testID,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      className={`
        flex-row items-center justify-center
        rounded-lg
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <Text
        className={`
          font-medium
          ${textVariantClasses[variant]}
          ${textSizeClasses[size]}
        `.trim().replace(/\s+/g, ' ')}
      >
        {children}
      </Text>
    </Pressable>
  )
}

Button.displayName = 'Button'
