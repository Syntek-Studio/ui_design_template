import React from 'react';

export const Stepper = ({ steps = [], currentStep = 1 }) => (
  <div className="flex items-center space-x-2 font-sans">
    {steps.map((step, idx) => (
      <div key={idx} className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            idx + 1 <= currentStep ? 'bg-logo text-white' : 'bg-gray-300 text-gray-600'
          }`}
        >
          {idx + 1}
        </div>
        {idx < steps.length - 1 && <div className="flex-1 h-1 bg-gray-300"></div>}
      </div>
    ))}
  </div>
);

export default Stepper;