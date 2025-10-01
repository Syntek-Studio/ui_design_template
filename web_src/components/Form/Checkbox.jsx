import React from 'react';

const Checkbox = ({ label, checked, onChange, id }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-logo border-gray-300 rounded focus:ring-2 focus:ring-logo"
    />
    {label && <label htmlFor={id} className="font-sans text-gray-700">{label}</label>}
  </div>
);

export default Checkbox;