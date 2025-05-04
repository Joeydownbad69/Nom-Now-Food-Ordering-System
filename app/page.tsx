'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { MenuItem } from '@/lib/types';
import AddToCartDialog from '@/components/cart/add-to-cart-dialog';
import MenuSection from '@/components/menu/menu-section';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import CartSummary from '@/components/cart/cart-summary';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Header from '@/components/layout/header';

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Whopper',
    description: '100% flame-grilled beef topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    price: 3.69,
    image: 'https://images.deliveryhero.io/image/fd-ph/LH/q1qq-hero.jpg?width=480&height=360&quality=45',
    category: 'burgers',
  },
  {
    id: '2',
    name: 'All-in Overload',
    description: 'Our best-selling everything-on-it pizza with smoked ham, pepperoni, Italian sausage, chorizo, mushrooms, olives, mozzarella, and cheddar cheese.',
    price: 3.13,
    image: 'https://order.greenwich.com.ph/images/products/all-in-overload-lift.webp?version=1.33.8.1744257982783&s=1000x',
    category: 'pizza',
  },
  {
    id: '3',
    name: 'Siomai Chao Fan',
    description: 'Flavor-packed fried rice topped with juicy, steamed pork siomai. A hearty, satisfying meal in every bite!',
    price: 1.96,
    image: 'https://www.chowking.ph/wp-content/uploads/2023/09/1Siomai-Spicy-Chao-Fan_edit.png',
    category: 'chao fan',
  },
  {
    id: '4',
    name: 'Chicken Inasal & Pork BBQ Buddy Fiesta',
    description: '2 pcs Chicken Inasal Paa Large, 2 pcs Pork BBQ and small Java Rice Platter, good for 2-3 persons',
    price: 8.11,
    image: 'https://www.manginasal.ph/wp-content/uploads/2023/09/Chicken-BBQ-Buddy-Fiesta.png',
    category: 'chicken',
  },
];

export default function Home() {
  const { items, isCartOpen, toggleCart, selectedItem, setSelectedItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const categories = [...new Set(MENU_ITEMS.map(item => item.category))];
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-3">NomNow</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">Delicious food, delivered fast to your doorstep</p>
        </div>

        <div className="space-y-16 animate-fade-up">
          {categories.map((category) => (
            <MenuSection 
              key={category}
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              items={MENU_ITEMS.filter((item) => item.category === category)}
              onItemClick={(item) => setSelectedItem(item)}
            />
          ))}
        </div>
      </main>

      {selectedItem && (
        <AddToCartDialog
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <Sheet open={isCartOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <CartSummary />
        </SheetContent>
      </Sheet>

      {items.length > 0 && (
        <div className="fixed bottom-4 right-4 z-10">
          <Button 
            onClick={toggleCart}
            size="lg"
            className="rounded-full h-14 px-6 shadow-lg hover:scale-105 transition-transform duration-200 bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          </Button>
        </div>
      )}
    </div>
  );
}