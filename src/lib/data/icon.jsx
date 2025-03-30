import * as LucideIcons from "lucide-react";

// Lucide 라이브러리에서 모든 아이콘 컴포넌트 내보내기
export const icons = { ...LucideIcons };

// 아이콘 이름만 포함하는 배열 (필요한 경우)
export const iconNames = Object.keys(icons).filter(
  // LucideIcon과 같은 특수 타입을 제외하고 실제 아이콘만 포함
  (key) => typeof icons[key] === "function" && key !== "createLucideIcon"
);
