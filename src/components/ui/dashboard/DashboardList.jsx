"use client";
import React, { useRef, useEffect, useState } from "react";
import { animation } from "@/lib/anime";

function DashboardList() {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const containerRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const checkScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // 스크롤 위치가 전체 문서 높이의 20% 이상일 때 애니메이션 실행
      if (scrollY > documentHeight * 0.2) {
        if (!animated) {
          animation.textRotateAndShow(titleRef.current);
          animation.textRotateAndShow(subTitleRef.current);
          setAnimated(true);
        }
      } else {
        // 스크롤을 위로 올려서 threshold보다 위에 있을 때 애니메이션 사라짐 효과
        if (animated) {
          animation.textRotateAndHide(titleRef.current);
          animation.textRotateAndHide(subTitleRef.current);
          setAnimated(false);
        }
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [animated]);

  return (
    <div className="pt-48 mx-auto" ref={containerRef}>
      <div className="overflow-hidden">
        <h1
          ref={titleRef}
          className="text-6xl text-center font-black opacity-0"
        >
          POST LIST
        </h1>
      </div>
      <div className="overflow-hidden mt-4">
        <h1
          ref={subTitleRef}
          className="text-xl text-center font-semibold opacity-0"
        >
          Stay ahead by quickly absorbing the latest insights and trends.
        </h1>
      </div>
    </div>
  );
}

export default DashboardList;
