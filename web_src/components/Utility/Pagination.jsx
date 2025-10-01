import React from 'react';

export const Pagination = ({ current = 1, total = 5, onPageChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2 font-sans">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            page === current ? 'bg-logo text-white' : 'bg-white text-logo border-logo'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;