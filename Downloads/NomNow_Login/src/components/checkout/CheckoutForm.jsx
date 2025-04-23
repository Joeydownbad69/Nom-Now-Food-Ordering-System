import React, { useState } from 'react';
import { CreditCard, MapPin, Truck, CheckCircle } from 'lucide-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const CheckoutForm = ({ currentStep, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    paymentMethod: 'cash',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (currentStep === 3) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md transform transition-all animate-fadeIn">
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-scaleIn" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your order has been successfully placed. You will receive a confirmation email shortly.
          </p>
          <p className="font-medium text-gray-700">Order #: {Math.floor(100000 + Math.random() * 900000)}</p>
          <p className="text-gray-600 mt-4">
            Estimated delivery: <span className="font-semibold">Within 30-45 minutes</span>
          </p>
          <button 
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Track Your Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      {currentStep === 1 && (
        <div className="animate-fadeIn">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
          </div>
          
          <div className="space-y-4">
            <FormInput
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            
            <div className="form-group">
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                required
              />
              
              <FormInput
                label="Postal Code"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Continue to Payment
          </button>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="animate-fadeIn">
          <div className="flex items-center mb-6">
            <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Payment Method</h2>
          </div>
          
          <div className="space-y-4">
            <FormSelect
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              options={[
                { value: 'cash', label: 'Cash on Delivery' },
                { value: 'card', label: 'Credit/Debit Card' },
                { value: 'gcash', label: 'GCash' }
              ]}
            />
            
            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 animate-fadeIn">
                <FormInput
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required={formData.paymentMethod === 'card'}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Expiry Date"
                    name="cardExpiry"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required={formData.paymentMethod === 'card'}
                  />
                  
                  <FormInput
                    label="CVC"
                    name="cardCvc"
                    type="text"
                    placeholder="123"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    required={formData.paymentMethod === 'card'}
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center mt-6 text-gray-600">
              <Truck className="w-5 h-5 mr-2 text-gray-500" />
              <p>Delivery estimated within 30-45 minutes after order confirmation.</p>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Processing...
              </span>
            ) : (
              'Confirm Order'
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;