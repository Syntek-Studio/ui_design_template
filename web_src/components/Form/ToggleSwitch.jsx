import React from 'react';

const ToggleSwitch = ({ checked, onChange, id }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <label htmlFor={id} className="w-11 h-6 bg-gray-300 rounded-full relative cursor-pointer transition-colors duration-300 peer-checked:bg-logo">
      <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
    </label>
  </div>
);

export default ToggleSwitch;