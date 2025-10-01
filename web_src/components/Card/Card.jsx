import React from 'react';

const Card = ({ title, children, footer }) => {
  return (
    <div className="bg-white text-[var(--color-logo)] rounded-lg shadow-md p-6 m-4 font-sans max-w-sm">
      {title && <h2 className="text-lg font-heading mb-2">{title}</h2>}
      <div className="prose text-[var(--color-text-muted)]">
        {children}
      </div>
      {footer && <div className="mt-4 border-t border-gray-200 pt-2 text-sm">{footer}</div>}
    </div>
  );
};

export default Card;