export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/api/auth';
import * as z from 'zod';

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate request data
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { name, email, password } = result.data;
    
    // Register user
    const { user, token } = await registerUser(name, email, password);
    
    // Return response
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error('Register API error:', error);
    
    // Handle known errors
    if (error instanceof Error) {
      if (error.message === 'User with this email already exists') {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        );
      }
    }
    
    // Handle unknown errors
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}