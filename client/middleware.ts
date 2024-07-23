import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_KYES } from '@/src/shared/const';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KYES.ACCESS_TOKEN);

  if (!token) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  return NextResponse.next();
}

// 특정 경로에만 미들웨어 적용
export const config = {
  matcher: ['/admin', '/coverLetter/:path*', '/myProfile'],
};
