import { Hash } from "lucide-react";
import { useEffect, useRef } from "react";

// 제목 태그(h1~h6)를 위한 공통 컴포넌트
const createHeadingComponent = (level, fontSize, marginTop, marginBottom) => {
  const Component = ({ id, children, ...props }) => {
    const HeadingTag = `h${level}`;
    const sizeClass = fontSize;
    const headingRef = useRef(null);
    const hashSize =
      level === 1
        ? "h-7 w-7"
        : level === 2
        ? "h-6 w-6"
        : level === 3
        ? "h-5.5 w-5.5"
        : level === 4
        ? "h-5 w-5"
        : level === 5
        ? "h-4.5 w-4.5"
        : "h-4 w-4";

    // 자동으로 ID 생성 (제공된 ID가 없는 경우)
    const headingId =
      id ||
      (typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/^-+|-+$/g, "")
        : `heading-${level}-${Math.random().toString(36).substr(2, 9)}`);

    // URL 해시가 현재 헤딩과 일치하는지 확인하여 스크롤
    useEffect(() => {
      if (window.location.hash === `#${headingId}` && headingRef.current) {
        setTimeout(() => {
          scrollToHeading();
        }, 100);
      }
    }, []);

    // 개선된 스크롤 함수
    const scrollToHeading = () => {
      if (!headingRef.current) return;

      // 상단 네비게이션 바 등을 고려한 오프셋
      const offset = 100;

      // 요소의 절대 위치 계산
      const rect = headingRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;

      // 스크롤 위치 설정
      window.scrollTo({
        top: absoluteTop - offset,
        behavior: "smooth",
      });
    };

    const smoothScrollToElement = (e) => {
      if (e) e.preventDefault();

      // URL 해시 업데이트
      window.history.pushState(null, null, `#${headingId}`);

      // 스크롤 실행
      scrollToHeading();
    };

    return (
      <div className="flex items-center group relative">
        <a
          href={`#${headingId}`}
          className="absolute -left-8 flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={smoothScrollToElement}
          aria-label={`${children} 섹션으로 이동`}
        >
          <Hash
            className={`${hashSize} text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400`}
          />
        </a>
        <HeadingTag
          id={headingId}
          ref={headingRef}
          className={`${sizeClass} font-semibold mt-${marginTop} mb-${marginBottom} cursor-pointer hover:text-blue-600 dark:hover:text-blue-400`}
          onClick={smoothScrollToElement}
          {...props}
        >
          {children}
        </HeadingTag>
      </div>
    );
  };

  return Component;
};

// 각 제목 수준별 컴포넌트 생성
export const H1 = createHeadingComponent(1, "text-4xl font-bold", 8, 4);
export const H2 = createHeadingComponent(2, "text-3xl", 7, 3);
export const H3 = createHeadingComponent(3, "text-2xl", 6, 3);
export const H4 = createHeadingComponent(4, "text-xl", 5, 2);
export const H5 = createHeadingComponent(5, "text-lg", 4, 2);
export const H6 = createHeadingComponent(6, "text-base", 3, 2);

export const headingComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
