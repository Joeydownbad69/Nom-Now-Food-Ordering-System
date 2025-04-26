export interface CartItem {
  id: number;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: number;
  specialInstructions?: string;
}