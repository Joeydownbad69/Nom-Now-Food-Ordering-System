import { NextResponse } from 'next/server';
import { getRestaurantById } from '@/lib/api/restaurants';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Parse restaurant ID
    const restaurantId = Number(params.id);
    
    if (isNaN(restaurantId) || restaurantId <= 0) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      );
    }
    
    // Get restaurant by ID
    const restaurant = await getRestaurantById(restaurantId);
    
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ restaurant });
  } catch (error) {
    console.error('Get restaurant API error:', error);
    return NextResponse.json(
      { error: 'Failed to get restaurant' },
      { status: 500 }
    );
  }
}