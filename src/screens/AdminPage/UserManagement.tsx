import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

interface User {
  id: number;
  name: string;
  blocked: boolean;
}

const initialUsers: User[] = [
  { id: 1, name: "Alice", blocked: false },
  { id: 2, name: "Bob", blocked: false },
  { id: 3, name: "Charlie", blocked: true },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleToggleBlock = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, blocked: !u.blocked } : u));
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#ff9d23]">User Management</h2>
      <div className="space-y-2">
        {users.length === 0 && <p className="text-gray-500">No users found.</p>}
        {users.map(user => (
          <Card key={user.id} className="bg-white border-l-4 border-[#ff9d23]">
            <CardContent className="py-3 flex items-center justify-between">
              <span className="font-semibold text-[#ff9d23]">{user.name}</span>
              <Button size="sm" variant="outline" onClick={() => handleToggleBlock(user.id)} className={user.blocked ? "text-green-600 border-green-300" : "text-red-600 border-red-300"}>
                {user.blocked ? "Unblock" : "Block"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
