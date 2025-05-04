'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MenuItem } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface AddToCartDialogProps {
  item: MenuItem;
  onClose: () => void;
}

export default function AddToCartDialog({ item, onClose }: AddToCartDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addToCart, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions);
    onClose();
    toggleCart();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <Dialog open={!!item} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="relative h-56 w-full rounded-md overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 mt-1">{item.description}</p>
            <p className="text-lg font-medium text-primary mt-2">{formatCurrency(item.price)}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-full"
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-full"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="instructions" className="text-sm font-medium">
                Special Instructions
              </Label>
              <Textarea
                id="instructions"
                placeholder="Any special requests or allergies?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total: {formatCurrency(item.price * quantity)}
            </p>
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}