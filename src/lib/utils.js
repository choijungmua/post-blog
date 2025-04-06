import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * tailwind 클래스를 조건부로 결합하고 충돌을 해결하는 유틸리티 함수
 * @param {...string} inputs - 조건부로 적용할 클래스
 * @returns {string} 병합된 클래스 문자열
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * HTML 문자열에서 텍스트만 추출하는 함수
 * @param {string} html - HTML 문자열
 * @returns {string} 순수 텍스트
 */
export function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

/**
 * 텍스트를 지정된 길이로 자르는 함수
 * @param {string} text - 원본 텍스트
 * @param {number} length - 최대 길이
 * @returns {string} 잘린 텍스트
 */
export function truncateText(text, length = 100) {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * 날짜를 포맷팅하는 함수
 * @param {string|Date} date - 포맷팅할 날짜
 * @param {Object} options - Intl.DateTimeFormat 옵션
 * @returns {string} 포맷팅된 날짜 문자열
 */
export function formatDate(date, options = {}) {
  if (!date) return "";

  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat("ko-KR", mergedOptions).format(
    typeof date === "string" ? new Date(date) : date
  );
}

/**
 * 하위 경로가 현재 활성 경로인지 확인하는 함수
 * @param {string} pathname - 현재 경로
 * @param {string} subpath - 확인할 하위 경로
 * @param {boolean} exact - 정확한 일치 여부
 * @returns {boolean} 활성 상태 여부
 */
export function isActivePath(pathname, subpath, exact = false) {
  if (exact) return pathname === subpath;
  return pathname.startsWith(subpath);
}
