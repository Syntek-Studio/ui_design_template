import React from 'react';

export const Toast = ({ type = 'info', message }) => {
  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${colors[type]} font-sans`}>
      {message}
    </div>
  );
};

export default Toast;