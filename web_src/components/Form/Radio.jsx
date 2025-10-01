import React from 'react';

const Radio = ({ label, name, value, checked, onChange, id }) => (
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-logo border-gray-300 focus:ring-2 focus:ring-logo"
    />
    {label && <label htmlFor={id} className="font-sans text-gray-700">{label}</label>}
  </div>
);

export default Radio;