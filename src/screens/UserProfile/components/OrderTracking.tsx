import React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  restaurant: string;
  items: OrderItem[];
  total: number;
  status: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

interface OrderTrackingProps {
  activeOrders: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ activeOrders }) => {
  const getStatusStep = (status: string) => {
    switch (status) {
      case 'preparing':
        return 1;
      case 'ready':
        return 2;
      case 'in-transit':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (activeOrders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You don't have any active orders to track.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Order Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Track Your Orders</h2>
      
      <div className="space-y-8">
        {activeOrders.map(order => {
          const statusStep = getStatusStep(order.status);
          
          return (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{order.restaurant}</h3>
                  <p className="text-sm text-gray-500">Order #{order.id} • {formatDate(order.date)}</p>
                </div>
                
                {order.estimatedDelivery && (
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-medium">{order.estimatedDelivery}</p>
                  </div>
                )}
              </div>
              
              {/* Order Tracking Steps */}
              <div className="relative mb-8">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                
                <div className="relative flex justify-between">
                  {/* Step 1: Confirmed */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStep >= 0 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs mt-1">Confirmed</span>
                  </div>
                  
                  {/* Step 2: Preparing */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-xs mt-1">Preparing</span>
                  </div>
                  
                  {/* Step 3: In Transit */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-xs mt-1">In Transit</span>
                  </div>
                  
                  {/* Step 4: Delivered */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStep >= 4 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="text-xs mt-1">Delivered</span>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Order Summary:</span>
                  <button className="text-sm text-blue-500 hover:text-blue-700 transition">View Details</button>
                </div>
                
                <ul className="text-sm space-y-1 mb-3">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between text-sm">
                  <span>Total:</span>
                  <span className="font-medium">₱{order.total.toFixed(2)}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm mb-2">
                    <span className="font-medium">Delivery to:</span> {order.deliveryAddress}
                  </p>
                  
                  <div className="flex space-x-3 mt-3">
                    <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      Contact Restaurant
                    </button>
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition">
                      Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
