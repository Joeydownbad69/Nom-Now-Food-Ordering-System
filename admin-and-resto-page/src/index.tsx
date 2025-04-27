import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
// import { MenuManagement } from "./screens/AdminPage/MenuManagement"; // No longer used directly
import { RestaurantPortal } from "./screens/RestaurantPortal/RestaurantPortal";
import { AdminLogin } from "./screens/AdminPage/AdminLogin";
import { RestaurantLogin } from "./screens/RestaurantLogin/RestaurantLogin";
import { AdminDashboard } from "./screens/AdminPage/AdminDashboard";

// const mockRestaurants = [
//   { id: 1, name: "Pizza Palace" },
//   { id: 2, name: "Burger Barn" },
// ];

function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("admin-auth") === "true";
  if (!isAdmin) {
    window.location.href = "/admin-login";
    return null;
  }
  return <>{children}</>;
}

function RestaurantLoginRoute() {
  // This wrapper just redirects to /restaurant-portal after login
  const handleLogin = (id: number, name: string) => {
    window.location.href = "/restaurant-portal";
  };
  return <RestaurantLogin onLogin={handleLogin} />;
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/restaurant-login" element={<RestaurantLoginRoute />} />
        <Route path="/restaurant-portal" element={<RestaurantPortal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
