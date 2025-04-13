// DashboardPostNav.jsx
import React, { useRef, useEffect, useState } from "react";
import anime from "animejs";

/**
 * DashboardPostNavItem 컴포넌트는 개별 포스트 항목에 대해
 * 마우스 오버 시 배경 애니메이션과 텍스트 색상 변경(겹치는 영역에서)을 구현합니다.
 * 텍스트를 두 레이어로 분리하여, 겹치는 부분만 background 색상으로 변경되는 효과를 줍니다.
 */
const DashboardPostNavItem = ({ post, isActive, onItemClick }) => {
  // 배경 애니메이션 대상 ref
  const bgRef = useRef(null);
  // 텍스트 오버레이 대상 ref (상단 레이어)
  const textOverlayRef = useRef(null);
  // 카운트 오버레이 대상 ref 추가
  const countOverlayRef = useRef(null);
  // isActive는 이제 props로 받음

  // 이전 활성화 상태를 저장
  const prevIsActiveRef = useRef(isActive);

  // isActive 상태를 처리하는 useEffect 통합
  useEffect(() => {
    // 마운트 시 초기 상태 설정 (애니메이션 없음)
    if (isActive) {
      // 활성 상태 스타일 즉시 적용
      if (bgRef.current) bgRef.current.style.transform = "translateY(0%)";
      if (textOverlayRef.current)
        textOverlayRef.current.style.clipPath = "inset(0 0 0 0)";
      if (countOverlayRef.current)
        countOverlayRef.current.style.clipPath = "inset(0 0 0 0)";
    } else {
      // 비활성 상태 스타일 즉시 적용
      if (bgRef.current) bgRef.current.style.transform = "translateY(100%)";
      if (textOverlayRef.current)
        textOverlayRef.current.style.clipPath = "inset(0 0 100% 0)";
      if (countOverlayRef.current)
        countOverlayRef.current.style.clipPath = "inset(0 0 100% 0)";
    }
    // 이전 상태 업데이트 (마운트 시에도 필요)
    prevIsActiveRef.current = isActive;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시에만 실행

  // isActive 변경 시 애니메이션 처리
  useEffect(() => {
    // 마운트 시에는 이 useEffect가 실행되지 않도록 prevIsActiveRef와 비교
    // 또한, 실제 상태 변경이 있을 때만 애니메이션 실행
    if (prevIsActiveRef.current !== isActive) {
      if (isActive) {
        activateAnimation();
      } else {
        deactivateAnimation();
      }
      // 애니메이션 실행 후 이전 상태 업데이트
      prevIsActiveRef.current = isActive;
    }
  }, [isActive]); // isActive 변경 시에만 실행

  /**
   * resetAnimation: 배경과 텍스트 오버레이의 초기 상태를 설정합니다.
   * - 배경 div는 화면 아래로 숨김
   * - 텍스트 오버레이는 clip-path를 이용해 완전히 가려진 상태로 설정
   */
  const resetAnimation = () => {
    if (bgRef.current) {
      bgRef.current.style.transform = "translateY(100%)";
    }
    if (textOverlayRef.current) {
      textOverlayRef.current.style.clipPath = "inset(0 0 100% 0)";
    }
    if (countOverlayRef.current) {
      countOverlayRef.current.style.clipPath = "inset(0 0 100% 0)";
    }
  };

  /**
   * activateAnimation: 활성화 애니메이션을 실행합니다.
   */
  const activateAnimation = () => {
    resetAnimation();
    try {
      anime({
        targets: bgRef.current,
        translateY: ["100%", "0%"],
        duration: 300,
        easing: "easeInOutQuad",
      });

      // 텍스트 애니메이션
      anime({
        targets: textOverlayRef.current,
        clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
        duration: 300,
        easing: "easeInOutQuad",
      });

      // 카운트 애니메이션
      anime({
        targets: countOverlayRef.current,
        clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
        duration: 300,
        easing: "easeInOutQuad",
      });
    } catch (error) {
      console.error("애니메이션 처리 중 에러 발생:", error);
    }
  };

  /**
   * deactivateAnimation: 비활성화 애니메이션을 실행합니다.
   */
  const deactivateAnimation = () => {
    try {
      anime({
        targets: bgRef.current,
        translateY: ["0%", "100%"],
        duration: 300,
        easing: "easeInOutQuad",
        complete: () => {
          if (bgRef.current) {
            bgRef.current.style.transform = "translateY(100%)";
          }
        },
      });

      // 텍스트 애니메이션
      anime({
        targets: textOverlayRef.current,
        clipPath: ["inset(0 0 0 0)", "inset(0 0 100% 0)"],
        duration: 300,
        easing: "easeInOutQuad",
      });

      // 카운트 애니메이션
      anime({
        targets: countOverlayRef.current,
        clipPath: ["inset(0 0 0 0)", "inset(0 0 100% 0)"],
        duration: 300,
        easing: "easeInOutQuad",
      });
    } catch (error) {
      console.error("애니메이션 처리 중 에러 발생:", error);
    }
  };

  const handleMouseEnter = () => {
    // 이미 active 상태면 애니메이션을 다시 실행하지 않음
    if (isActive) return;

    if (typeof window === "undefined") return;
    activateAnimation();
  };

  const handleMouseLeave = () => {
    // active 상태일 때는 마우스가 떠나도 애니메이션을 실행하지 않음
    if (isActive) return;

    if (typeof window === "undefined") return;
    deactivateAnimation();
  };

  // 클릭 핸들러는 상위 컴포넌트로부터 전달받은 함수 호출
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 방지
    onItemClick();
  };

  return (
    <li
      className={`relative w-full bg-background overflow-hidden ${
        isActive ? "active" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="block p-2 sm:p-3 relative z-20 w-full text-left cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative">
          {/* 기본 텍스트: CSS 변수 직접 사용 */}
          <p
            className="font-medium text-sm sm:text-base"
            style={{ color: "var(--foreground)" }}
          >
            {post.title}
          </p>
          {/* 텍스트 오버레이: CSS 변수 직접 사용, clip-path로 가려진 상태 */}
          <p
            ref={textOverlayRef}
            className="font-medium text-sm sm:text-base absolute top-0 left-0 w-full h-full"
            style={{
              color: "var(--background)", // CSS 변수 직접 사용
              clipPath: "inset(0 0 100% 0)",
            }}
          >
            {post.title}
          </p>
        </div>
        <div className="mt-1 flex justify-end items-center">
          {/* 갯수 표시 부분 추가 - 기본 텍스트: CSS 변수 직접 사용 */}
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--foreground)" }} // CSS 변수 직접 사용
          >
            {post.count || 0}
          </span>

          {/* 갯수 표시 오버레이 - background 색상으로: CSS 변수 직접 사용 */}
          <span
            ref={countOverlayRef}
            className="text-xs font-semibold absolute bottom-2 sm:bottom-3 right-2 sm:right-3"
            style={{
              color: "var(--background)", // CSS 변수 직접 사용
              clipPath: "inset(0 0 100% 0)",
            }}
          >
            {post.count || 0}
          </span>
        </div>
      </button>
      {/* 배경 div: 초기 상태는 translateY(100%)로 숨김 */}
      <div
        ref={bgRef}
        className="bg-foreground w-full h-full absolute inset-0 z-10"
        style={{ transform: "translateY(100%)", opacity: 1 }}
      />
    </li>
  );
};

/**
 * DashboardPostNav 컴포넌트는 태그 목록과 각 태그에 해당하는 포스트 수를 렌더링합니다.
 * posts 배열을 받아 태그 정보를 집계하고, DashboardPostNavItem을 사용하여 목록을 표시합니다.
 */
function DashboardPostNav({ posts, onTagChange }) {
  // 태그별 포스트 수를 계산하는 로직을 별도 함수로 분리하여 가독성 향상
  const calculateTagsCount = (postsData) => {
    // postsData가 유효한 배열인지 확인
    if (!Array.isArray(postsData)) {
      console.error("DashboardPostNav: posts prop must be an array.");
      return {};
    }

    return postsData.reduce((acc, post) => {
      // 각 포스트의 tags가 배열인지, 요소가 문자열인지 확인하여 안정성 강화
      if (Array.isArray(post?.tags)) {
        post.tags.forEach((tag) => {
          if (typeof tag === "string" && tag.trim() !== "") {
            const trimmedTag = tag.trim();
            acc[trimmedTag] = (acc[trimmedTag] || 0) + 1;
          }
        });
      }
      return acc;
    }, {});
  };

  // 태그 데이터를 { id, name, count } 형태의 배열로 변환하는 로직
  const transformTagsData = (tagsCount) => {
    return Object.entries(tagsCount).map(([name, count]) => ({
      id: name, // 고유 ID로 태그 이름 사용
      name: name,
      count: count,
    }));
  };

  // 태그 데이터 계산 및 변환 (Memoization을 사용하여 posts가 변경될 때만 재계산)
  const tagData = React.useMemo(() => {
    const tagsCount = calculateTagsCount(posts);
    const transformedTags = transformTagsData(tagsCount);

    // 모든 태그의 count 합계 계산
    const totalCount = transformedTags.reduce((sum, tag) => sum + tag.count, 0);

    // 'All' 아이템을 맨 앞에 추가
    const allItem = {
      id: "all",
      name: "All",
      count: totalCount, // posts.length 대신 모든 태그의 count 합계 사용
    };

    return [allItem, ...transformedTags];
    // posts 배열의 내용이 변경될 때만 useMemo 콜백이 실행되도록 posts를 의존성 배열에 추가
    // posts 배열 내부 객체의 내용 변경까지 감지하려면 더 복잡한 비교나 라이브러리 사용 필요
  }, [posts]);

  // 현재 활성화된 태그 이름을 추적 - 첫 번째 태그 이름으로 초기화 (이제 'All'로 초기화됨)
  const [activeTagName, setActiveTagName] = useState(
    tagData.length > 0 ? tagData[0].name : null
  );

  // activeTagName이 변경될 때마다 초기화 로직 재실행 방지 및 tagData 변경 시 초기화
  useEffect(() => {
    if (
      tagData.length > 0 &&
      !tagData.some((tag) => tag.name === activeTagName)
    ) {
      setActiveTagName(tagData[0].name);
    } else if (tagData.length === 0) {
      setActiveTagName(null);
    }
    // activeTagName은 의존성 배열에서 제외하여 activeTagName 변경 시 재실행 방지
    // tagData가 변경되었을 때만 (예: posts prop 업데이트 시) activeTagName을 재설정
  }, [tagData]);

  // activeTagName이 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    if (onTagChange && activeTagName) {
      onTagChange(activeTagName);
    }
  }, [activeTagName, onTagChange]);

  // 항목 클릭 핸들러: 클릭된 태그 이름으로 activeTagName 상태 업데이트
  const handleItemClick = (tagName) => {
    // 이미 활성화된 항목을 다시 클릭하면 아무 동작도 하지 않음 (선택 사항)
    // if (activeTagName === tagName) return;
    setActiveTagName(tagName);
  };

  // posts prop이 없을 경우 빈 네비게이션 또는 로딩 상태 표시
  if (!posts || posts.length === 0) {
    // 예: 로딩 스켈레톤 또는 메시지 반환
    return (
      <nav className="rounded-lg p-4">
        <ul>
          <li>No posts available.</li>
        </ul>
      </nav>
    );
    // 또는 return null;
  }

  return (
    <nav className="w-full md:w-1/3 lg:w-1/4 rounded-lg p-2 sm:p-4">
      {/* 태그 목록 렌더링 */}
      <ul className="w-full flex flex-row md:flex-col flex-wrap gap-2 md:gap-1">
        {tagData.map((tagItem) => (
          <DashboardPostNavItem
            key={tagItem.id} // key를 태그 이름(id)으로 설정
            // DashboardPostNavItem이 기대하는 형식({ title, count })으로 데이터 전달
            post={{ title: tagItem.name, count: tagItem.count }}
            isActive={activeTagName === tagItem.name}
            onItemClick={() => handleItemClick(tagItem.name)}
          />
        ))}
      </ul>
    </nav>
  );
}

export default DashboardPostNav;
