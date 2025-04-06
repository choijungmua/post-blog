import React from "react";
import { Callout as UICallout } from "@/components/shadcn/callout";

// 텍스트 기반 콜아웃 파서
export const processContent = (content) => {
  if (!content || typeof content !== "string") return content;

  // 콜아웃 패턴 감지: 콜아웃 종류: 내용
  const calloutRegex = /^(정보|주의|위험|팁|참고|성공):\s*(.*)/i;

  const match = content.match(calloutRegex);
  if (!match) return content;

  const typeMap = {
    정보: "info",
    주의: "warning",
    위험: "error",
    팁: "tip",
    참고: "note",
    성공: "success",
  };

  const type = typeMap[match[1]] || "info";
  const calloutContent = match[2];

  return <UICallout type={type}>{calloutContent}</UICallout>;
};

// 콜아웃 렌더링을 위한 사용자 정의 처리기
export function processCallouts(content) {
  if (!content || typeof content !== "string") return content;

  // 콜아웃 패턴: > [!NOTE|TIP|WARNING|IMPORTANT|CAUTION]
  const regex =
    /^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO)\]([\s\S]*?)(?=^>|$)/gm;

  return content.replace(regex, (match, type, text) => {
    const typeMap = {
      NOTE: "note",
      TIP: "tip",
      WARNING: "warning",
      IMPORTANT: "info",
      CAUTION: "error",
      INFO: "info",
    };

    const mdxType = typeMap[type] || "info";
    return `<UICallout type="${mdxType}">${text.trim()}</UICallout>`;
  });
}

// CalloutComponent 컴포넌트 - MDX에서 직접 사용할 수 있는 컴포넌트
export const CalloutComponent = ({ type = "info", children }) => {
  return <UICallout type={type}>{children}</UICallout>;
};

export default CalloutComponent;
