import React from 'react';

export default function RestaurantMenuPage() {
  // Mock data - in a real app, you would fetch this from your API
  const menuItems = [
    { id: 1, name: 'Pepperoni Pizza', price: '$12.99', category: 'Pizza', available: true, image: '/pizza1.jpg' },
    { id: 2, name: 'Margherita Pizza', price: '$10.99', category: 'Pizza', available: true, image: '/pizza2.jpg' },
    { id: 3, name: 'Hawaiian Pizza', price: '$13.99', category: 'Pizza', available: true, image: '/pizza3.jpg' },
    { id: 4, name: 'Garlic Bread', price: '$4.99', category: 'Sides', available: true, image: '/bread.jpg' },
    { id: 5, name: 'Caesar Salad', price: '$7.99', category: 'Salads', available: false, image: '/salad.jpg' },
    { id: 6, name: 'Soda', price: '$2.99', category: 'Drinks', available: true, image: '/soda.jpg' },
  ];

  const categories = ['All', 'Pizza', 'Sides', 'Salads', 'Drinks'];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add New Item
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded ${
                category === 'All' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between">
          <input 
            type="text" 
            placeholder="Search menu items..." 
            className="border rounded px-3 py-2 w-64"
          />
          <select className="border rounded px-3 py-2">
            <option>Sort by: Name (A-Z)</option>
            <option>Sort by: Name (Z-A)</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <div className="text-gray-400">[Image Placeholder]</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="font-bold text-orange-600">{item.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
