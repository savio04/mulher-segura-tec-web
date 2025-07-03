import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@mulhersegura.token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!signin|signup|api|_next|favicon.ico|public).*)',
  ],
}
