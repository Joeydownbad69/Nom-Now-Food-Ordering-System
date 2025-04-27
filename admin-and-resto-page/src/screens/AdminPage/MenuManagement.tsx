import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ImageUploader } from "../../components/ui/ImageUploader";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantId: number;
  category: string;
}

interface Props {
  restaurants: { id: number; name: string }[];
}

// Add categories for menu items
const CATEGORIES = [
  "Pizza",
  "Burger",
  "Pasta",
  "Dessert",
  "Drinks",
  "Rice Meal",
  "Appetizer",
  "Salad",
  "Other",
];

export const MenuManagement: React.FC<Props> = ({ restaurants }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ 
    name: "", 
    price: "", 
    description: "", 
    imageUrl: "", 
    restaurantId: restaurants[0]?.id || 0,
    category: CATEGORIES[0],
  });

  // Auto-suggest category based on name
  const autoSuggestCategory = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("pizza")) return "Pizza";
    if (lower.includes("burger")) return "Burger";
    if (lower.includes("pasta")) return "Pasta";
    if (lower.includes("dessert")) return "Dessert";
    if (lower.includes("drink")) return "Drinks";
    if (lower.includes("rice")) return "Rice Meal";
    if (lower.includes("appetizer")) return "Appetizer";
    if (lower.includes("salad")) return "Salad";
    return "Other";
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.description && newItem.restaurantId) {
      setMenuItems([
        ...menuItems,
        { 
          id: Date.now(), 
          name: newItem.name, 
          price: parseFloat(newItem.price), 
          description: newItem.description,
          imageUrl: newItem.imageUrl || "https://via.placeholder.com/150?text=No+Image",
          restaurantId: newItem.restaurantId,
          category: newItem.category,
        }
      ]);
      setNewItem({ 
        name: "", 
        price: "", 
        description: "", 
        imageUrl: "", 
        restaurantId: restaurants[0]?.id || 0,
        category: CATEGORIES[0],
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#ff9d23]">Menu Management</h2>
      <div className="space-y-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <Input 
              placeholder="e.g., Chicken Adobo" 
              value={newItem.name} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value;
                setNewItem({
                  ...newItem,
                  name: val,
                  category: autoSuggestCategory(val),
                });
              }} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-xs text-gray-400">(auto-suggested, can override)</span></label>
            <select 
              className="w-full border border-[#ff9d23] rounded px-3 py-2" 
              value={newItem.category} 
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setNewItem({ ...newItem, category: e.target.value })}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₱)
          </label>
          <Input 
            placeholder="e.g., 250" 
            type="number" 
            value={newItem.price} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setNewItem({ ...newItem, price: e.target.value })} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Input 
            placeholder="Brief description of the dish" 
            value={newItem.description} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setNewItem({ ...newItem, description: e.target.value })} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <ImageUploader
            value={newItem.imageUrl}
            onChange={(val: string) => setNewItem({ ...newItem, imageUrl: val })}
            placeholder="Paste image URL or upload"
            resetOnClear={true}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant
          </label>
          <select 
            className="w-full border border-[#ff9d23] rounded px-3 py-2" 
            value={newItem.restaurantId} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
              setNewItem({ ...newItem, restaurantId: Number(e.target.value) })}
          >
            {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAddItem} 
            className="bg-[#ff9d23] text-white"
            disabled={!newItem.name || !newItem.price || !newItem.description || !newItem.restaurantId}
          >
            Add Item
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {menuItems.length === 0 && <p className="text-gray-500">No menu items yet.</p>}
        {menuItems.map(item => (
          <Card key={item.id} className="bg-white border-l-4 border-[#ff9d23]">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-lg text-[#ff9d23]">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {restaurants.find(r => r.id === item.restaurantId)?.name}
                      </p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-[#ff9d23] font-semibold">
                      ₱{item.price.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm my-2">{item.description}</p>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRemoveItem(item.id)} 
                      className="text-red-600 border-red-300"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
