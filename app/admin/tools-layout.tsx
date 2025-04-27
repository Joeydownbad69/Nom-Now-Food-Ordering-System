"use client";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const adminTools = [
  { name: "Menu Management", href: "/admin/menu-management" },
  { name: "User Management", href: "/admin/users" },
  { name: "Restaurant Management", href: "/admin/restaurants" },
  { name: "Order Oversight", href: "/admin/orders" },
  { name: "Analytics", href: "/admin/analytics" },
  { name: "Notifications", href: "/admin/notifications" },
  { name: "Reviews Moderation", href: "/admin/reviews" },
  { name: "Support Tickets", href: "/admin/support" },
  { name: "Activity Log", href: "/admin/activity" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminToolsLayout({ children }: { children: React.ReactNode }) {
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

  // Get current path for active highlight
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : "";

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
              {adminTools.map(tool => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 ${currentPath === tool.href ? "bg-orange-100 text-orange-600 font-semibold" : "text-gray-700"}`}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
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
        {children}
      </main>
    </div>
  );
}
