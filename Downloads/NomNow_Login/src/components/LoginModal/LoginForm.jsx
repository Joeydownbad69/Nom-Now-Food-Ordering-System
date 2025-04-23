import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = ({ onSubmit, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        aria-label="Email address"
      />
      
      <div className="space-y-1">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          aria-label="Password"
        />
        
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-gray-800 hover:text-orange-500 focus:outline-none transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </div>
      
      <Button type="submit" variant="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};

export default LoginForm;