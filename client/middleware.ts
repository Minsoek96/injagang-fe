import { NextRequest, NextResponse } from 'next/server';

import { TOKEN_KEYS } from '@/src/shared/const';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEYS.ACCESS_TOKEN);

  if (token) {
    // Referer 헤더에서 이전 페이지 URL 가져오기
    const referer = req.headers.get('referer') || req.nextUrl.origin;
    return NextResponse.redirect(referer);
  }

  return NextResponse.next();
}

// 특정 경로에만 미들웨어 적용
export const config = {
  matcher: ['/login'],
};
