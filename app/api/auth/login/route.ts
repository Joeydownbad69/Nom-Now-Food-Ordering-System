import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/api/auth';
import * as z from 'zod';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate request data
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { email, password } = result.data;
    
    // Login user
    const { user, token } = await loginUser(email, password);
    
    // Return response
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error('Login API error:', error);
    
    // Handle known errors
    if (error instanceof Error) {
      if (error.message === 'Invalid email or password') {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }
    }
    
    // Handle unknown errors
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}