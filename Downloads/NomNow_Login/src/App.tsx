import React, { useState } from 'react';
import LoginModal from './components/LoginModal/LoginModal';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const handleSignup = () => {
    console.log('Signup clicked');
    // Add signup logic or navigation here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome to NomNow</h1>
        <p className="text-center text-gray-600">
          Sign in to access your account and explore our services.
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={openLoginModal}
            className="px-6 py-2 bg-orange-400 text-black font-medium rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
          >
            Open Login Modal
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSignup={handleSignup}
      />
    </div>
  );
}

export default App;