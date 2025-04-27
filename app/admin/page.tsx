"use client";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function AdminPage() {
  const { userRole, isLoading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userRole !== "admin") {
      router.push("/admin/login");
    }
  }, [userRole, isLoading, router]);

  if (isLoading || userRole !== "admin") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="spinner" style={{ width: 48, height: 48, border: "6px solid #eee", borderTop: "6px solid #3498db", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 border-b border-gray-200 flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">NomNow Admin</span>
            <span className="text-sm text-gray-500 mt-1">Welcome{user?.name ? `, ${user.name}` : ''}!</span>
          </div>
          <nav className="mt-8 flex-1">
            <ul className="space-y-2 px-4">
              <li>
                <Link href="/admin/menu-management" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-orange-600 font-semibold bg-orange-100">
                  Menu Management
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  User Management
                </Link>
              </li>
              <li>
                <Link href="/admin/restaurants" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Restaurant Management
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Order Oversight
                </Link>
              </li>
              <li>
                <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/admin/notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Notifications
                </Link>
              </li>
              <li>
                <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Reviews Moderation
                </Link>
              </li>
              <li>
                <Link href="/admin/support" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Support Tickets
                </Link>
              </li>
              <li>
                <Link href="/admin/activity" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Activity Log
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <button
          onClick={logout}
          className="m-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <p className="text-gray-600 mb-4 text-center">Manage all customer orders efficiently.</p>
            <Link href="/admin/orders" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition">View Orders</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Restaurants</h2>
            <p className="text-gray-600 mb-4 text-center">Manage and update restaurant listings.</p>
            <Link href="/admin/restaurants" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition">Manage Restaurants</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-gray-600 mb-4 text-center">View and manage user accounts.</p>
            <Link href="/admin/users" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition">Manage Users</Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Menu Management</h2>
            <p className="text-gray-600 mb-4 text-center">Add, edit, or remove menu items for restaurants.</p>
            <Link href="/admin/menu-management" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition">Manage Menu</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
