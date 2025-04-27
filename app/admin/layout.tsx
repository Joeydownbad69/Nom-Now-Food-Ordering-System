"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Removed top nav bar with Dashboard, Restaurants, Orders, Users, Logout
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
