import Link from "next/link";
import { Star } from "lucide-react";
import { RestaurantType } from "@/types/restaurant";

// Sample data that would normally come from the API
const featuredRestaurants: RestaurantType[] = [
  {
    id: 1,
    name: "Burger King",
    image: "https://admin.itsnicethat.com/images/sxTAeLCeojRNQh2mcZvVv8TT5LE=/198174/format-webp%7Cwidth-1440/burger_king_rebrand_graphic_design_itsnicethat1.jpg",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "25-35",
    deliveryFee: 40,
    address: "N. Escario Street, this branch operates 24 hours and offers takeout services.",
    featured: true,
  },
  {
    id: 2,
    name: "Domino's Pizza",
    image: "https://logowik.com/content/uploads/images/dominos-pizza5190.jpg",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-45",
    deliveryFee: 40,
    address: "Horizons 101, Mango Avenue",
    featured: true,
  },
  {
    id: 3,
    name: "Mang Inasal",
    image: "https://play-lh.googleusercontent.com/27vRhNZV2nAXSrIkWYlr22wIZSMLqeQzlirRF4UQqWVxTB_8PT59sPTATLrArDJoZpE",
    cuisine: "Filipino",
    rating: 4.5,
    deliveryTime: "30-45",
    deliveryFee: 40,
    address: "Sm Seaside Lower Ground Floor SM Seaside SRP Road Mambaling",
    featured: true,
  },
  {
    id: 4,
    name: "Jollibee",
    image: "https://download.logo.wine/logo/Jollibee/Jollibee-Logo.wine.png",
    cuisine: "Filipino",
    rating: 4.6,
    deliveryTime: "20-30",
    deliveryFee: 50,
    address: "F. Llamas, Punta Prinsesa",
    featured: true,
  },
  {
    id: 5,
    name: "24 Chicken",
    image: "https://24chicken.com/images/marketing/logo.png",
    cuisine: "Filipino",
    rating: 4.2,
    deliveryTime: "20-35",
    deliveryFee: 60,
    address: "The Strip, Osmeña Boulevard Barangay Capitol Site ",
    featured: true,
  },
  {
    id: 6,
    name: "Potato Corner",
    image: "https://app.aranetacity.com/files/establishments/image/f556a0c5-f958-4051-987d-81146509ae66/472771_QJ46vfdiXnpcj0Fm_0.jpg",
    cuisine: "Filipino",
    rating: 4.5,
    deliveryTime: "15-20",
    deliveryFee: 30,
    address: "Casa Mira Labangon",
    featured: true,
  },
  {
    id: 7,
    name: "Dunkin' Donut",
    image: "https://logo.com/image-cdn/images/kts928pd/production/a21c8a29a28c8998ca840a00064142e93f085f6f-700x394.png?w=1920&q=72&fm=webp",
    cuisine: "American",
    rating: 4.4,
    deliveryTime: "5-10",
    deliveryFee: 40,
    address: "E-Mall, Sanciangko St.",
    featured: true,
  },
  {
    id: 8,
    name: "Leylam",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoFBJ95NL0n5-ySYEMMhMsnrsBfVQsmnt6zg&s",
    cuisine: "Turkish",
    rating: 4.1,
    deliveryTime: "15-20",
    deliveryFee: 30,
    address: "Gaisano Capital Tisa, Francisco Llamas St.",
    featured: true,
  },
  {
    id: 9,
    name: "Bo's Coffee",
    image: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_864/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/owvoogusq2lnddn6q91h/BosCoffee(SelectedBranchesNationwide).jpg",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: "5-10",
    deliveryFee: 30,
    address: "Osmeña Blvd. Cebu City",
    featured: true,
  },
  {
    id: 10,
    name: "Krispy Kreme Doughnuts",
    image: "https://www.freebielist.com/wp-content/uploads/2022/07/krispykreme-800x400-1.jpg",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "10-15",
    deliveryFee: 50,
    address: "SM Seaside City Cebu",
    featured: true,
  },
  {
    id: 11,
    name: "Pizza Hut",
    image: "https://1000logos.net/wp-content/uploads/2017/05/Pizza-Hut-Logo-1999.jpg",
    cuisine: "Italian",
    rating: 4.1,
    deliveryTime: "20-30",
    deliveryFee: 50,
    address: "Fuente Osmeña Cebu City",
    featured: true,
  },
  {
    id: 12,
    name: "Shawarma Shack",
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/27b76eb372be9aa5a0eebfaff01e68b6/df577d3a0807d3bb859f2fb53aefcd86.jpeg",
    cuisine: "Turkish",
    rating: 4.3,
    deliveryTime: "15-25",
    deliveryFee: 30,
    address: "Elizabeth Mall Cebu City",
    featured: true,
  },







];

export default function FeaturedRestaurants() {
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