import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const DEMO_ADMIN = {
  email: "admin@nomnow.com",
  password: "admin123",
};

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      email.toLowerCase() === DEMO_ADMIN.email &&
      password === DEMO_ADMIN.password
    ) {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f5f5]">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@nomnow.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="admin123"
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-[#ff9d23] hover:bg-[#e08a1f]">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-gray-400 w-full text-center">
            Demo admin: admin@nomnow.com / admin123
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
