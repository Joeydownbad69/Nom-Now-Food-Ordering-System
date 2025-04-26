import { NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus } from '@/lib/api/orders';
import { verifyToken } from '@/lib/api/auth';
import { headers } from 'next/headers';

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

// GET: Get order by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse order ID
    const orderId = Number(params.id);
    
    if (isNaN(orderId) || orderId <= 0) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }
    
    // Get order by ID
    const order = await getOrderById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Verify user owns this order
    if (order.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Get order API error:', error);
    return NextResponse.json(
      { error: 'Failed to get order' },
      { status: 500 }
    );
  }
}

// PATCH: Update order status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse order ID
    const orderId = Number(params.id);
    
    if (isNaN(orderId) || orderId <= 0) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }
    
    // Get order by ID to verify ownership
    const order = await getOrderById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Verify user owns this order
    if (order.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Parse request body
    const { status } = await request.json();
    
    // Validate status
    const validStatuses = ['cancelled'];
    
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    // Update order status
    await updateOrderStatus(orderId, status);
    
    // Get updated order
    const updatedOrder = await getOrderById(orderId);
    
    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error('Update order API error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}