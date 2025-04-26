"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft, CreditCard, Banknote, CheckCircle2 } from "lucide-react";

// Sample delivery address
const deliveryAddresses = [
  {
    id: 1,
    name: "Home",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true,
  },
  {
    id: 2,
    name: "Work",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    isDefault: false,
  },
];

export default function CheckoutPage() {
  const { cartItems, cartSubtotal, cartTotal, deliveryFee, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState(deliveryAddresses[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Redirect to login if user is not logged in
  if (!user) {
    router.push("/login");
    return null;
  }
  
  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    router.push("/cart");
    return null;
  }
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Clear cart
      clearCart();
      
      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be delivered soon.",
      });
      
      // Redirect to order confirmation
      router.push("/checkout/success");
      
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <div className="container-custom py-12">
      <div className="mb-6">
        <Button variant="ghost" className="pl-0" asChild>
          <Link href="/cart" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Delivery Address</h2>
            
            <RadioGroup 
              value={selectedAddress.toString()} 
              onValueChange={(value) => setSelectedAddress(parseInt(value))}
              className="space-y-4"
            >
              {deliveryAddresses.map((address) => (
                <div 
                  key={address.id}
                  className={`flex items-start space-x-3 p-4 border rounded-md ${
                    selectedAddress === address.id ? 'border-nomnow-primary bg-nomnow-primary/5' : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                  <div className="grid gap-1.5">
                    <Label htmlFor={`address-${address.id}`} className="font-medium">
                      {address.name} {address.isDefault && <span className="text-sm text-nomnow-primary">(Default)</span>}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {address.address}, {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <div className="mt-6">
              <Button variant="outline">+ Add New Address</Button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
            
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="space-y-4"
            >
              <div className={`flex items-start space-x-3 p-4 border rounded-md ${
                paymentMethod === 'cash' ? 'border-nomnow-primary bg-nomnow-primary/5' : 'border-gray-200'
              }`}>
                <RadioGroupItem value="cash" id="cash" />
                <div className="grid gap-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cash" className="font-medium flex items-center">
                      <Banknote className="mr-2 h-5 w-5" />
                      Cash on Delivery
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay with cash when your order is delivered
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Order Items</h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <Button
                className="w-full bg-nomnow-primary hover:bg-nomnow-primary/90 text-white mt-6"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}