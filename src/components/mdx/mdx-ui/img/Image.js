import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/shadcn/tooltip";

// 이미지 컴포넌트
export const ImageComponent = ({ alt, title, ...props }) => {
  // 툴팁에 표시할 텍스트 (title 속성이 있으면 title 사용, 없으면 alt 사용)
  const tooltipText = title || alt;

  // 툴팁이 필요한 경우 (title이나 alt가 있는 경우)
  if (tooltipText) {
    return (
      <span className="flex justify-center rounded-md items-center overflow-hidden cursor-pointer">
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              className="max-w-full h-auto my-4 rounded-md object-contain hover:scale-105 transition-all duration-300"
              alt={alt || ""}
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </span>
    );
  }

  // 툴팁이 필요 없는 경우 (title이나 alt가 없는 경우)
  return (
    <span className="flex justify-center rounded-md items-center overflow-hidden cursor-pointer">
      <img
        className="max-w-full h-auto my-4 rounded-md object-contain hover:scale-105 transition-all duration-300"
        alt={alt || ""}
        {...props}
      />
    </span>
  );
};

export default ImageComponent;
