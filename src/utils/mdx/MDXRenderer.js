"use client"; // 이 파일은 클라이언트 컴포넌트임을 명시합니다.

import { MDXRemote } from "next-mdx-remote";
import { useState, useEffect, useRef, useMemo } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import React from "react";
import remarkParse from "remark-parse";
import { serialize } from "next-mdx-remote/serialize";
import { Callout } from "@/components/shadcn/callout";
import { headingComponents } from "./mdx-ui/text/Heading";
import CalloutComponent, {
  processContent,
  processCallouts,
} from "./mdx-ui/text/Callout";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageComponent from "./mdx-ui/img/Image";
import { tableComponents } from "./mdx-ui/text/Table";
import { codeComponents } from "./mdx-ui/code/CodeBlock";

// 에러 경계 컴포넌트
class MDXErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("MDX 렌더링 오류:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error
        ? this.state.error.toString()
        : "알 수 없는 오류";
      const isVariableError = errorMessage.includes("is not defined");

      return (
        <div className="border border-destructive/50 bg-destructive/10 p-4 rounded-lg my-4">
          <h3 className="text-destructive font-semibold mb-2">
            {isVariableError ? "콘텐츠 변수 오류" : "콘텐츠 렌더링 오류"}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {isVariableError
              ? "MDX 콘텐츠에서 정의되지 않은 변수가 참조되고 있습니다."
              : "MDX 콘텐츠를 렌더링하는 중 오류가 발생했습니다."}
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            오류: {errorMessage}
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground">
                {isVariableError ? "해결 방법" : "오류 세부사항"}
              </summary>
              {isVariableError ? (
                <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                  <li>
                    코드 블록에 적절한 언어 태그(```javascript)를 추가하세요
                  </li>
                  <li>
                    변수명이 텍스트에서 단독으로 사용되지 않도록 백틱(`)으로
                    감싸세요
                  </li>
                  <li>
                    중괄호 객체 구문은 백틱으로 감싸서 인라인 코드로 표시하세요
                  </li>
                  <li>MDX 구문이 올바른지 확인하세요</li>
                </ul>
              ) : (
                <pre className="mt-2 p-2 bg-muted rounded overflow-auto">
                  {errorMessage}
                  {this.state.errorInfo &&
                    this.state.errorInfo.componentStack && (
                      <>
                        {"\n\n컴포넌트 스택:"}
                        {this.state.errorInfo.componentStack}
                      </>
                    )}
                </pre>
              )}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// MDX 처리를 위한 설정
const mdxOptions = {
  remarkPlugins: [
    remarkParse,
    [remarkGfm, { tableCellPadding: true, tablePipeAlign: true }],
    remarkMath,
  ],
  rehypePlugins: [rehypePrism, rehypeKatex],
  format: "mdx",
};

// 토글(아코디언) 컴포넌트
const CustomAccordion = ({ summaryContent, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  // summaryContent 유효성 검사
  if (!summaryContent) {
    return (
      <div className="border border-border rounded-md my-6 p-4">
        <div className="text-muted-foreground">잘못된 아코디언 구성</div>
        {children}
      </div>
    );
  }

  return (
    <div className="border border-border rounded-md my-6 overflow-hidden shadow-md">
      <div className="flex justify-between items-center w-full px-5 py-4 text-left text-foreground font-medium bg-accent/20">
        <span className="text-md font-semibold">{summaryContent}</span>
        <button
          className="focus:outline-none bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md flex items-center gap-1 text-sm transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "접기" : "펼치기"}
          aria-expanded={isOpen}
        >
          {isOpen ? "접기" : "펼치기"}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <div className="p-5 bg-background border-t border-border">
          {children}
        </div>
      </div>
    </div>
  );
};

// MDX를 미리 처리하는 함수
const extractDetailsContent = (content) => {
  if (!content || typeof content !== "string") return content;

  try {
    const detailsRegex =
      /<details>([\s\S]*?)<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;

    return content.replace(detailsRegex, (match, _, summary, content) => {
      const summaryText = summary.trim();
      const contentText = content.trim();

      if (!summaryText) {
        return `<div className="border border-border rounded-md my-6 p-4">${contentText}</div>`;
      }

      return `<CustomAccordion summaryContent="${summaryText}">${contentText}</CustomAccordion>`;
    });
  } catch (error) {
    console.error("details 태그 처리 중 오류:", error);
    return content;
  }
};

// 안전한 MDX 콘텐츠 전처리 함수
const sanitizeMarkdownContent = (content) => {
  if (!content || typeof content !== "string") return content;

  try {
    // 잠재적으로 문제가 될 수 있는 JavaScript 변수 참조를 안전하게 처리
    let processedContent = content;

    // 코드 블록이 아닌 영역에서 단독으로 사용된 변수명들을 이스케이프
    const dangerousVariables = [
      "url",
      "path",
      "data",
      "error",
      "response",
      "result",
      "config",
      "options",
      "params",
      "query",
      "body",
      "headers",
      "method",
    ];

    dangerousVariables.forEach((varName) => {
      // 백틱 코드 블록이나 인라인 코드가 아닌 곳에서 단독으로 사용된 변수를 찾아 이스케이프
      const regex = new RegExp(
        `(?<![\`\`\`].*?)(?<![\`])\\b${varName}\\b(?![\`])(?!.*?[\`\`\`])`,
        "g"
      );

      // 단, JavaScript/TypeScript 코드 블록 내부는 제외
      const codeBlockRegex =
        /```(?:javascript|js|typescript|ts|jsx|tsx)[\s\S]*?```/g;
      const inlineCodeRegex = /`[^`]*`/g;

      let matches = [];
      let match;

      // 코드 블록들의 위치를 기록
      while ((match = codeBlockRegex.exec(processedContent)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      // 인라인 코드들의 위치를 기록
      const tempContent = processedContent.replace(codeBlockRegex, "");
      while ((match = inlineCodeRegex.exec(tempContent)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      // 정렬
      matches.sort((a, b) => a.start - b.start);
    });

    return processedContent;
  } catch (error) {
    console.error("마크다운 콘텐츠 전처리 중 오류:", error);
    return content;
  }
};

// 각주 컴포넌트
const FootnoteReference = ({ id }) => {
  if (!id) return null;

  return (
    <sup id={`footnote-ref-${id}`} className="text-primary">
      <a href={`#footnote-${id}`}>[{id}]</a>
    </sup>
  );
};

// 안전한 수학 컴포넌트
const SafeBlockMath = ({ math, children }) => {
  try {
    const mathContent = math || String(children || "");
    if (!mathContent.trim()) return null;
    return <BlockMath math={mathContent} />;
  } catch (error) {
    console.error("수학식 렌더링 오류:", error);
    return (
      <code className="bg-muted px-2 py-1 rounded text-destructive">
        수학식 오류: {math || children}
      </code>
    );
  }
};

const SafeInlineMath = ({ math, children }) => {
  try {
    const mathContent = math || String(children || "");
    if (!mathContent.trim()) return null;
    return <InlineMath math={mathContent} />;
  } catch (error) {
    console.error("인라인 수학식 렌더링 오류:", error);
    return (
      <code className="bg-muted px-1 rounded text-destructive">
        {math || children}
      </code>
    );
  }
};

// MDX에서 사용할 수 있는 커스텀 컴포넌트들
const components = {
  ...headingComponents,
  ...tableComponents,
  ...codeComponents,

  // 안전한 수학식 처리
  BlockMath: SafeBlockMath,
  InlineMath: SafeInlineMath,
  math: SafeBlockMath,
  inlineMath: SafeInlineMath,

  // 체크박스 리스트 처리
  ul: (props) => {
    try {
      const isTaskList =
        props.className && props.className.includes("contains-task-list");
      return (
        <ul
          className={`${
            isTaskList ? "list-none" : "list-disc"
          } pl-5 my-4 space-y-1`}
          {...props}
        />
      );
    } catch (error) {
      console.error("ul 렌더링 오류:", error);
      return <ul className="list-disc pl-5 my-4 space-y-1" {...props} />;
    }
  },

  ol: (props) => <ol className="list-decimal pl-5 my-4 space-y-1" {...props} />,

  li: (props) => {
    try {
      if (props.className && props.className.includes("task-list-item")) {
        return <li className="flex items-center my-1 pl-0" {...props} />;
      }
      return <li className="my-1" {...props} />;
    } catch (error) {
      console.error("li 렌더링 오류:", error);
      return <li className="my-1" {...props} />;
    }
  },

  // 안전한 체크박스
  input: (props) => {
    try {
      if (props.type === "checkbox") {
        return (
          <div
            className={`w-4 h-4 mr-2 border rounded border-border inline-flex items-center justify-center
            ${props.checked ? "bg-primary border-primary" : "bg-background"}`}
          >
            {props.checked && (
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
        );
      }
      return <input {...props} />;
    } catch (error) {
      console.error("input 렌더링 오류:", error);
      return <input {...props} />;
    }
  },

  // 기본 텍스트 요소들
  blockquote: (props) => (
    <blockquote
      className="pl-4 border-l-4 border-muted italic text-muted-foreground my-4"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  a: (props) => {
    try {
      return <a className="text-primary hover:underline" {...props} />;
    } catch (error) {
      console.error("링크 렌더링 오류:", error);
      return <span className="text-destructive">[링크 오류]</span>;
    }
  },
  hr: () => <hr className="my-6 border-t border-border" />,

  // 안전한 이미지 컴포넌트
  img: (props) => {
    try {
      return <ImageComponent {...props} />;
    } catch (error) {
      console.error("이미지 렌더링 오류:", error);
      return (
        <div className="border border-muted rounded-md p-4 my-4 text-center text-muted-foreground">
          <p>이미지를 로드할 수 없습니다</p>
          {props.alt && <p className="text-sm">({props.alt})</p>}
        </div>
      );
    }
  },

  mark: (props) => <mark className="bg-primary/20 px-1 rounded" {...props} />,
  kbd: (props) => (
    <kbd
      className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono"
      {...props}
    />
  ),

  // 커스텀 컴포넌트들
  CustomAccordion,

  details: ({ children }) => {
    try {
      const childrenArray = React.Children.toArray(children);
      let summary = "상세 보기";
      let content = children;

      if (childrenArray.length > 0 && childrenArray[0].type === "summary") {
        summary = childrenArray[0].props.children;
        content = childrenArray.slice(1);
      }

      return (
        <CustomAccordion summaryContent={summary}>{content}</CustomAccordion>
      );
    } catch (error) {
      console.error("details 렌더링 오류:", error);
      return (
        <div className="border border-border rounded-md p-4 my-4">
          {children}
        </div>
      );
    }
  },

  summary: () => null,
  FootnoteReference,
  Callout: CalloutComponent,
  UICallout: Callout,

  // 안전한 div 처리
  div: (props) => {
    try {
      if (props.className && props.className.includes("callout")) {
        const classNames = props.className.split(" ");
        const typeClass = classNames.find((cls) => cls.startsWith("callout-"));
        const type = typeClass ? typeClass.replace("callout-", "") : "info";

        return (
          <CalloutComponent type={type}>{props.children}</CalloutComponent>
        );
      }
      return <div {...props} />;
    } catch (error) {
      console.error("div 렌더링 오류:", error);
      return <div {...props} />;
    }
  },

  // 정의 목록
  dl: (props) => <dl className="mt-4 mb-6" {...props} />,
  dt: (props) => <dt className="font-bold text-foreground mt-2" {...props} />,
  dd: (props) => <dd className="ml-4 text-muted-foreground mb-2" {...props} />,

  // 안전한 단락 처리
  p: (props) => {
    try {
      const content = props.children;

      if (typeof content === "string") {
        const processed = processContent(content);
        if (processed !== content) {
          return processed;
        }
      }

      return <p className="my-4" {...props} />;
    } catch (error) {
      console.error("단락 렌더링 오류:", error);
      return <p className="my-4" {...props} />;
    }
  },
};

export default function MDXRenderer({ source }) {
  const [processedSource, setProcessedSource] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 상태 추적
  useEffect(() => {
    setMounted(true);
  }, []);

  // source 유효성 검사 강화
  const isValidSource = useMemo(() => {
    if (!source) return false;

    if (typeof source === "object") {
      return source.compiledSource || source.mdxSource || source.frontmatter;
    }

    if (typeof source === "string") {
      return source.trim().length > 0;
    }

    return false;
  }, [source]);

  useEffect(() => {
    if (!mounted) return;

    if (!isValidSource) {
      setError("유효하지 않은 MDX 소스입니다.");
      return;
    }

    if (typeof source === "string") {
      setIsProcessing(true);
      setError(null);

      // Promise 체인을 더 안전하게 처리
      const processContent = async () => {
        try {
          // 1. 마크다운 콘텐츠 전처리 (변수 이름 충돌 방지)
          const sanitizedContent = sanitizeMarkdownContent(source);

          // 2. details/summary 태그 처리
          const processedDetailsContent =
            extractDetailsContent(sanitizedContent);

          // 3. 콜아웃 처리
          const processedContent = processCallouts(processedDetailsContent);

          const result = await serialize(processedContent, {
            mdxOptions,
            parseFrontmatter: true,
          });

          // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
          if (mounted) {
            setProcessedSource(result);
            setError(null);
          }
        } catch (err) {
          console.error("MDX 처리 오류:", err);
          if (mounted) {
            if (err.message && err.message.includes("is not defined")) {
              setError(
                `MDX 변수 오류가 발생했습니다. 코드 블록의 구문을 확인해주세요: ${err.message}`
              );
            } else {
              setError(
                `MDX 처리 중 오류가 발생했습니다: ${
                  err.message || "알 수 없는 오류"
                }`
              );
            }
          }
        } finally {
          if (mounted) {
            setIsProcessing(false);
          }
        }
      };

      processContent();
    } else if (typeof source === "object") {
      // 객체 타입 소스 검증
      if (source.compiledSource) {
        setProcessedSource(source);
      } else {
        setError("올바르지 않은 MDX 객체 형식입니다.");
      }
    }
  }, [source, isValidSource, mounted]);

  // 마운트되지 않은 상태에서는 로딩 표시
  if (!mounted) {
    return (
      <div className="my-8 p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
        <p className="text-sm text-muted-foreground">초기화 중...</p>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (!isValidSource || error) {
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-lg my-4">
        <h3 className="text-destructive font-semibold mb-2">콘텐츠 오류</h3>
        <p className="text-sm text-muted-foreground">
          {error || "MDX 콘텐츠를 찾을 수 없습니다."}
        </p>
        {process.env.NODE_ENV === "development" && source && (
          <details className="mt-3 text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              디버그 정보
            </summary>
            <pre className="mt-2 p-2 bg-muted rounded overflow-auto max-h-32">
              {JSON.stringify(
                {
                  sourceType: typeof source,
                  sourceKeys:
                    typeof source === "object" ? Object.keys(source || {}) : [],
                  sourceLength:
                    typeof source === "string" ? source.length : "N/A",
                  isValidSource,
                },
                null,
                2
              )}
            </pre>
          </details>
        )}
      </div>
    );
  }

  // 로딩 상태
  if (isProcessing) {
    return (
      <div className="my-8 p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
        <p className="text-sm text-muted-foreground">콘텐츠를 처리하는 중...</p>
      </div>
    );
  }

  // 실제 MDX 렌더링
  const sourceToRender = processedSource || source;

  if (!sourceToRender) {
    return (
      <div className="border border-muted rounded-lg p-6 my-4 text-center text-muted-foreground">
        렌더링할 콘텐츠가 없습니다.
      </div>
    );
  }

  // MDXRemote 렌더링을 더 안전하게 래핑
  try {
    return (
      <MDXErrorBoundary>
        <div className="mdx-content" suppressHydrationWarning>
          <MDXRemote
            {...sourceToRender}
            components={components}
            options={{ mdxOptions, parseFrontmatter: true }}
          />
        </div>
      </MDXErrorBoundary>
    );
  } catch (renderError) {
    console.error("MDX 렌더링 직접 오류:", renderError);
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-lg my-4">
        <h3 className="text-destructive font-semibold mb-2">렌더링 실패</h3>
        <p className="text-sm text-muted-foreground">
          MDX 콘텐츠를 렌더링할 수 없습니다.
        </p>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-3 text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              오류 정보
            </summary>
            <pre className="mt-2 p-2 bg-muted rounded overflow-auto max-h-32">
              {renderError.toString()}
            </pre>
          </details>
        )}
      </div>
    );
  }
}
