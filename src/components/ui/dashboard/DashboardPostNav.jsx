// DashboardPostNav.jsx
import React, { useRef, useEffect, useState } from "react";
import anime from "animejs";
import { recentPosts } from "../../../lib/data/siteData";

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
  // 초기 색상 상태: foreground와 background 값을 저장
  const [foregroundColor, setForegroundColor] = useState("inherit");
  const [backgroundColor, setBackgroundColor] = useState("inherit");
  // isActive는 이제 props로 받음

  // 이전 활성화 상태를 저장
  const prevIsActiveRef = useRef(isActive);

  // 컴포넌트 마운트 후 CSS 변수의 실제 색상 값을 가져옴
  useEffect(() => {
    if (typeof window !== "undefined") {
      const computedForeground = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
      const computedBackground = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      setForegroundColor(computedForeground);
      setBackgroundColor(computedBackground);
    }

    // 컴포넌트 마운트 시 isActive가 true이면 활성화 상태로 설정
    if (isActive) {
      if (bgRef.current) {
        bgRef.current.style.transform = "translateY(0%)";
      }
      if (textOverlayRef.current) {
        textOverlayRef.current.style.clipPath = "inset(0 0 0 0)";
      }
      if (countOverlayRef.current) {
        countOverlayRef.current.style.clipPath = "inset(0 0 0 0)";
      }
    }
  }, []);

  // isActive 변경 시 애니메이션 처리
  useEffect(() => {
    // 마운트 시에는 애니메이션 없이 상태만 설정
    if (isActive && prevIsActiveRef.current === false) {
      // 애니메이션 없이 바로 활성화 상태로 설정
      if (bgRef.current) {
        bgRef.current.style.transform = "translateY(0%)";
      }
      if (textOverlayRef.current) {
        textOverlayRef.current.style.clipPath = "inset(0 0 0 0)";
      }
      if (countOverlayRef.current) {
        countOverlayRef.current.style.clipPath = "inset(0 0 0 0)";
      }
    } else if (prevIsActiveRef.current !== isActive) {
      // 활성화 상태가 변경된 경우에만 애니메이션 실행
      if (isActive) {
        activateAnimation();
      } else {
        deactivateAnimation();
      }
    }
    prevIsActiveRef.current = isActive;
  }, [isActive]);

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
      className={`relative w-[400px] bg-background overflow-hidden ${
        isActive ? "active" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="block p-3 relative z-20 w-full text-left cursor-pointer"
        onClick={handleClick}
      >
        <div className="relative">
          {/* 기본 텍스트: 항상 foreground 색상 */}
          <p className="font-medium" style={{ color: foregroundColor }}>
            {post.title}
          </p>
          {/* 텍스트 오버레이: background 색상, clip-path로 가려진 상태 */}
          <p
            ref={textOverlayRef}
            className="font-medium absolute top-0 left-0 w-full h-full"
            style={{
              color: backgroundColor,
              clipPath: "inset(0 0 100% 0)",
            }}
          >
            {post.title}
          </p>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{post.date}</span>

          {/* 갯수 표시 부분 추가 - 기본 텍스트 */}
          <span
            className="text-xs font-semibold"
            style={{ color: foregroundColor }}
          >
            {post.count || 0}
          </span>

          {/* 갯수 표시 오버레이 - background 색상으로 */}
          <span
            ref={countOverlayRef}
            className="text-xs font-semibold absolute bottom-3 right-3"
            style={{
              color: backgroundColor,
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
 * DashboardPostNav 컴포넌트는 최근 포스트 목록을 렌더링합니다.
 */
function DashboardPostNav() {
  // 현재 활성화된 포스트 ID를 추적 - 첫 번째 포스트의 ID로 초기화
  const [activePostId, setActivePostId] = useState(
    recentPosts.length > 0 ? recentPosts[0].id : null
  );

  // 항목 클릭 핸들러
  const handleItemClick = (postId) => {
    // 이미 활성화된 항목을 다시 클릭하면 아무 동작도 하지 않음
    if (activePostId === postId) return;

    // 다른 항목을 클릭하면 해당 항목을 활성화
    setActivePostId(postId);
  };

  return (
    <nav className="rounded-lg p-4">
      <ul className="">
        {recentPosts.slice(0, 5).map((post) => (
          <DashboardPostNavItem
            key={post.id}
            post={post}
            isActive={activePostId === post.id}
            onItemClick={() => handleItemClick(post.id)}
          />
        ))}
      </ul>
    </nav>
  );
}

export default DashboardPostNav;
