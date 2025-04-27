import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const subtotal = items.reduce((total, item) => total + item.price, 0);
  const deliveryFee = 49.00;
  const total = subtotal + deliveryFee;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        <ul className="pb-4 space-y-3">
          {items.map((item) => (
            <li 
              key={item.id}
              className="flex justify-between items-center group transition-all duration-300 transform hover:translate-x-1 cursor-default"
            >
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.name}</span>
              <span className="font-medium text-gray-900">₱{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">₱{deliveryFee.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-blue-600 animate-pulse">₱{total.toFixed(2)}</span>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">
              Your order will be prepared immediately after confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;