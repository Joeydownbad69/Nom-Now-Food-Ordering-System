import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ImageUploader } from "../../components/ui/ImageUploader";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

interface Order {
  id: number;
  customer: string;
  items: { name: string; quantity: number; price: number }[];
  status: "pending" | "accepted" | "rejected" | "completed";
  total: number;
  timestamp: Date;
}

interface RestaurantDashboardProps {
  restaurantId: number | null;
  restaurantName: string;
  onLogout: () => void;
}

export const RestaurantDashboard: React.FC<RestaurantDashboardProps> = ({
  restaurantId,
  restaurantName,
  onLogout,
}) => {
  // Use restaurantId to filter restaurant-specific data in a real app
  // Currently using mock data for demonstration

  // Mock data - in a real app, this would come from a backend
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: "Margherita Pizza", price: 350, description: "Classic pizza with tomato sauce, mozzarella, and basil", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", available: true },
    { id: 2, name: "Pepperoni Pizza", price: 450, description: "Pizza topped with pepperoni slices", imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", available: true },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customer: "Alice",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 350 },
        { name: "Pepperoni Pizza", quantity: 1, price: 450 },
      ],
      status: "pending",
      total: 800,
      timestamp: new Date(),
    },
  ]);

  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");
  const [newItem, setNewItem] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    imageUrl: "" 
  });

  // Menu management functions
  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.description) {
      setMenuItems([
        ...menuItems,
        {
          id: Date.now(),
          name: newItem.name,
          price: parseFloat(newItem.price),
          description: newItem.description,
          imageUrl: newItem.imageUrl || "https://via.placeholder.com/150?text=No+Image",
          available: true,
        },
      ]);
      setNewItem({ name: "", price: "", description: "", imageUrl: "" });
    }
  };

  const handleRemoveItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const toggleItemAvailability = (id: number) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  // Order management functions
  const handleAcceptOrder = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "accepted" } : order
      )
    );
  };

  const handleRejectOrder = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "rejected" } : order
      )
    );
  };

  const handleCompleteOrder = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "completed" } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="bg-white shadow-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#ff9d23]">
              {restaurantName} Dashboard
            </h1>
            {restaurantId !== null && (
              <div style={{ fontSize: '0.9rem', color: '#888' }}>Restaurant ID: {restaurantId}</div>
            )}
            <p className="text-gray-500">Manage your restaurant</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={activeTab === "menu" ? "default" : "outline"}
                onClick={() => setActiveTab("menu")}
                className={activeTab === "menu" ? "bg-[#ff9d23]" : ""}
              >
                Menu
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "outline"}
                onClick={() => setActiveTab("orders")}
                className={activeTab === "orders" ? "bg-[#ff9d23]" : ""}
              >
                Orders
              </Button>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {activeTab === "menu" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Menu Item</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name
                      </label>
                      <Input
                        placeholder="e.g., Chicken Adobo"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₱)
                      </label>
                      <Input
                        placeholder="e.g., 250"
                        type="number"
                        value={newItem.price}
                        onChange={(e) =>
                          setNewItem({ ...newItem, price: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Input
                      placeholder="Brief description of the dish"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <ImageUploader 
                      onChange={(imageUrl) => 
                        setNewItem({ ...newItem, imageUrl })
                      }
                      value={newItem.imageUrl}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddItem}
                      className="bg-[#ff9d23] hover:bg-[#e08a1f]"
                      disabled={!newItem.name || !newItem.price || !newItem.description}
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.length === 0 && (
                    <p className="text-gray-500">No menu items yet.</p>
                  )}
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 p-4 bg-white border rounded-lg shadow-sm"
                    >
                      <div className="w-full md:w-1/4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              item.available ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                          <span className="font-medium text-lg">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-[#ff9d23] font-semibold mb-2">
                          ₱{item.price.toFixed(2)}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleItemAvailability(item.id)}
                            className={
                              item.available
                                ? "border-orange-300 text-orange-600"
                                : "border-green-300 text-green-600"
                            }
                          >
                            {item.available ? "Mark Unavailable" : "Mark Available"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveItem(item.id)}
                            className="border-red-300 text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.length === 0 && (
                    <p className="text-gray-500">No orders at the moment.</p>
                  )}
                  {orders.map((order) => (
                    <Card
                      key={order.id}
                      className={`border-l-4 ${
                        order.status === "pending"
                          ? "border-yellow-500"
                          : order.status === "accepted"
                          ? "border-green-500"
                          : order.status === "completed"
                          ? "border-blue-500"
                          : "border-red-500"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">
                              Order #{order.id} - {order.customer}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {order.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : order.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-1 mb-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-semibold pt-1 border-t">
                            <span>Total</span>
                            <span>₱{order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        {order.status === "pending" && (
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptOrder(order.id)}
                              className="bg-[#ff9d23] hover:bg-[#e08a1f]"
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectOrder(order.id)}
                              className="text-red-600 border-red-300"
                            >
                              Reject
                            </Button>
                          </div>
                        )}

                        {order.status === "accepted" && (
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleCompleteOrder(order.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              Mark Completed
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};
