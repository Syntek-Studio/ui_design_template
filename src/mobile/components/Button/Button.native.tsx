import { Pressable, Text } from 'react-native';

/**
 * Props for the mobile Button component
 */
export interface ButtonProps {
  /** The text displayed inside the button */
  title: string;

  /** Callback function invoked when the button is pressed */
  onPress?: () => void;

  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary';

  /** Whether the button is disabled and should not respond to interactions */
  disabled?: boolean;

  /** Additional Nativewind CSS classes for custom styling */
  className?: string;
}

/**
 * Button component for React Native mobile applications
 *
 * A versatile button component with support for multiple variants and states.
 * Built with React Native and Nativewind for consistent styling across iOS and Android.
 *
 * @example
 * // Basic button
 * <Button title="Press me" onPress={() => {}} />
 *
 * @example
 * // Secondary variant
 * <Button title="Cancel" variant="secondary" onPress={() => {}} />
 *
 * @example
 * // Disabled button
 * <Button title="Submit" disabled={true} onPress={() => {}} />
 *
 * @param props - The button properties
 * @returns A rendered pressable with text content
 */
export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';
  const baseStyles = 'px-4 py-2 rounded active:opacity-80';
  const disabledStyle = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseStyles} ${bgColor} ${disabledStyle} ${className}`}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </Pressable>
  );
};
