import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'khodetoan-secret-key-change-in-production'
);

const COOKIE_NAME = 'kdt_session';

/**
 * Middleware: Auth check cho protected routes
 * Hỗ trợ: Neon JWT / Supabase / Demo mode
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Check which database provider is configured
  const databaseUrl = process.env.DATABASE_URL || '';
  const isNeon = databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isSupabase = supabaseUrl.length > 10 && supabaseUrl.startsWith('http');

  // Demo mode - allow all routes
  if (!isNeon && !isSupabase) {
    return response;
  }

  // Protected routes
  const protectedPaths = ['/dashboard', '/questions', '/exams', '/admin', '/favorites', '/history', '/worksheets', '/saved-exams'];
  const isProtectedRoute = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  const authPaths = ['/login', '/register', '/forgot-password'];
  const isAuthRoute = authPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  let isAuthenticated = false;

  if (isNeon) {
    // Neon: Check JWT cookie
    const sessionCookie = request.cookies.get(COOKIE_NAME);
    if (sessionCookie) {
      try {
        await jwtVerify(sessionCookie.value, JWT_SECRET);
        isAuthenticated = true;
      } catch {
        // Token expired or invalid
      }
    }
  } else if (isSupabase) {
    // Supabase: Check via Supabase SSR client
    try {
      const { createServerClient } = await import('@supabase/ssr');
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        }
      );
      const { data: { user } } = await supabase.auth.getUser();
      isAuthenticated = !!user;
    } catch {
      // Supabase error
    }
  }

  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}
