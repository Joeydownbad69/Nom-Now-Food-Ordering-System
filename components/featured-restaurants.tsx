import Link from "next/link";
import { Star } from "lucide-react";
import { RestaurantType } from "../types/restaurant";

export default async function FeaturedRestaurants() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants?featured=true`, {
    cache: "no-store",
  });
  const data = await res.json();
  const featuredRestaurants: RestaurantType[] = data.restaurants;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredRestaurants.map((restaurant) => (
        <Link 
          key={restaurant.id} 
          href={`/restaurants/${restaurant.id}`}
          className="block"
        >
          <div className="food-card overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-nomnow-primary text-white px-2 py-1 rounded">
                Featured
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <div className="flex items-center text-amber-500">
                  <Star className="fill-current w-4 h-4 mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-3">{restaurant.cuisine}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {restaurant.deliveryTime} min
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Php {restaurant.deliveryFee} delivery
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
