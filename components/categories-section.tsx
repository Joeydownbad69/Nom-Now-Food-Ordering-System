"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  { id: 1, name: "Pizza", image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600", cuisine: "Italian" },
  { id: 2, name: "Burgers", image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=600", cuisine: "American" },
  { id: 3, name: "Chicken", image: "https://www.allrecipes.com/thmb/q-IfK20zxeyp1DgKWhrVp6CQ43w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-89268-triple-dipped-fried-chicken-beauty-4x3-3961ac838ddd41958e7cb9f49376cd68.jpg", cuisine: "Filipino" },
  { id: 4, name: "Fries", image: "https://sausagemaker.com/wp-content/uploads/Homemade-French-Fries_8.jpg", cuisine: "French" },
  { id: 5, name: "Sisig", image: "https://curiousflavors.com/wp-content/uploads/2023/02/1-2.jpg", cuisine: "Filipino" },
  { id: 6, name: "Donut", image: "https://jipan.com.ph/cdn/shop/products/minidonuts.png?v=1597895775", cuisine: "American" },
  { id: 7, name: "Shawarma", image: "https://cdn.sanity.io/images/g1s4qnmz/production/86ea7cc20cf83221e5a00e50828bab494c12f011-1364x1125.png", cuisine: "Middle Eastern" },
  { id: 8, name: "Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", cuisine: "Global" },
];

export default function CategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 320; // Approximate width of card + margin
      
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  
  const handleCategoryClick = (cuisine: string) => {
    router.push(`/restaurants?cuisine=${encodeURIComponent(cuisine.toLowerCase())}`);
  };
  
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-nomnow-dark">Food Categories</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll("left")}
            className="rounded-full bg-white dark:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll("right")}
            className="rounded-full bg-white dark:bg-gray-800"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <div 
            key={category.id}
            className="flex-shrink-0 w-56 card-hover cursor-pointer"
            onClick={() => handleCategoryClick(category.cuisine)}
          >
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md">
              <div className="h-36 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}