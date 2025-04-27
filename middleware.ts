import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware to check authentication for protected routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get auth tokens from cookies
  const adminToken = request.cookies.get('admin-token')?.value
  const restoToken = request.cookies.get('resto-token')?.value
  const userToken = request.cookies.get('user-token')?.value

  // Admin routes protection
  if (pathname.startsWith('/admin') && !pathname.includes('/admin/login')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Restaurant routes protection
  if (pathname.startsWith('/resto') && !pathname.includes('/resto/login')) {
    if (!restoToken) {
      return NextResponse.redirect(new URL('/resto/login', request.url))
    }
  }

  // User protected routes (e.g., profile, orders)
  if ((pathname.startsWith('/profile') || pathname.startsWith('/orders') || pathname.startsWith('/checkout')) && !userToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    '/admin/:path*',
    '/resto/:path*',
    '/profile/:path*',
    '/orders/:path*',
    '/checkout/:path*',
  ],
}
