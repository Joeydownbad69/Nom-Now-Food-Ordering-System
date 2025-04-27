"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RestaurantType } from "@/types/restaurant";
import { SearchBar } from "@/components/search-bar";
import RestaurantGrid from "@/components/restaurant-grid";

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const cuisine = searchParams.get("cuisine");
  const search = searchParams.get("search");
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (cuisine) params.append("cuisine", cuisine);
        if (search) params.append("search", search);
        
        const response = await fetch(`/api/restaurants?${params.toString()}`);
        const data = await response.json();
        setRestaurants(data.restaurants || []);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRestaurants();
  }, [cuisine, search]);
  
  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {cuisine 
            ? `${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Restaurants`
            : search
              ? `Search Results for "${search}"`
              : "All Restaurants"
          }
        </h1>
        <SearchBar />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nomnow-primary"></div>
        </div>
      ) : restaurants.length > 0 ? (
        <RestaurantGrid restaurants={restaurants} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No restaurants found</h2>
          <p className="text-muted-foreground">
            {cuisine
              ? `We couldn't find any ${cuisine} restaurants at the moment.`
              : search
                ? `We couldn't find any restaurants matching "${search}".`
                : "No restaurants available at the moment."
            }
          </p>
        </div>
      )}
    </div>
  );
}