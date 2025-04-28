// app/restaurants/[id]/page.tsx
import { notFound } from "next/navigation";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  delivery_time: string;
  min_order: number;
  delivery_fee: number;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  created_at: string;
}

interface PageProps {
  params: { id: string };
}

async function getRestaurant(id: string): Promise<Restaurant | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurants/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.restaurant;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}

async function getMenuItems(id: string): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurants/${id}/menu`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
}

export default async function RestaurantPage({ params }: PageProps) {
  const { id } = params;

  const restaurant = await getRestaurant(id);
  const menuItems = await getMenuItems(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Restaurant Info */}
      <div className="mb-8">
        {restaurant.image && (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 mb-1">{restaurant.cuisine}</p>
        <p className="text-gray-600 mb-1">{restaurant.address}</p>
        <p className="text-gray-600 mb-1">{restaurant.phone}</p>
        <p className="text-gray-600 mb-4">{restaurant.email}</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Rating: {restaurant.rating ? Number(restaurant.rating).toFixed(1) : 'N/A'}</span>
          <span>Delivery Time: {restaurant.delivery_time}</span>
          <span>Min Order: ${restaurant.min_order ? Number(restaurant.min_order).toFixed(2) : 'N/A'}</span>
          <span>Delivery Fee: ${restaurant.delivery_fee ? Number(restaurant.delivery_fee).toFixed(2) : 'N/A'}</span>
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Menu</h2>
        {menuItems.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <li key={item.id} className="border rounded-lg p-4 hover:shadow-md transition">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-green-600 font-semibold">
                  ${Number.isFinite(item.price) ? item.price.toFixed(2) : '0.00'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
