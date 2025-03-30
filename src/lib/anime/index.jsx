"use client";

import anime from "animejs";

export const animation = {
  textRotateAndShow: (targets) => {
    anime({
      targets: targets,
      translateY: [50, 0],
      opacity: [0, 1],
      rotate: [-10, 0],
      transformOrigin: "0% 50%", // 좌측 끝을 기준으로 회전
      easing: "easeOutQuad",
      duration: 1000,
    });
  },
  textRotateAndHide: (targets) => {
    anime({
      targets: targets,
      translateY: [0, 50],
      opacity: [1, 0],
      rotate: [0, -10],
      transformOrigin: "0% 50%", // 좌측 끝을 기준으로 회전
      easing: "easeOutQuad",
      duration: 1000,
    });
  },
  TranslateX: (targets, translateX) => {
    anime({
      targets: targets,
      translateX: [0, translateX],
      opacity: [1, 0],
      easing: "easeOutQuad",
      duration: 1000,
    });
  },
  // 호버 시 화살표 이동 애니메이션
  arrowHoverRight: (targets, distance = 3) => {
    if (!targets) return; // targets가 null이나 undefined일 때 오류 방지

    anime({
      targets: targets,
      translateX: [0, distance],
      easing: "spring(1, 80, 10, 0)", // 스프링 효과 적용하여 자연스러운 이동
      duration: 400,
    });
  },
  // 호버 종료 시 화살표 원위치 애니메이션
  arrowHoverReset: (targets) => {
    if (!targets) return; // targets가 null이나 undefined일 때 오류 방지

    anime({
      targets: targets,
      translateX: [anime.get(targets, "translateX"), 0],
      easing: "spring(1, 80, 10, 0)", // 스프링 효과로 자연스러운 복귀
      duration: 400,
    });
  },
};
