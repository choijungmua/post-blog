"use client";
import React from "react";
import { PostSidebars } from "@/components/ui/post";

/**
 * 블로그 포스트 상세 페이지 레이아웃
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 레이아웃 내부에 렌더링할 콘텐츠
 */
export default function PostDetailLayout({ children }) {
  return (
    <div className="container py-8 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 테이블 오브 콘텐츠 (목차) - 좌측 사이드바 */}
        <aside className="hidden lg:block lg:col-span-3 relative">
          <div className="sticky top-24">
            <PostSidebars.TableOfContents />
          </div>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
