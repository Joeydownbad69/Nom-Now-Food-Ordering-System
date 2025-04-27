import React, { useState } from "react";
import { MenuManagement } from "./MenuManagement";
import { UserManagement } from "./UserManagement";
import { Notifications } from "./Notifications";
import { Analytics } from "./Analytics";
import { AdminSidebar } from "../../components/ui/AdminSidebar";

// Placeholder components for additional tools
const OrderOversight = () => <div className="p-4">Order Oversight (Coming Soon)</div>;
const ReviewsModeration = () => <div className="p-4">Feedback & Reviews Moderation (Coming Soon)</div>;
const SupportTickets = () => <div className="p-4">Support Tickets/Helpdesk (Coming Soon)</div>;
const ActivityLog = () => <div className="p-4">Admin Activity Log (Coming Soon)</div>;
const Settings = () => <div className="p-4">Settings/Configuration (Coming Soon)</div>;

const initialRestaurants = [
  { id: 1, name: "Pizza Palace", email: "manager@pizzapalace.com" },
  { id: 2, name: "Burger Barn", email: "manager@burgerbarn.com" },
];

export const AdminDashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [activeTab, setActiveTab] = useState(0);

  // Restaurant Management tool as inline function so it can access restaurants/setRestaurants
  const RestaurantManagement = () => {
    const [newRestaurant, setNewRestaurant] = useState({ name: "", email: "" });
    const handleAdd = () => {
      if (newRestaurant.name && newRestaurant.email) {
        setRestaurants([
          ...restaurants,
          { id: Date.now(), ...newRestaurant },
        ]);
        setNewRestaurant({ name: "", email: "" });
      }
    };
    const handleRemove = (id: number) => {
      setRestaurants(restaurants.filter(r => r.id !== id));
    };
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#ff9d23]">Restaurants</h3>
        <div className="flex gap-2 mb-2">
          <input
            className="border rounded px-2 py-1"
            placeholder="Restaurant Name"
            value={newRestaurant.name}
            onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Manager Email"
            value={newRestaurant.email}
            onChange={e => setNewRestaurant({ ...newRestaurant, email: e.target.value })}
          />
          <button
            className="bg-[#ff9d23] text-white px-4 py-1 rounded hover:bg-[#e08a1f]"
            onClick={handleAdd}
          >Add</button>
        </div>
        <ul className="space-y-2">
          {restaurants.map(r => (
            <li key={r.id} className="flex justify-between items-center bg-white p-2 rounded border-l-4 border-[#ff9d23]">
              <span>{r.name} <span className="text-xs text-gray-500">({r.email})</span></span>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemove(r.id)}
              >Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const TABS = [
    { label: "Menu Management", component: () => <MenuManagement restaurants={restaurants} /> },
    { label: "User Management", component: UserManagement },
    { label: "Restaurant Management", component: RestaurantManagement },
    { label: "Order Oversight", component: OrderOversight },
    { label: "Analytics", component: () => <Analytics ordersCount={123} restaurantsCount={restaurants.length} usersCount={42} /> },
    { label: "Notifications", component: Notifications },
    { label: "Reviews Moderation", component: ReviewsModeration },
    { label: "Support Tickets", component: SupportTickets },
    { label: "Activity Log", component: ActivityLog },
    { label: "Settings", component: Settings },
  ];

  const ActiveComponent = TABS[activeTab].component;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <AdminSidebar
        tabs={TABS.map((tab, idx) => ({
          label: tab.label,
          active: activeTab === idx,
          onClick: () => setActiveTab(idx),
        }))}
      />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};
