import React from 'react';
import { MapPin, CreditCard, Check } from 'lucide-react';

const CheckoutSteps = ({ currentStep, onChange }) => {
  const steps = [
    { id: 1, name: 'Shipping', icon: MapPin },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Confirmation', icon: Check }
  ];
  
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep >= step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;
            
            return (
              <React.Fragment key={step.id}>
                <div 
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isCompleted ? 'scale-110' : ''}`}
                  onClick={() => isCompleted ? onChange(step.id) : null}
                >
                  <Icon className="w-6 h-6" />
                  
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  
                  {isCompleted && (
                    <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-green-500 rounded-full p-1 transform scale-in animate-scaleIn">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      style={{
                        width: currentStep > index + 1 ? '100%' : currentStep === index + 1 ? '50%' : '0%',
                        transition: 'width 0.6s ease-in-out'
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;