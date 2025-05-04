'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/checkout/checkout-form';
import OrderSummary from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  // Redirect to home if cart is empty
  if (items.length === 0 && !showConfirmation) {
    router.push('/');
    return null;
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
  };
  
  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mt-10">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg 
                  className="w-8 h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
              
              <p className="text-gray-600">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>
              
              <div className="mt-8 text-center">
                <p className="text-gray-500 mb-2">
                  Order #: NOM-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                </p>
                <p className="text-gray-500">
                  Estimated delivery time: 30-45 minutes
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  router.push('/');
                  useCartStore.getState().clearCart();
                }}
                className="mt-6"
              >
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleSubmitOrder} isSubmitting={isSubmitting} />
          </div>
          
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}