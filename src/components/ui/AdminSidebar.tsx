import React from "react";

interface SidebarTab {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export const AdminSidebar: React.FC<{ tabs: SidebarTab[] }> = ({ tabs }) => (
  <aside className="h-screen w-56 bg-white border-r shadow-sm flex flex-col">
    <div className="flex items-center gap-2 px-6 py-6 border-b">
      <span className="text-2xl font-extrabold text-[#ff9d23] tracking-tight">🍽️ NomNow</span>
      <span className="ml-auto text-xs bg-[#ff9d23]/10 text-[#ff9d23] px-2 py-1 rounded font-semibold">Admin</span>
    </div>
    <nav className="flex-1 flex flex-col gap-1 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex items-center gap-3 px-6 py-3 rounded-lg text-left font-medium transition-all duration-150
            ${tab.active ? "bg-[#fff7ec] text-[#ff9d23] shadow" : "text-gray-700 hover:bg-[#f7fafc]"}`}
          onClick={tab.onClick}
        >
          {tab.icon && <span className="text-lg">{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
    <div className="mt-auto px-6 py-4 text-xs text-gray-400">&copy; {new Date().getFullYear()} NomNow</div>
  </aside>
);
