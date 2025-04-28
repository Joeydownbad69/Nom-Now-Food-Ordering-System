"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "../types/menu";
import { useCart } from "../hooks/use-cart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

interface MenuItemCardProps {
  menuItem: MenuItem;
  restaurantId: number;
  restaurantName: string;
}

export default function MenuItemCard({ menuItem, restaurantId, restaurantName }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const handleAddToCart = () => {
    addToCart({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      image: menuItem.image,
      restaurantId,
      specialInstructions: specialInstructions.trim() || undefined,
    });
    
    // Reset form and close dialog
    setQuantity(1);
    setSpecialInstructions("");
    setIsOpen(false);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  return (
    <>
      <div className="food-card overflow-hidden hover:shadow-lg transition-all duration-300" onClick={() => setIsOpen(true)}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={menuItem.image} 
            alt={menuItem.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          
          {menuItem.popular && (
            <div className="absolute top-2 right-2 bg-nomnow-primary text-white text-xs px-2 py-1 rounded">
              Popular
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg mb-1">{menuItem.name}</h3>
            <span className="font-medium text-nomnow-primary">${menuItem.price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{menuItem.description}</p>
          
          <Button 
            className="w-full bg-nomnow-primary hover:bg-nomnow-primary/90 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{menuItem.name}</DialogTitle>
            <DialogDescription>
              {menuItem.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
              <img 
                src={menuItem.image} 
                alt={menuItem.name} 
                className="w-full max-h-48 object-cover rounded-md"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="special-instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="special-instructions"
                placeholder="Any special requests?"
                className="mt-1"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white"
              onClick={handleAddToCart}
            >
              Add to Cart - ${(menuItem.price * quantity).toFixed(2)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}