import React, { useState } from "react";
import { RestaurantLogin } from "../RestaurantLogin";
import { RestaurantDashboard } from "../RestaurantDashboard";

export const RestaurantPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState<string>("");

  const handleLogin = (id: number, name: string) => {
    setRestaurantId(id);
    setRestaurantName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRestaurantId(null);
    setRestaurantName("");
  };

  if (!isLoggedIn) {
    return <RestaurantLogin onLogin={handleLogin} />;
  }

  return (
    <RestaurantDashboard
      restaurantId={restaurantId}
      restaurantName={restaurantName}
      onLogout={handleLogout}
    />
  );
};
