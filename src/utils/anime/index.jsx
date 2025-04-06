"use client";

import anime from "animejs";

/**
 * 애니메이션 설정을 위한 공통 옵션 객체
 */
const presets = {
  clipInsets: {
    hidden: "inset(0 0 100% 0)",
    visible: "inset(0 0 0 0)",
  },
  translateY: {
    hidden: "100%",
    visible: "0%",
  },
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easings: {
    smooth: "easeInOutQuad",
    spring: "spring(1, 80, 10, 0)",
  },
};

/**
 * animation 객체
 * - 개별/복합 애니메이션 함수를 포함합니다.
 */
export const animation = {
  /**
   * 텍스트가 위로 올라오면서 살짝 회전하여 나타나는 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   */
  textRotateAndShow: (targets) =>
    anime({
      targets,
      translateY: [50, 0],
      opacity: [0, 1],
      rotate: [-10, 0],
      transformOrigin: "0% 50%",
      easing: "easeOutQuad",
      duration: 1000,
    }),

  /**
   * 텍스트가 아래로 내려가면서 살짝 회전하여 사라지는 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   */
  textRotateAndHide: (targets) =>
    anime({
      targets,
      translateY: [0, 50],
      opacity: [1, 0],
      rotate: [0, -10],
      transformOrigin: "0% 50%",
      easing: "easeOutQuad",
      duration: 1000,
    }),

  /**
   * 요소를 X축으로 이동시키며 사라지게 하는 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   * @param {string|number} translateX - 이동할 X축 거리
   */
  translateX: (targets, translateX) =>
    anime({
      targets,
      translateX: [0, translateX],
      opacity: [1, 0],
      easing: "easeOutQuad",
      duration: 1000,
    }),

  /**
   * 마우스 오버 시, 화살표가 오른쪽으로 살짝 이동하는 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   * @param {number} [distance=3] - 이동 거리
   */
  arrowHoverRight: (targets, distance = 3) => {
    if (!targets) return;
    return anime({
      targets,
      translateX: [0, distance],
      easing: presets.easings.spring,
      duration: presets.durations.fast,
    });
  },

  /**
   * 마우스 오버 해제 시, 화살표가 원 위치로 복귀하는 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   */
  arrowHoverReset: (targets) => {
    if (!targets) return;
    return anime({
      targets,
      translateX: [anime.get(targets, "translateX"), 0],
      easing: presets.easings.spring,
      duration: presets.durations.fast,
    });
  },

  /**
   * 요소를 Y축으로 이동시키는 범용 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   * @param {object} options
   * @param {string} options.from - 시작 위치
   * @param {string} options.to - 끝 위치
   * @param {number} [options.duration=presets.durations.normal] - 재생 시간
   * @param {string} [options.easing=presets.easings.smooth] - 이징 함수
   * @param {Function} [options.complete] - 완료 후 콜백
   */
  translateY: (
    targets,
    {
      from,
      to,
      duration = presets.durations.normal,
      easing = presets.easings.smooth,
      complete,
    }
  ) =>
    anime({
      targets,
      translateY: [from, to],
      duration,
      easing,
      complete,
    }),

  /**
   * 요소의 clipPath 값을 변경하는 범용 애니메이션
   * @param {anime.AnimeTarget} targets - 애니메이션을 적용할 대상
   * @param {object} options
   * @param {string} options.from - 시작 clipPath
   * @param {string} options.to - 종료 clipPath
   * @param {number} [options.duration=presets.durations.normal] - 재생 시간
   * @param {string} [options.easing=presets.easings.smooth] - 이징 함수
   */
  clipPath: (
    targets,
    {
      from,
      to,
      duration = presets.durations.normal,
      easing = presets.easings.smooth,
    }
  ) =>
    anime({
      targets,
      clipPath: [from, to],
      duration,
      easing,
    }),

  /**
   * 복합 애니메이션 객체 (대시보드 아이템을 활성화/비활성화/리셋)
   */
  dashboardItem: {
    /**
     * 대시보드 아이템 활성화 애니메이션
     * @param {object} refs
     * @param {object} refs.bgRef - 배경 요소 레퍼런스
     * @param {object} refs.textRef - 텍스트 요소 레퍼런스
     * @param {object} refs.countRef - 카운트 요소 레퍼런스
     */
    activate: (refs) => {
      const { bgRef, textRef, countRef } = refs;

      if (bgRef?.current)
        animation.translateY(bgRef.current, {
          from: presets.translateY.hidden,
          to: presets.translateY.visible,
        });

      if (textRef?.current)
        animation.clipPath(textRef.current, {
          from: presets.clipInsets.hidden,
          to: presets.clipInsets.visible,
        });

      if (countRef?.current)
        animation.clipPath(countRef.current, {
          from: presets.clipInsets.hidden,
          to: presets.clipInsets.visible,
        });
    },

    /**
     * 대시보드 아이템 비활성화 애니메이션
     * @param {object} refs
     * @param {object} refs.bgRef - 배경 요소 레퍼런스
     * @param {object} refs.textRef - 텍스트 요소 레퍼런스
     * @param {object} refs.countRef - 카운트 요소 레퍼런스
     */
    deactivate: (refs) => {
      const { bgRef, textRef, countRef } = refs;

      if (bgRef?.current)
        animation.translateY(bgRef.current, {
          from: presets.translateY.visible,
          to: presets.translateY.hidden,
          complete: () => {
            if (bgRef.current) {
              bgRef.current.style.transform = `translateY(${presets.translateY.hidden})`;
            }
          },
        });

      if (textRef?.current)
        animation.clipPath(textRef.current, {
          from: presets.clipInsets.visible,
          to: presets.clipInsets.hidden,
        });

      if (countRef?.current)
        animation.clipPath(countRef.current, {
          from: presets.clipInsets.visible,
          to: presets.clipInsets.hidden,
        });
    },

    /**
     * 대시보드 아이템 초기화
     * @param {object} refs
     * @param {object} refs.bgRef - 배경 요소 레퍼런스
     * @param {object} refs.textRef - 텍스트 요소 레퍼런스
     * @param {object} refs.countRef - 카운트 요소 레퍼런스
     */
    reset: (refs) => {
      const { bgRef, textRef, countRef } = refs;

      if (bgRef?.current) {
        bgRef.current.style.transform = `translateY(${presets.translateY.hidden})`;
      }
      if (textRef?.current) {
        textRef.current.style.clipPath = presets.clipInsets.hidden;
      }
      if (countRef?.current) {
        countRef.current.style.clipPath = presets.clipInsets.hidden;
      }
    },
  },
};
