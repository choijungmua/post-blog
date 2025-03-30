import { NextResponse } from "next/server";

// 미들웨어 함수 정의
export function middleware(request) {
  // 현재 요청 URL
  const url = request.nextUrl.clone();

  // 홈에서 /posts/post-list로 자동 리다이렉트되는 문제 해결
  // 여기에 홈에서 리다이렉트되는 로직이 있었다면 제거합니다

  // /posts/post-list에서 홈으로 리다이렉트하는 로직은 유지
  if (url.pathname === "/posts/post-list") {
    // 홈페이지로 리다이렉트
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 다른 경로는 정상적으로 처리
  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
