export interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  title,
  onClick,
  variant = 'primary',
}: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${bgColor} text-white font-semibold hover:opacity-90 transition-opacity`}
    >
      {title}
    </button>
  );
};
