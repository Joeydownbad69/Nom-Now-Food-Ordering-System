"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  
  const handleLogout = () => {
    // Clear the restaurant token cookie
    document.cookie = "resto-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to login page
    router.push('/resto/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-orange-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">NomNow Restaurant Portal</h1>
          <div className="flex space-x-4">
            <a href="/resto" className="hover:underline">Dashboard</a>
            <a href="/resto/menu" className="hover:underline">Menu</a>
            <a href="/resto/orders" className="hover:underline">Orders</a>
            <a href="/resto/settings" className="hover:underline">Settings</a>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
