'use client';

import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CartItemComponent from './cart-item';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

export default function CartSummary() {
  const { items, getSubtotal, getTax, getTotal, deliveryMethod, deliveryFee, clearCart, toggleCart } = useCartStore();
  const router = useRouter();
  
  const handleCheckout = () => {
    toggleCart();
    router.push('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <ShoppingBag className="h-16 w-16 text-gray-300" />
        <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
        <p className="text-gray-500 text-center">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button 
          onClick={toggleCart}
          variant="outline"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-[85vh]">
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1">
          {items.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(getSubtotal())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span>{formatCurrency(getTax())}</span>
          </div>
          {deliveryMethod === 'delivery' && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(getTotal())}</span>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleCheckout}
            className="w-full"
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline" 
            onClick={clearCart}
            size="sm"
            className="w-full"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}