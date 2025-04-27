import React from "react";

interface Props {
  ordersCount: number;
  restaurantsCount: number;
  usersCount: number;
}

export const Analytics: React.FC<Props> = ({ ordersCount, restaurantsCount, usersCount }) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#ff9d23]">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-l-4 border-[#ff9d23]">
          <span className="text-3xl font-bold text-[#ff9d23]">{ordersCount}</span>
          <span className="text-gray-700 mt-2">Total Orders</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-l-4 border-[#ff9d23]">
          <span className="text-3xl font-bold text-[#ff9d23]">{restaurantsCount}</span>
          <span className="text-gray-700 mt-2">Active Restaurants</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-l-4 border-[#ff9d23]">
          <span className="text-3xl font-bold text-[#ff9d23]">{usersCount}</span>
          <span className="text-gray-700 mt-2">Registered Users</span>
        </div>
      </div>
    </section>
  );
};
