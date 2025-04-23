import React, { useState } from 'react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { ShoppingBag } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample order items
  const orderItems = [
    { id: 1, name: 'Jollibee Family Meal', price: 799.00 },
    { id: 2, name: 'Siomai Spicy Chao Fan', price: 129.00 },
    { id: 3, name: 'Inasalsal Family Fiesta', price: 680.00 },
    { id: 4, name: '4-Cheese Whopper Meal', price: 210.00 }
  ];

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = (formData: any) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setCurrentStep(currentStep + 1);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fadeIn">
      <div className="flex items-center justify-center mb-8">
        <ShoppingBag className="w-8 h-8 text-blue-600 mr-2 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      </div>

      <CheckoutSteps currentStep={currentStep} onChange={handleStepChange} />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 animate-slideInLeft" style={{ 
          animationDelay: '0.1s',
          animationFillMode: 'both'
        }}>
          <CheckoutForm 
            currentStep={currentStep} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        
        <div className="animate-slideInRight" style={{ 
          animationDelay: '0.3s',
          animationFillMode: 'both'
        }}>
          <OrderSummary items={orderItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;