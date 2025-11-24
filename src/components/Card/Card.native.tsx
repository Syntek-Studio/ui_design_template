/**
 * Card Component - React Native Implementation
 *
 * Uses Nativewind for styling
 */

import React from 'react'
import { View, Text, Pressable } from 'react-native'
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
  const content = (
    <>
      {(title || subtitle) && (
        <View className={`border-b border-secondary-200 ${paddingClasses[padding]}`}>
          {title && (
            <Text className="text-lg font-semibold text-secondary-900">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="text-sm text-secondary-600 mt-1">
              {subtitle}
            </Text>
          )}
        </View>
      )}
      <View className={paddingClasses[padding]}>
        {children}
      </View>
    </>
  )

  const cardClasses = `
    bg-white rounded-lg border border-secondary-200
    ${elevationClasses[elevation]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        testID={testID}
        className={cardClasses}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View testID={testID} className={cardClasses}>
      {content}
    </View>
  )
}

Card.displayName = 'Card'
