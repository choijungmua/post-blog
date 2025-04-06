"use client"; // 클라이언트 컴포넌트로 변경

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { useEffect, useRef } from "react"; // useEffect, useRef import
import anime from "animejs/lib/anime.es.js"; // animejs import

export function NotFoundScreen() {
  const circleRef = useRef(null); // SVG circle 참조
  const lineRef = useRef(null); // SVG line 참조

  useEffect(() => {
    if (circleRef.current && lineRef.current) {
      // 초기 상태 설정 (선이 그려지지 않도록)
      const circlePath = circleRef.current;
      const linePath = lineRef.current;
      const circleLength = circlePath.getTotalLength();
      const lineLength = linePath.getTotalLength();

      circlePath.style.strokeDasharray = circleLength;
      circlePath.style.strokeDashoffset = circleLength;
      linePath.style.strokeDasharray = lineLength;
      linePath.style.strokeDashoffset = lineLength;

      // Anime.js 애니메이션
      anime
        .timeline({
          easing: "easeInOutSine",
          duration: 800, // 애니메이션 지속 시간
        })
        .add({
          targets: circlePath,
          strokeDashoffset: [anime.setDashoffset, 0], // 원 그리기
          delay: 200, // 약간의 딜레이 후 시작
        })
        .add({
          targets: linePath,
          strokeDashoffset: [anime.setDashoffset, 0], // 선 그리기
          offset: "-=400", // 원 애니메이션 중간부터 시작
        });
    }
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center gap-8 text-center animate-in fade-in slide-in-from-top-8 duration-500">
      {/* SVG 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="96"
        height="96"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary/70" // fade-in은 animejs가 제어하므로 제거 가능
        aria-hidden="true"
      >
        {/* ref 추가 */}
        <circle cx="11" cy="11" r="8" id="search-circle" ref={circleRef} />
        <line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          id="search-line"
          ref={lineRef}
        />
      </svg>
      {/* 약간의 위쪽 마진과 애니메이션 효과 추가 */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          앗! 페이지를 찾을 수 없어요
        </h1>
        <p className="mx-auto max-w-md text-lg text-muted-foreground">
          요청하신 페이지가 사라졌거나, 주소가 변경되었을 수 있습니다. 입력하신
          주소를 다시 한번 확인해주세요.
        </p>
      </div>
      {/* 버튼에도 약간의 딜레이를 둔 애니메이션 추가 */}
      <Button
        asChild
        size="lg"
        className="animate-in fade-in zoom-in-95 duration-500 delay-300"
      >
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
      {/* 선택 사항: 검색창이나 다른 유용한 링크 추가 */}
      {/*
      <div className="mt-8 w-full max-w-sm animate-in fade-in duration-500 delay-500">
        { // 예시: 검색 컴포넌트나 다른 네비게이션 링크 }
      </div>
      */}
    </div>
  );
}
