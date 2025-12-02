import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin dashboard (but not login)
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Check for session cookie
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/dashboard/:path*',
};
