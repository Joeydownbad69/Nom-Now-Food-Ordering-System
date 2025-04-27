import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

// Mock restaurant accounts - in a real app, this would come from a backend
const restaurantAccounts = [
  { id: 1, name: "Pizza Palace", email: "manager@pizzapalace.com", password: "password123" },
  { id: 2, name: "Burger Barn", email: "manager@burgerbarn.com", password: "password123" },
];

interface LoginProps {
  onLogin: (restaurantId: number, restaurantName: string) => void;
}

export const RestaurantLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const account = restaurantAccounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (account) {
      onLogin(account.id, account.name);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#ff9d23]">
            Restaurant Manager Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your restaurant dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="manager@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#ff9d23] hover:bg-[#e08a1f]">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            <p>Demo accounts:</p>
            <p>manager@pizzapalace.com / password123</p>
            <p>manager@burgerbarn.com / password123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
