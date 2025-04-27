import React from 'react';

export default function RestaurantOwnerDashboard() {
  // Mock data - in a real app, you would fetch this from your API
  const restaurantData = {
    name: "Pizza Heaven",
    todayOrders: 24,
    pendingOrders: 5,
    totalRevenue: "$1,245.50",
    popularItems: [
      { name: "Pepperoni Pizza", orders: 42 },
      { name: "Margherita Pizza", orders: 38 },
      { name: "Hawaiian Pizza", orders: 27 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{restaurantData.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-500">Today's Orders</h3>
              <p className="text-3xl font-bold">{restaurantData.todayOrders}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-500">Pending Orders</h3>
              <p className="text-3xl font-bold text-orange-500">{restaurantData.pendingOrders}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-600">{restaurantData.totalRevenue}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Pending Orders</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Order #1089</p>
                    <p className="text-sm text-gray-500">2x Pepperoni, 1x Hawaiian</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
                  </div>
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Order #1090</p>
                    <p className="text-sm text-gray-500">1x Margherita, 1x Garlic Bread</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
                  </div>
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Order #1091</p>
                    <p className="text-sm text-gray-500">3x Pepperoni, 2x Soda</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Popular Items</h3>
            <div className="space-y-4">
              {restaurantData.popularItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600">{item.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4">
            Manage Menu
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
