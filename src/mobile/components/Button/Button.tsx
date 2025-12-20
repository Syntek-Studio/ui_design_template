import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';
  const disabledStyle = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`px-4 py-2 rounded ${bgColor} ${disabledStyle} active:opacity-80`}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </Pressable>
  );
};
