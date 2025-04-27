"use client";
import React from 'react';
import AdminToolsLayout from "../tools-layout";

export default function OrdersAdminPage() {
  // Mock data - in a real app, you would fetch this from your API
  const orders = [
    { id: 1001, customer: 'John Doe', restaurant: 'Burger Palace', total: '$24.99', status: 'completed', date: '2025-04-26' },
    { id: 1002, customer: 'Jane Smith', restaurant: 'Pizza Heaven', total: '$32.50', status: 'in-progress', date: '2025-04-27' },
    { id: 1003, customer: 'Mike Johnson', restaurant: 'Sushi World', total: '$45.75', status: 'pending', date: '2025-04-27' },
    { id: 1004, customer: 'Sarah Williams', restaurant: 'Taco Time', total: '$18.25', status: 'completed', date: '2025-04-25' },
  ];

  return (
    <AdminToolsLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        
        <div className="mb-6 flex justify-between">
          <div className="flex space-x-2">
            <select className="border rounded px-3 py-2">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <select className="border rounded px-3 py-2">
              <option>All Restaurants</option>
              <option>Burger Palace</option>
              <option>Pizza Heaven</option>
              <option>Sushi World</option>
              <option>Taco Time</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.restaurant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Update</button>
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
