import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";

// 코드 블록 컴포넌트
export const Pre = (props) => (
  <div className="my-6 overflow-hidden" {...props} />
);

export const Code = ({ className, children, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const match = /language-(\w+)/.exec(className || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // 코드 블록에는 어두운 테마를 유지 (가독성을 위해)
  return match ? (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 폴더 탭 부분 */}
      <div
        className={`relative z-10 inline-block bg-[#1e1e1e] text-gray-300 font-mono rounded-t-md 
          border-t border-l border-r border-[#333] ml-0 transition-all duration-300 ease-in-out
          ${
            isHovered ? "px-8 py-2 text-sm font-medium" : "px-6 py-1.5 text-xs"
          }`}
      >
        {match[1]}
      </div>

      {/* 코드 블록 본문 */}
      <div className="relative border border-[#333] rounded-md rounded-tl-none bg-[#1e1e1e] shadow-lg">
        {/* 복사 버튼 */}
        <button
          onClick={handleCopy}
          className={`absolute right-4 top-4 z-20 p-1.5 rounded-md transition-all duration-200 
            ${isHovered ? "opacity-100" : "opacity-0"} 
            hover:bg-[#333] text-gray-300 hover:text-primary`}
          aria-label="복사하기"
        >
          {isCopied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <ClipboardCopy size={16} />
          )}
        </button>

        <SyntaxHighlighter
          language={match[1]}
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: "#1e1e1e",
            padding: "1rem",
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  ) : (
    <code
      className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded-md text-sm"
      {...props}
    >
      {children}
    </code>
  );
};

// 코드 컴포넌트를 객체로 내보내기
export const codeComponents = {
  pre: Pre,
  code: Code,
};

export default codeComponents;
