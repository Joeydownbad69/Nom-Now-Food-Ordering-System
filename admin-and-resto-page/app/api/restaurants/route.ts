import { NextResponse } from 'next/server';
import { getRestaurants } from '@/lib/api/restaurants';

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    // Prepare filter options
    const filterOptions: { featured?: boolean; search?: string; category?: string } = {};
    
    if (featured) {
      filterOptions.featured = featured === 'true';
    }
    
    if (search) {
      filterOptions.search = search;
    }
    
    if (category) {
      filterOptions.category = category;
    }
    
    // Get restaurants
    const restaurants = await getRestaurants(filterOptions);
    
    return NextResponse.json({ restaurants });
  } catch (error) {
    console.error('Get restaurants API error:', error);
    return NextResponse.json(
      { error: 'Failed to get restaurants' },
      { status: 500 }
    );
  }
}