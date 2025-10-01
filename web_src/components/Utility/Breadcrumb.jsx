import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export const Breadcrumb = ({ items = [] }) => (
  <nav className="flex font-sans text-sm text-muted">
    {items.map((item, idx) => (
      <span key={idx} className="flex items-center">
        <a href={item.href} className="hover:underline">{item.label}</a>
        {idx < items.length - 1 && <ChevronRightIcon className="w-4 h-4 mx-1" />}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;