import { NextResponse } from 'next/server';
import { createOrder, getUserOrders } from '@/lib/api/orders';
import { verifyToken } from '@/lib/api/auth';
import { headers } from 'next/headers';
import * as z from 'zod';

// Auth middleware helper
async function getAuthUser(request: Request) {
  // Get headers
  const headersList = headers();
  const authHeader = headersList.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  // Extract token
  const token = authHeader.split('Bearer ')[1];
  
  // Verify token and get user
  const user = await verifyToken(token);
  return user;
}

// Validation schema for order items
const orderItemSchema = z.object({
  menuItemId: z.number().positive(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  specialInstructions: z.string().optional(),
});

// Validation schema for order creation
const createOrderSchema = z.object({
  restaurantId: z.number().positive(),
  addressId: z.number().positive(),
  subtotal: z.number().positive(),
  deliveryFee: z.number().positive(),
  total: z.number().positive(),
  paymentMethod: z.literal('cash'),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
});

// POST: Create a new order
export async function POST(request: Request) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate request data
    const result = createOrderSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }
    
    // Extract validated data
    const orderData = {
      userId: user.id,
      ...result.data,
    };
    
    // Create order
    const order = await createOrder(orderData);
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Create order API error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// GET: Get user orders
export async function GET(request: Request) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get user orders
    const orders = await getUserOrders(user.id);
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders API error:', error);
    return NextResponse.json(
      { error: 'Failed to get orders' },
      { status: 500 }
    );
  }
}