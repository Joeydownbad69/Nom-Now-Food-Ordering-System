"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import AdminToolsLayout from "../tools-layout";

export default function MenuManagementPage() {
  const { userRole } = useAuth();
  const router = useRouter();
  
  // Redirect if not admin
  React.useEffect(() => {
    if (userRole !== 'admin') {
      router.push('/admin/login');
    }
  }, [userRole, router]);

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    itemName: '',
    price: '',
    description: '',
    image: null,
    category: '',
    restaurant: ''
  });

  const categories = ["Pizza", "Burger", "Pasta", "Drinks", "Desserts"];
  const restaurants = ["Burger Barn", "Pizza Palace", "Pasta Paradise"];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('Form submitted:', formData);
    
    // For demo purposes, add to local state
    const newItem = {
      id: Date.now(),
      name: formData.itemName,
      price: formData.price,
      description: formData.description,
      category: formData.category,
      restaurant: formData.restaurant
    };
    
    setMenuItems([...menuItems, newItem]);
    
    // Reset form
    setFormData({
      itemName: '',
      price: '',
      description: '',
      image: null,
      category: '',
      restaurant: ''
    });
  };
  
  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <AdminToolsLayout>
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-6">Menu Management</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="e.g., Chicken Alfredo"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-xs text-gray-400">(auto-suggested, can override)</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 250"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the dish..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="border border-gray-300 rounded p-2">
                  <p className="text-sm text-gray-500 mb-2">Paste image URL or upload</p>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm mr-2"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Browse...
                    </button>
                    <span className="text-sm text-gray-500">
                      {formData.image ? (formData.image as File).name : 'No file selected'}
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant</label>
                <select
                  name="restaurant"
                  value={formData.restaurant}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select restaurant</option>
                  {restaurants.map((restaurant) => (
                    <option key={restaurant} value={restaurant}>{restaurant}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {menuItems.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₱{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.restaurant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center py-4">No menu items yet.</p>
          )}
        </div>
      </div>
    </AdminToolsLayout>
  );
}
