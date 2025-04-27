import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import NomNowLogo from '../icons/NomNowLogo';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import Divider from '../ui/Divider';

const LoginModal = ({ 
  isOpen, 
  onClose,
  onSignup 
}) => {
  if (!isOpen) return null;

  const handleLogin = (email, password) => {
    console.log('Login attempt with:', { email, password });
    // Add login logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add forgot password logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add Google login logic here
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Add Facebook login logic here
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>
        
        {/* Modal panel */}
        <div className="relative inline-block w-full max-w-md rounded-lg bg-gray-400 text-center overflow-hidden shadow-xl transform transition-all sm:my-8">
          <div className="absolute top-3 right-3">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="px-8 py-6">
            <div className="mb-6 mt-4">
              <NomNowLogo className="mx-auto" />
            </div>
            
            <div className="space-y-6">
              <LoginForm 
                onSubmit={handleLogin}
                onForgotPassword={handleForgotPassword}
              />
              
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <button 
                  onClick={onSignup} 
                  className="text-orange-400 hover:text-orange-500 font-medium focus:outline-none transition-colors"
                >
                  Signup
                </button>
              </div>
              
              <Divider text="Or" />
              
              <SocialLogin
                onGoogleLogin={handleGoogleLogin}
                onFacebookLogin={handleFacebookLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default LoginModal;