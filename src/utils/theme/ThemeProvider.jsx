"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  // useEffect는 클라이언트 측에서만 실행됩니다
  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted가 false이면 자식 컴포넌트를 렌더링하지만
  // 테마를 적용하지 않습니다 (수화 전)
  return (
    <NextThemesProvider {...props}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </NextThemesProvider>
  );
}
