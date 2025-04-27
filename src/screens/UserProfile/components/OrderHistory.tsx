import React, { useState } from 'react';

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

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't placed any orders yet.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleOrderDetails(order.id)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{order.restaurant}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(order.status)}`}>
                    {formatStatus(order.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
              </div>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <p className="font-medium">₱{order.total.toFixed(2)}</p>
                <svg 
                  className={`w-5 h-5 ml-2 transition-transform ${expandedOrderId === order.id ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {expandedOrderId === order.id && (
              <div className="p-4 border-t">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₱{item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-3 mb-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₱{order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="mb-1"><span className="font-medium">Delivery Address:</span> {order.deliveryAddress}</p>
                  <button className="mt-3 text-blue-500 hover:text-blue-700 transition">
                    Reorder
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
