"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Package, Check, MapPin, ExternalLink } from "lucide-react";

// Sample order data
const sampleOrders = [
  {
    id: 123456,
    date: "2025-03-20T18:30:00",
    status: "delivered",
    total: 32.99,
    restaurant: {
      id: 1,
      name: "Burger Kingdom",
      image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    items: [
      { id: 1, name: "Classic Cheeseburger", quantity: 2, price: 9.99 },
      { id: 4, name: "French Fries", quantity: 1, price: 3.99 },
      { id: 6, name: "Soft Drink", quantity: 2, price: 2.49 },
    ],
    deliveryAddress: "123 Main St, New York, NY 10001",
    deliveryFee: 2.99,
  },
  {
    id: 123457,
    date: "2025-03-19T12:45:00",
    status: "delivered",
    total: 26.50,
    restaurant: {
      id: 2,
      name: "Pizza Paradise",
      image: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    items: [
      { id: 7, name: "Margherita Pizza", quantity: 1, price: 14.99 },
      { id: 8, name: "Pepperoni Pizza", quantity: 1, price: 16.99 },
    ],
    deliveryAddress: "123 Main St, New York, NY 10001",
    deliveryFee: 1.99,
  },
  {
    id: 123458,
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    status: "onTheWay",
    total: 18.98,
    restaurant: {
      id: 3,
      name: "Sushi Sensation",
      image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    items: [
      { id: 9, name: "California Roll", quantity: 1, price: 7.99 },
      { id: 10, name: "Salmon Nigiri", quantity: 1, price: 8.99 },
    ],
    deliveryAddress: "123 Main St, New York, NY 10001",
    deliveryFee: 3.99,
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders] = useState(sampleOrders);
  
  // Redirect to login if user is not logged in
  if (!user) {
    router.push("/login");
    return null;
  }
  
  // Filter orders by status
  const activeOrders = orders.filter(order => 
    order.status === "pending" || order.status === "preparing" || order.status === "onTheWay"
  );
  const completedOrders = orders.filter(order => order.status === "delivered");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Order Placed";
      case "preparing": return "Preparing";
      case "onTheWay": return "On the Way";
      case "delivered": return "Delivered";
      default: return status;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-5 w-5" />;
      case "preparing": return <Package className="h-5 w-5" />;
      case "onTheWay": return <MapPin className="h-5 w-5" />;
      case "delivered": return <Check className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };
  
  const getProgress = (status: string) => {
    switch (status) {
      case "pending": return "w-1/4";
      case "preparing": return "w-2/4";
      case "onTheWay": return "w-3/4";
      case "delivered": return "w-full";
      default: return "w-1/4";
    }
  };
  
  const OrderCard = ({ order }: { order: typeof sampleOrders[0] }) => (
    <div className="bg-card rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="flex items-start mb-4 md:mb-0">
            <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
              <img 
                src={order.restaurant.image} 
                alt={order.restaurant.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{order.restaurant.name}</h3>
              <p className="text-sm text-muted-foreground">
                Order #{order.id} • {formatDate(order.date)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
              order.status === 'delivered' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {getStatusIcon(order.status)}
              <span className="ml-1">{getStatusText(order.status)}</span>
            </div>
          </div>
        </div>
        
        {order.status !== "delivered" && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-2">
              <div className={`bg-nomnow-primary h-2 rounded-full ${getProgress(order.status)}`}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Order Placed</span>
              <span>Preparing</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.quantity}× {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
        
        {order.status !== "delivered" && (
          <div className="mt-6">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/orders/${order.id}`}>
                Track Order <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeOrders.length > 0 ? (
            activeOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No active orders</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any active orders at the moment.
              </p>
              <Button className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white" asChild>
                <Link href="/restaurants">Order Now</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No completed orders</h3>
              <p className="text-muted-foreground mb-6">
                You haven't completed any orders yet.
              </p>
              <Button className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white" asChild>
                <Link href="/restaurants">Order Now</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}