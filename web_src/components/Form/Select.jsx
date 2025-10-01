import React from 'react';

const Select = ({ label, options, value, onChange, id }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="font-heading text-gray-700">{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-logo"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;