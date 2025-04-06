"use client";

import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * 블로그 포스트 목차 컴포넌트
 */
export default function PostTableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const headingElementsRef = useRef([]);
  const tocNavRef = useRef(null);
  const activeItemRef = useRef(null);

  // 헤딩 요소를 찾아서 목차 데이터를 생성하는 함수
  const findHeadings = () => {
    // 페이지의 모든 제목 태그(h1~h6)를 찾습니다
    const elements = Array.from(
      document.querySelectorAll(
        ".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6"
      )
    )
      .filter((element) => element.id) // ID가 있는 요소만 필터링
      .map((element, index) => {
        // 각 요소에 고유한 인덱스를 데이터에 포함
        return {
          id: element.id,
          text: element.textContent,
          level: parseInt(element.tagName.substring(1)), // h1 -> 1, h2 -> 2 등
          element,
          index: index, // 항목의 순서를 저장
        };
      });

    headingElementsRef.current = elements;
    setHeadings(elements);
    return elements;
  };

  // 활성화된 목차 항목으로 스크롤하는 함수
  const scrollActiveItemIntoView = (id) => {
    if (!tocNavRef.current) return;

    // 현재 활성화된 항목을 찾아 스크롤
    setTimeout(() => {
      // ID 선택자에서 특수문자를 이스케이프해야 올바르게 작동함
      const escapedId = CSS.escape(id);
      const activeItem = tocNavRef.current.querySelector(
        `a[href="#${escapedId}"]`
      );

      if (activeItem) {
        activeItemRef.current = activeItem;

        // 목차 컨테이너 내에서 활성화된 항목이 보이도록 스크롤
        const navContainer = tocNavRef.current;
        const itemRect = activeItem.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();

        // 항목이 컨테이너 밖에 있는지 확인
        const isAbove = itemRect.top < containerRect.top;
        const isBelow = itemRect.bottom > containerRect.bottom;

        if (isAbove) {
          // 상단에 보이지 않는 경우
          const scrollTop =
            navContainer.scrollTop + (itemRect.top - containerRect.top) - 20;
          navContainer.scrollTo({ top: scrollTop, behavior: "smooth" });
        } else if (isBelow) {
          // 하단에 보이지 않는 경우
          const scrollBottom =
            navContainer.scrollTop +
            (itemRect.bottom - containerRect.bottom) +
            20;
          navContainer.scrollTo({ top: scrollBottom, behavior: "smooth" });
        }
      }
    }, 100); // 약간 더 긴 타임아웃으로 DOM이 업데이트될 시간을 줌
  };

  useEffect(() => {
    // 초기 로딩 후 약간의 지연을 두고 헤딩 요소 찾기
    // 이렇게 하면 MDX 컴포넌트가 모두 렌더링된 후에 실행됨
    const initialLoadTimer = setTimeout(() => {
      const elements = findHeadings();
      if (elements.length > 0) {
        // 초기 활성 헤딩 설정
        const activeHeadingId = getActiveHeading(elements);
        if (activeHeadingId) {
          setActiveId(activeHeadingId);
          // 목차 내 활성 항목으로 스크롤
          scrollActiveItemIntoView(activeHeadingId);
        }
      }
    }, 300);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (handleScroll.timer) {
        clearTimeout(handleScroll.timer);
      }

      handleScroll.timer = setTimeout(() => {
        const elements = headingElementsRef.current;
        if (elements.length === 0) return;

        const activeHeadingId = getActiveHeading(elements);
        if (activeHeadingId && activeHeadingId !== activeId) {
          setActiveId(activeHeadingId);
          // 활성화된 헤딩이 변경되면 해당 목차 항목으로 스크롤
          scrollActiveItemIntoView(activeHeadingId);
        }
      }, 50); // 50ms 디바운스로 성능 최적화
    };

    // 정확한 활성 헤딩을 찾는 함수
    const getActiveHeading = (elements) => {
      elements = elements || headingElementsRef.current;
      const scrollY = window.scrollY;

      if (elements.length === 0) return null;

      // 문서 최상단일 경우 첫 번째 헤딩
      if (scrollY < 50) {
        return elements.length > 0 ? elements[0].id : null;
      }

      // 문서 최하단일 경우 마지막 헤딩
      if (
        scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 50
      ) {
        return elements.length > 0 ? elements[elements.length - 1].id : null;
      }

      // 특정 위치(화면 상단에서 150px 아래)에 있는 헤딩 찾기
      const targetY = scrollY + 150;

      // 현재 스크롤 위치보다 위에 있는 마지막 헤딩 찾기
      let currentHeadingIndex = -1;

      for (let i = 0; i < elements.length; i++) {
        const element = document.getElementById(elements[i].id);
        if (!element) continue;

        const elementTop = element.getBoundingClientRect().top + scrollY;

        // 헤딩이 타겟 위치보다 위에 있으면, 이 헤딩이 현재 섹션의 헤딩
        if (elementTop <= targetY) {
          currentHeadingIndex = i;
        } else {
          // 타겟 위치를 넘어선 첫 번째 헤딩을 찾으면 중단
          break;
        }
      }

      // 헤딩을 찾지 못했으면 null 반환
      if (currentHeadingIndex === -1) return null;

      // 현재 헤딩의 ID 반환
      return elements[currentHeadingIndex].id;
    };

    // DOM 변경 감지 설정
    const setupMutationObserver = () => {
      const observer = new MutationObserver(() => {
        // DOM 변경이 감지되면 헤딩 요소 다시 찾기
        const elements = findHeadings();
        if (elements.length > 0) {
          const activeHeadingId = getActiveHeading(elements);
          if (activeHeadingId && activeHeadingId !== activeId) {
            setActiveId(activeHeadingId);
            scrollActiveItemIntoView(activeHeadingId);
          }
        }
      });

      // article, main, .prose 또는 body를 관찰
      const contentContainer =
        document.querySelector("article, main, .prose") || document.body;

      if (contentContainer) {
        observer.observe(contentContainer, {
          childList: true,
          subtree: true,
        });
        console.log("MutationObserver 설정됨", contentContainer);
      }

      return observer;
    };

    // 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 페이지가 완전히 로드된 후 MutationObserver 설정
    let mutationObserver;
    if (document.readyState === "complete") {
      mutationObserver = setupMutationObserver();
    } else {
      window.addEventListener("load", () => {
        mutationObserver = setupMutationObserver();
      });
    }

    // 최초 실행 및 클린업
    handleScroll();

    return () => {
      clearTimeout(initialLoadTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", setupMutationObserver);
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [activeId]);

  // activeId가 변경될 때마다 실행
  useEffect(() => {
    if (activeId) {
      scrollActiveItemIntoView(activeId);
    }
  }, [activeId]);

  // 목차 클릭 처리
  const handleClick = (e, id) => {
    e.preventDefault();

    // 정확한 요소 찾기
    const element = document.getElementById(id);
    if (!element) {
      // ID로 직접 찾지 못한 경우, 텍스트 내용으로 찾기 시도
      console.log("ID로 요소를 찾지 못했습니다:", id);
      return;
    }

    // 스크롤 시 상단 헤더 고려하여 오프셋 계산
    const headerOffset = 80; // 헤더 높이에 맞게 조정
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    // 스크롤 실행
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // 활성 ID 업데이트
    setActiveId(id);

    // 요소가 보이는지 확인하기 위해 시간 지연 후 체크
    setTimeout(() => {
      const elementRect = element.getBoundingClientRect();
      const isVisible =
        elementRect.top >= 0 && elementRect.top <= window.innerHeight;

      if (!isVisible) {
        console.log("스크롤 후에도 요소가 화면에 보이지 않습니다:", id);
        // 다시 한번 스크롤 시도
        window.scrollTo({
          top: offsetPosition,
          behavior: "auto", // smooth 대신 즉시 이동
        });
      }
    }, 500);
  };

  if (headings.length === 0) return null;

  return (
    <Card className="overflow-hidden bg-background border-none shadow-sm">
      <CardContent className="pt-0">
        <nav className="toc-nav" ref={tocNavRef}>
          <ul className="space-y-1 text-sm max-h-[70vh] pr-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {headings.map((heading, index) => (
              <li
                key={`${heading.id}-${index}`}
                className={cn(
                  "transition-colors",
                  heading.level === 1 && "ml-0",
                  heading.level === 2 && "ml-3",
                  heading.level === 3 && "ml-6",
                  heading.level === 4 && "ml-9",
                  heading.level >= 5 && "ml-12"
                )}
              >
                <Link
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={cn(
                    "block py-1 hover:text-primary transition-colors",
                    activeId === heading.id
                      ? "text-primary font-medium scale-110 transition-all duration-initial ml-8"
                      : "text-muted-foreground"
                  )}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
