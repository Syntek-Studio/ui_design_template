import React from 'react';

const TextInput = ({ label, placeholder, value, onChange, id }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="font-heading text-gray-700">{label}</label>}
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 font-sans focus:outline-none focus:ring-2 focus:ring-logo"
      />
    </div>
  );
};

export default TextInput;