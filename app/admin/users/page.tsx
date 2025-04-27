"use client";
import React from 'react';
import AdminToolsLayout from "../tools-layout";

export default function UsersAdminPage() {
  // Mock data - in a real app, you would fetch this from your API
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joined: '2025-01-15', orders: 12 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Restaurant Owner', joined: '2025-02-20', orders: 0 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', joined: '2025-03-10', orders: 8 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Admin', joined: '2024-12-05', orders: 3 },
  ];

  return (
    <AdminToolsLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add New User
          </button>
        </div>

        <div className="mb-6 flex justify-between">
          <div className="flex space-x-2">
            <select className="border rounded px-3 py-2">
              <option>All Roles</option>
              <option>Customer</option>
              <option>Restaurant Owner</option>
              <option>Admin</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Filter
            </button>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Search users..." 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'Restaurant Owner' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.orders}</td>
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
