import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

    // If maintenance mode is OFF, let all requests pass through normally
    if (!isMaintenanceMode) {
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;

    // Allow access to:
    // 1. The /maintenance page itself (to avoid redirect loop)
    // 2. Static files (_next/static, _next/image, favicon, etc.)
    // 3. API routes (/api/*)
    if (
        pathname.startsWith('/maintenance') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname === '/favicon.ico' ||
        pathname.endsWith('.png') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.jpeg') ||
        pathname.endsWith('.webp') ||
        pathname.endsWith('.svg') ||
        pathname.endsWith('.ico') ||
        pathname.endsWith('.avif') ||
        pathname === '/site.webmanifest' ||
        pathname === '/robots.txt'
    ) {
        return NextResponse.next();
    }

    // Rewrite all other routes to /maintenance while keeping the original URL.
    // This allows the /maintenance page to serve a proper 503 status code.
    const maintenanceUrl = new URL('/maintenance', request.url);
    const response = NextResponse.rewrite(maintenanceUrl);

    // Set 503 Service Unavailable status for SEO safety
    // Bots will see 503 and know the site is temporarily unavailable
    response.headers.set('x-middleware-status', '503');
    response.headers.set('Retry-After', '3600'); // Suggest retry after 1 hour

    return response;
}

// Match all routes except Next.js internals and static files
export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
