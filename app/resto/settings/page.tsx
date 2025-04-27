import React from 'react';

export default function RestaurantSettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurant Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Restaurant Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2"
                defaultValue="Pizza Heaven"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2"
                defaultValue="(555) 123-4567"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full border rounded px-3 py-2"
              defaultValue="contact@pizzaheaven.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              className="w-full border rounded px-3 py-2"
              defaultValue="123 Pizza Street, Foodville, CA 90210"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="w-full border rounded px-3 py-2 h-24"
              defaultValue="Pizza Heaven offers the best authentic Italian pizzas in town. Our dough is made fresh daily and we use only the finest ingredients."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Logo</label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-400">[Logo]</span>
              </div>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Upload New Logo
              </button>
            </div>
          </div>
          
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Save Information
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-medium">Day</div>
            <div className="font-medium">Opening Time</div>
            <div className="font-medium">Closing Time</div>
          </div>
          
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <div>{day}</div>
              <select className="border rounded px-3 py-2 w-full">
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>Closed</option>
              </select>
              <select className="border rounded px-3 py-2 w-full">
                <option>9:00 PM</option>
                <option>10:00 PM</option>
                <option>Closed</option>
              </select>
            </div>
          ))}
          
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Save Hours
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Radius (miles)</label>
            <input 
              type="number" 
              className="w-full border rounded px-3 py-2"
              defaultValue="5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Amount ($)</label>
            <input 
              type="number" 
              className="w-full border rounded px-3 py-2"
              defaultValue="15"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Fee ($)</label>
            <input 
              type="number" 
              className="w-full border rounded px-3 py-2"
              defaultValue="3.99"
            />
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="freeDelivery" 
              className="mr-2"
              defaultChecked
            />
            <label htmlFor="freeDelivery" className="text-sm font-medium text-gray-700">
              Offer free delivery on orders over $35
            </label>
          </div>
          
          <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
            Save Delivery Settings
          </button>
        </div>
      </div>
    </div>
  );
}
