import { Hash } from "lucide-react";
import { useEffect, useRef } from "react";

// 제목 태그(h1~h6)를 위한 공통 컴포넌트
const createHeadingComponent = (level, fontSize, marginTop, marginBottom) => {
  const Component = ({ id, children, ...props }) => {
    const HeadingTag = `h${level}`;
    const headingRef = useRef(null);
    const hashSize =
      level === 1
        ? "h-7 w-7"
        : level === 2
        ? "h-6 w-6"
        : level === 3
        ? "h-5 w-5"
        : "h-4 w-4";

    // 자동으로 ID 생성 (제공된 ID가 없는 경우)
    const headingId =
      id ||
      (typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/[\u3131-\uD79D]/g, (c) => {
              // 한글 문자를 각 문자의 유니코드 코드 포인트로 대체
              return encodeURIComponent(c).replace(/%/g, "");
            })
            .replace(/^-+|-+$/g, "") +
          // 동일 텍스트로 인한 중복 ID 방지를 위해 텍스트 자체를 해시화
          (children.length > 0
            ? `-${level}-${children
                .split("")
                .reduce((acc, char) => (acc + char.charCodeAt(0)) % 1000, 0)}`
            : `-${level}-random`)
        : `heading-${level}-${Math.random().toString(36).substr(2, 9)}`);

    // URL 해시가 현재 헤딩과 일치하는지 확인하여 스크롤
    useEffect(() => {
      if (window.location.hash === `#${headingId}` && headingRef.current) {
        setTimeout(scrollToHeading, 100);
      }
    }, []);

    // 개선된 스크롤 함수
    const scrollToHeading = () => {
      if (!headingRef.current) return;
      const offset = 100;
      const rect = headingRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      window.scrollTo({
        top: absoluteTop - offset,
        behavior: "smooth",
      });
    };

    const smoothScrollToElement = (e) => {
      if (e) e.preventDefault();
      window.history.pushState(null, null, `#${headingId}`);
      scrollToHeading();
    };

    return (
      <div className="heading-wrapper relative group hover:text-blue-400">
        <a
          href={`#${headingId}`}
          className="absolute -left-8 flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={smoothScrollToElement}
          aria-label={`${children} 섹션으로 이동`}
        >
          <Hash
            className={`${hashSize} text-muted-foreground group-hover:text-blue-400 transition-colors`}
          />
        </a>
        <HeadingTag
          id={headingId}
          ref={headingRef}
          className={`${fontSize} cursor-pointer font-semibold mt-${marginTop} mb-${marginBottom} transition-colors`}
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
