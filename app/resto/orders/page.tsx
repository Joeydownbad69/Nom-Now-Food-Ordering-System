import React from 'react';

export default function RestaurantOrdersPage() {
  // Mock data - in a real app, you would fetch this from your API
  const orders = [
    { 
      id: 1001, 
      customer: 'John Doe', 
      items: ['2x Pepperoni Pizza', '1x Soda'], 
      total: '$28.97', 
      status: 'pending', 
      time: '22:05', 
      address: '123 Main St, Apt 4B'
    },
    { 
      id: 1002, 
      customer: 'Jane Smith', 
      items: ['1x Margherita Pizza', '1x Garlic Bread'], 
      total: '$15.98', 
      status: 'preparing', 
      time: '21:50', 
      address: '456 Oak Ave'
    },
    { 
      id: 1003, 
      customer: 'Mike Johnson', 
      items: ['1x Hawaiian Pizza', '1x Caesar Salad'], 
      total: '$21.98', 
      status: 'ready', 
      time: '21:35', 
      address: '789 Pine Blvd'
    },
    { 
      id: 1004, 
      customer: 'Sarah Williams', 
      items: ['3x Pepperoni Pizza', '2x Soda'], 
      total: '$44.95', 
      status: 'delivered', 
      time: '21:15', 
      address: '101 Elm St'
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      
      <div className="mb-6 flex justify-between">
        <div className="flex space-x-2">
          <select className="border rounded px-3 py-2">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Filter
          </button>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 
                    order.status === 'ready' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{order.time} • {order.customer}</p>
              </div>
              <span className="font-bold text-lg text-orange-600">{order.total}</span>
            </div>
            
            <div className="mt-3 border-t pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Items</h4>
                  <ul className="text-sm">
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">Delivery Address</h4>
                  <p className="text-sm">{order.address}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              {order.status === 'pending' && (
                <>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    Accept Order
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Reject Order
                  </button>
                </>
              )}
              
              {order.status === 'preparing' && (
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                  Mark as Ready
                </button>
              )}
              
              {order.status === 'ready' && (
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                  Mark as Delivered
                </button>
              )}
              
              <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
