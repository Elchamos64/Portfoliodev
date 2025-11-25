import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const SESSION_COOKIE_NAME = 'admin_session';

// Simple session token (in production, use a proper JWT or session management)
export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function createSession() {
  // Create a simple session token (in production, use proper JWT)
  const sessionToken = Buffer.from(`admin:${Date.now()}`).toString('base64');

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return sessionToken;
}

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

// For API routes - verify admin from request headers or cookies
export function verifyAdmin(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const cookieHeader = request.headers.get('cookie');

  // Check Authorization header
  if (authHeader) {
    const password = authHeader.replace('Bearer ', '');
    return verifyPassword(password);
  }

  // Check cookie
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    return !!cookies[SESSION_COOKIE_NAME];
  }

  return false;
}
