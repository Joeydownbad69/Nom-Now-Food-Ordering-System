import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import UserDetails from './components/UserDetails';
import LocationEditor from './components/LocationEditor';
import OrderHistory from './components/OrderHistory';
import OrderTracking from './components/OrderTracking';
import { Navigate } from 'react-router-dom';

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    date: '2025-04-25',
    restaurant: 'Pizza Palace',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 350 },
      { name: 'Garlic Bread', quantity: 1, price: 120 }
    ],
    total: 470,
    status: 'delivered',
    deliveryAddress: '123 Main St, City, State, 12345'
  },
  {
    id: 2,
    date: '2025-04-26',
    restaurant: 'Burger Barn',
    items: [
      { name: 'Cheeseburger', quantity: 2, price: 280 },
      { name: 'Fries', quantity: 1, price: 100 }
    ],
    total: 660,
    status: 'in-transit',
    deliveryAddress: '123 Main St, City, State, 12345',
    estimatedDelivery: '30-40 minutes'
  },
  {
    id: 3,
    date: '2025-04-27',
    restaurant: 'Taco Town',
    items: [
      { name: 'Beef Tacos', quantity: 3, price: 270 },
      { name: 'Nachos', quantity: 1, price: 180 }
    ],
    total: 450,
    status: 'preparing',
    deliveryAddress: '123 Main St, City, State, 12345',
    estimatedDelivery: '45-55 minutes'
  }
];

type Tab = 'details' | 'orders' | 'tracking';

export const UserProfile: React.FC = () => {
  const { user, isLoading, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<Tab>('details');

  // If no user is logged in, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button 
          onClick={logout} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('details')}
        >
          My Details
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'tracking' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tracking')}
        >
          Track Orders
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'details' && (
          <div>
            <UserDetails user={user} />
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Location</h2>
              <LocationEditor />
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <OrderHistory orders={mockOrders} />
        )}
        
        {activeTab === 'tracking' && (
          <OrderTracking 
            activeOrders={mockOrders.filter(order => order.status !== 'delivered')} 
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
