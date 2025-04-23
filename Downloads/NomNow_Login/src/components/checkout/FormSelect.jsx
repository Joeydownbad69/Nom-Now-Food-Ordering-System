import React, { useState } from 'react';

const FormSelect = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false
}) => {
  const [focused, setFocused] = useState(false);
  
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  
  return (
    <div className="form-group">
      <label 
        htmlFor={name} 
        className={`block mb-2 transition-all duration-300 ${
          focused ? 'text-blue-600 font-medium' : 'text-gray-700'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`w-full px-4 py-2 border rounded-lg appearance-none bg-white transition-all duration-300 focus:outline-none ${
            focused 
              ? 'border-blue-500 ring-2 ring-blue-100 shadow-sm' 
              : 'border-gray-300'
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute top-0 right-0 mt-2 mr-3 text-gray-500 pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FormSelect;