'use client';

import { useCartStore } from '@/lib/cart-store';
import { CartItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="py-4 border-b border-gray-200 last:border-0">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            <p className="font-medium">{formatCurrency(item.totalPrice)}</p>
          </div>
          
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                className="h-7 w-7"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm w-6 text-center">{item.quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="h-7 w-7"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="h-7 w-7 text-gray-500 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          {item.specialInstructions && (
            <p className="mt-2 text-xs text-gray-500 italic">
              Note: {item.specialInstructions}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}