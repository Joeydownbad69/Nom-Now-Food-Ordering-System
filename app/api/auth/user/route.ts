export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { verifyToken, updateUserProfile } from '@/lib/api/auth';
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

// GET: Get current user
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
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user API error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}

// Validation schema for update
const updateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
});

// PATCH: Update user profile
export async function PATCH(request: Request) {
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
    const result = updateSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }
    
    // Update user profile
    const updatedUser = await updateUserProfile(user.id, result.data);
    
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user API error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}