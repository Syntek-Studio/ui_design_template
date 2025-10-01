import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-dark)] text-[var(--color-text-light)] font-sans">
      {children}
    </div>
  );
};

export default PageWrapper;