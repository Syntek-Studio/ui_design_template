/**
 * Props for the Button component
 */
export interface ButtonProps {
  /** The text displayed inside the button */
  title: string;

  /** Callback function invoked when the button is clicked */
  onClick?: () => void;

  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary';

  /** Additional Tailwind CSS classes for custom styling */
  className?: string;

  /** Whether the button is disabled and should not respond to interactions */
  disabled?: boolean;
}

/**
 * Button component for web applications
 *
 * A versatile button component with support for multiple variants and states.
 * Built with React and Tailwind CSS for consistent styling.
 *
 * @example
 * // Basic button
 * <Button title="Click me" onClick={() => {}} />
 *
 * @example
 * // Secondary variant
 * <Button title="Cancel" variant="secondary" onClick={() => {}} />
 *
 * @example
 * // Disabled button
 * <Button title="Submit" disabled={true} onClick={() => {}} />
 *
 * @param props - The button properties
 * @returns A rendered button element
 */
export const Button = ({
  title,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';
  const baseStyles = 'px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition-opacity';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${bgColor} ${disabledStyles} ${className}`}
    >
      {title}
    </button>
  );
};
