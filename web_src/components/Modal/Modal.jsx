import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg-dark)] text-[var(--color-text-light)] rounded-lg p-6 w-11/12 max-w-md shadow-lg">
        {children}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-[var(--color-logo)] text-white rounded-md hover:bg-opacity-90"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;