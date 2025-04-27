"use client";
import React from 'react';
import AdminToolsLayout from "../tools-layout";

export default function RestaurantsAdminPage() {
  // This is a mock data array - in a real app, you would fetch this from your API
  const restaurants = [
    { id: 1, name: 'Burger Palace', status: 'active', orders: 145 },
    { id: 2, name: 'Pizza Heaven', status: 'active', orders: 89 },
    { id: 3, name: 'Sushi World', status: 'inactive', orders: 56 },
    { id: 4, name: 'Taco Time', status: 'active', orders: 112 },
  ];

  return (
    <AdminToolsLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Restaurant Management</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add New Restaurant
          </button>
        </div>

        <div className="mb-6 flex justify-between">
          <div className="flex space-x-2">
            <select className="border rounded px-3 py-2">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Filter
            </button>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Search restaurants..." 
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      restaurant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminToolsLayout>
  );
}
