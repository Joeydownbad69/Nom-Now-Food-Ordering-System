export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  restaurantId: number;
  popular?: boolean;
}

export interface MenuCategory {
  id: number;
  name: string;
  restaurantId: number;
}