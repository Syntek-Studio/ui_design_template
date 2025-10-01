import React from 'react';

export const Alert = ({ type = 'info', message }) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`p-4 rounded-md ${colors[type]} font-sans`} role="alert">
      {message}
    </div>
  );
};

export default Alert;