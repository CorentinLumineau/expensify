import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If there's no session and the user is trying to access an authenticated route, redirect to sign-in
  if (!session && !req.nextUrl.pathname.startsWith('/sign-in') && !req.nextUrl.pathname.startsWith('/sign-up')) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // If there's a session and the user is trying to access a public route, redirect to the dashboard
  if (session && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
