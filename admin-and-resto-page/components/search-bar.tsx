"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-3xl mx-auto animate-fade-in">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search for restaurants or cuisines..."
            className="pl-10 w-full rounded-md border-gray-300 focus:border-nomnow-primary focus:ring focus:ring-nomnow-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="bg-nomnow-primary hover:bg-nomnow-primary/90 text-white"
        >
          Search
        </Button>
      </form>
    </div>
  );
}