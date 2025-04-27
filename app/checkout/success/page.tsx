"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const router = useRouter();
  
  // Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Estimate delivery time (30-45 minutes from now)
  const estimatedDelivery = new Date();
  estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 30);
  const deliveryTimeString = estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // If user navigates back, redirect them to homepage
  useEffect(() => {
    const handlePopState = () => {
      router.push("/");
    };
    
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-nomnow-primary/10 rounded-full p-4">
            <CheckCircle2 className="h-16 w-16 text-nomnow-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your order. We've received your order and will begin processing it right away.
        </p>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-bold">{orderNumber}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <div className="flex items-center justify-center md:justify-end font-bold">
                <Clock className="h-4 w-4 mr-1" />
                <span>{deliveryTimeString}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-2">
              <div className="bg-nomnow-primary h-2 rounded-full w-1/4"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Order Placed</span>
              <span>Preparing</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white" asChild>
            <Link href="/orders">
              Track Order <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}