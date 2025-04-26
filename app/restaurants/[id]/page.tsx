"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RestaurantType } from "@/types/restaurant";
import { MenuItem, MenuCategory } from "@/types/menu";
import { ChevronLeft, Star, Clock, DollarSign, Truck, Info } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import MenuItemCard from "@/components/menu-item-card";
import RestaurantInfo from "@/components/restaurant-info";

// Sample data that would normally come from API
const sampleRestaurants: RestaurantType[] = [
  {
    id: 1,
    name: "Burger Kingdom",
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "25-35",
    minOrder: 10,
    deliveryFee: 2.99,
    address: "123 Main Street",
    featured: true,
  },
  {
    id: 2,
    name: "Pizza Paradise",
    image: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-45",
    minOrder: 15,
    deliveryFee: 1.99,
    address: "456 Oak Avenue",
    featured: true,
  },
  {
    id: 3,
    name: "Sushi Sensation",
    image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "35-50",
    minOrder: 20,
    deliveryFee: 3.99,
    address: "789 Maple Road",
    featured: true,
  },
];

// Sample categories and menu items
const sampleCategories: Record<number, MenuCategory[]> = {
  1: [
    { id: 1, name: "Burgers", restaurantId: 1 },
    { id: 2, name: "Sides", restaurantId: 1 },
    { id: 3, name: "Drinks", restaurantId: 1 },
  ],
  2: [
    { id: 4, name: "Pizza", restaurantId: 2 },
    { id: 5, name: "Pasta", restaurantId: 2 },
    { id: 6, name: "Salads", restaurantId: 2 },
  ],
  3: [
    { id: 7, name: "Sushi Rolls", restaurantId: 3 },
    { id: 8, name: "Sashimi", restaurantId: 3 },
    { id: 9, name: "Bento Boxes", restaurantId: 3 },
  ],
};

const sampleMenuItems: Record<number, MenuItem[]> = {
  1: [
    {
      id: 1,
      name: "Classic Cheeseburger",
      description: "Beef patty, cheddar cheese, lettuce, tomato, and special sauce on a brioche bun",
      price: 9.99,
      image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 1,
      restaurantId: 1,
      popular: true,
    },
    {
      id: 2,
      name: "Bacon Deluxe Burger",
      description: "Beef patty, bacon, American cheese, caramelized onions, and aioli",
      price: 12.99,
      image: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 1,
      restaurantId: 1,
      popular: true,
    },
    {
      id: 3,
      name: "Veggie Burger",
      description: "Plant-based patty, avocado, sprouts, tomato, and vegan mayo",
      price: 10.99,
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 1,
      restaurantId: 1,
    },
    {
      id: 4,
      name: "French Fries",
      description: "Crispy golden fries served with ketchup",
      price: 3.99,
      image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 2,
      restaurantId: 1,
      popular: true,
    },
    {
      id: 5,
      name: "Onion Rings",
      description: "Crispy battered onion rings with dipping sauce",
      price: 4.99,
      image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 2,
      restaurantId: 1,
    },
    {
      id: 6,
      name: "Soft Drink",
      description: "Choice of soda or juice",
      price: 2.49,
      image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 3,
      restaurantId: 1,
    },
  ],
  2: [
    {
      id: 7,
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, and basil",
      price: 14.99,
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 4,
      restaurantId: 2,
      popular: true,
    },
    {
      id: 8,
      name: "Pepperoni Pizza",
      description: "Pepperoni, mozzarella, and tomato sauce",
      price: 16.99,
      image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 4,
      restaurantId: 2,
      popular: true,
    },
  ],
  3: [
    {
      id: 9,
      name: "California Roll",
      description: "Crab, avocado, and cucumber wrapped in seaweed and rice",
      price: 7.99,
      image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 7,
      restaurantId: 3,
      popular: true,
    },
    {
      id: 10,
      name: "Salmon Nigiri",
      description: "Fresh salmon slices on vinegared rice",
      price: 8.99,
      image: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      categoryId: 8,
      restaurantId: 3,
      popular: true,
    },
  ],
};

// Generate static params for all restaurants
export async function generateStaticParams() {
  // In a real app, this would fetch from an API
  return sampleRestaurants.map((restaurant) => ({
    id: restaurant.id.toString(),
  }));
}

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = Number(params.id);
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRestaurantInfo, setShowRestaurantInfo] = useState(false);
  
  // For demo, we're using sample data instead of API calls
  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchData = () => {
      setTimeout(() => {
        const foundRestaurant = sampleRestaurants.find(r => r.id === restaurantId);
        const restaurantCategories = sampleCategories[restaurantId] || [];
        const restaurantMenuItems = sampleMenuItems[restaurantId] || [];
        
        setRestaurant(foundRestaurant || null);
        setCategories(restaurantCategories);
        setMenuItems(restaurantMenuItems);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [restaurantId]);
  
  if (isLoading) {
    return (
      <div className="container-custom py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nomnow-primary mx-auto mb-4"></div>
          <p>Loading restaurant details...</p>
        </div>
      </div>
    );
  }
  
  if (!restaurant) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
          <p className="mb-6">The restaurant you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Group menu items by category
  const menuItemsByCategory = categories.map(category => ({
    ...category,
    items: menuItems.filter(item => item.categoryId === category.id)
  }));
  
  // Get popular items
  const popularItems = menuItems.filter(item => item.popular);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Restaurant header with background image */}
      <div className="relative h-64 md:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${restaurant.image}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container-custom relative z-10 h-full flex flex-col justify-end pb-6">
          <Link href="/restaurants" className="absolute top-4 left-4 md:top-6 md:left-6">
            <Button variant="outline" size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
          <p className="text-white/90 mb-2">{restaurant.cuisine}</p>
          
          <div className="flex flex-wrap gap-4 text-white/90 text-sm">
            <div className="flex items-center">
              <Star className="fill-amber-400 stroke-amber-400 w-4 h-4 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>${restaurant.minOrder} minimum</span>
            </div>
            
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white p-0 h-auto"
              onClick={() => setShowRestaurantInfo(true)}
            >
              <Info className="w-4 h-4 mr-1" />
              <span>Info</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Menu content */}
      <div className="container-custom py-8">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="mb-6 w-full overflow-x-auto flex justify-start">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={`category-${category.id}`}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="popular">
            <h2 className="text-xl font-bold mb-4">Popular Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularItems.map(item => (
                <MenuItemCard 
                  key={item.id} 
                  menuItem={item} 
                  restaurantId={restaurant.id}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>
          </TabsContent>
          
          {menuItemsByCategory.map(category => (
            <TabsContent key={category.id} value={`category-${category.id}`}>
              <h2 className="text-xl font-bold mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map(item => (
                  <MenuItemCard 
                    key={item.id} 
                    menuItem={item} 
                    restaurantId={restaurant.id}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Restaurant info modal */}
      {showRestaurantInfo && (
        <RestaurantInfo 
          restaurant={restaurant} 
          onClose={() => setShowRestaurantInfo(false)} 
        />
      )}
    </div>
  );
}