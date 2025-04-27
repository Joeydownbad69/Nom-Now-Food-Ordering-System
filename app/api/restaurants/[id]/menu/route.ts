import { NextResponse } from 'next/server';
import { getMenuCategories, getMenuItems } from '@/lib/api/restaurants';

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
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    
    // Get menu categories
    const categories = await getMenuCategories(restaurantId);
    
    // Get menu items (filtered by category if specified)
    const items = await getMenuItems(
      restaurantId,
      categoryId ? Number(categoryId) : undefined
    );
    
    return NextResponse.json({
      categories,
      items,
    });
  } catch (error) {
    console.error('Get menu API error:', error);
    return NextResponse.json(
      { error: 'Failed to get menu' },
      { status: 500 }
    );
  }
}