import React, { useState } from "react";
import { Button } from "../../components/ui/button";

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order from Alice!", read: false },
    { id: 2, message: "Restaurant 'Pizza Palace' added.", read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-[#ff9d23]">Notifications</h2>
        <Button size="sm" onClick={markAllRead} className="bg-[#ff9d23] text-white">Mark all as read</Button>
      </div>
      <div className="space-y-2">
        {notifications.length === 0 && <p className="text-gray-500">No notifications.</p>}
        {notifications.map(n => (
          <div key={n.id} className={`p-3 rounded border-l-4 ${n.read ? 'border-gray-300 bg-gray-100' : 'border-[#ff9d23] bg-white'} shadow-sm flex items-center`}>
            <span className={n.read ? 'text-gray-500' : 'text-[#ff9d23] font-semibold'}>{n.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
