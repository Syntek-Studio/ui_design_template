import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-all duration-300";
  const variants = {
    primary: "bg-[var(--color-logo)] text-white hover:bg-opacity-90",
    secondary: "bg-white text-[var(--color-logo)] border border-[var(--color-logo)] hover:bg-gray-100"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;