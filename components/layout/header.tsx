'use client';

import { useCartStore } from '@/lib/cart-store';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function Header() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">NomNow</h1>
        </div>
        
        {totalItems > 0 && (
          <Button 
            onClick={toggleCart}
            variant="outline"
            size="sm"
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {totalItems}
            </span>
          </Button>
        )}
      </div>
    </header>
  );
}