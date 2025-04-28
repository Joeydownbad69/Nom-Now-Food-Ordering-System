"use client";

import { X, Clock, MapPin, Phone, Mail } from "lucide-react";
import { RestaurantType } from "../types/restaurant";
import { Button } from "../components/ui/button";

interface RestaurantInfoProps {
  restaurant: RestaurantType;
  onClose: () => void;
}

export default function RestaurantInfo({ restaurant, onClose }: RestaurantInfoProps) {
  // Sample hours data (would come from API in real app)
  const hours = [
    { day: "Monday", hours: "11:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday", hours: "11:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
  ];
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-background z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-0.5 text-nomnow-primary" />
              <p>{restaurant.address}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Hours</h3>
            <div className="space-y-2">
              {hours.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-nomnow-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-nomnow-primary" />
                <span>contact@{restaurant.name.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-nomnow-primary" />
                <span>Delivery Time: {restaurant.deliveryTime} minutes</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Minimum Order:</span>
                <span>${restaurant.minOrder.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Delivery Fee:</span>
                <span>${restaurant.deliveryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}