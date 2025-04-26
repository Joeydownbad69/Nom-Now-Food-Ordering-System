"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartSubtotal, 
    cartTotal, 
    deliveryFee,
    restaurant 
  } = useCart();
  
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [orderNotes, setOrderNotes] = useState("");
  
  const handleProceedToCheckout = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to proceed with checkout",
        variant: "destructive",
      });
      
      // Redirect to login page
      router.push("/login");
      return;
    }
    
    // Proceed to checkout
    router.push("/checkout");
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white" asChild>
            <Link href="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <div className="mb-6">
        <Button variant="ghost" className="pl-0" asChild>
          <Link href="/restaurants" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                <Button 
                  variant="ghost" 
                  className="text-destructive hover:text-destructive/90"
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clearCart();
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
              
              {restaurant && (
                <div className="mb-4 pb-4 border-b">
                  <h2 className="font-semibold text-lg">
                    Order from: {restaurant.name}
                  </h2>
                </div>
              )}
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 h-24 w-24 sm:h-20 sm:w-20 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-md"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive/90 h-8 px-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {item.specialInstructions && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <span className="font-medium">Special instructions:</span> {item.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-card rounded-lg shadow-md p-6">
            <Label htmlFor="order-notes" className="mb-2 block font-medium">
              Add Notes to Your Order (Optional)
            </Label>
            <Textarea
              id="order-notes"
              placeholder="Any special instructions for the restaurant or delivery person..."
              className="resize-none"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />
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
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}