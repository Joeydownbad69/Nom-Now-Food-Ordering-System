export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
  specialInstructions?: string;
}

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  customerDetails?: CustomerDetails;
}