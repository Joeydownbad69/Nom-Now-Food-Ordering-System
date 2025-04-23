import React, { useState } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  required = false
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  
  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    setFocused(false);
    setTouched(true);
  };
  
  const isValid = !required || (required && value.trim() !== '');
  const showError = touched && !isValid;
  
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
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`w-full px-4 py-2 border rounded-lg transition-all duration-300 focus:outline-none ${
            focused 
              ? 'border-blue-500 ring-2 ring-blue-100 shadow-sm' 
              : showError 
                ? 'border-red-500 bg-red-50'
                : touched && isValid 
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300'
          }`}
        />
        
        {showError && (
          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
            {label} is required
          </p>
        )}
        
        {touched && isValid && value.trim() !== '' && (
          <div className="absolute top-0 right-0 mt-2.5 mr-3 text-green-500 animate-scaleIn">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;