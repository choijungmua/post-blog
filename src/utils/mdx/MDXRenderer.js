"use client"; // 이 파일은 클라이언트 컴포넌트임을 명시합니다.

import { MDXRemote } from "next-mdx-remote";
import { useState, useEffect, useRef } from "react";
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

  // 컴포넌트가 마운트되거나 children이 변경될 때 내용 높이 계산
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

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

  // details와 summary 태그 패턴을 찾아서 커스텀 컴포넌트로 변환
  const detailsRegex =
    /<details>([\s\S]*?)<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;

  return content.replace(detailsRegex, (match, _, summary, content) => {
    return `<CustomAccordion summaryContent="${summary.trim()}">${content.trim()}</CustomAccordion>`;
  });
};

// 각주 컴포넌트
const FootnoteReference = ({ id }) => (
  <sup id={`footnote-ref-${id}`} className="text-primary">
    <a href={`#footnote-${id}`}>[{id}]</a>
  </sup>
);

// MDX에서 사용할 수 있는 커스텀 컴포넌트들
const components = {
  // 제목 태그(h1-h6)를 HeadingComponents에서 가져와 사용
  ...headingComponents,

  // 테이블 컴포넌트 추가
  ...tableComponents,

  // 코드 컴포넌트 추가
  ...codeComponents,

  // 수학식 처리
  BlockMath: ({ math }) => <BlockMath math={math} />,
  InlineMath: ({ math }) => <InlineMath math={math} />,
  math: ({ children }) => <BlockMath math={String(children)} />,
  inlineMath: ({ children }) => <InlineMath math={String(children)} />,

  // 체크박스 리스트 처리 개선
  ul: (props) => {
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
  },
  ol: (props) => <ol className="list-decimal pl-5 my-4 space-y-1" {...props} />,
  li: (props) => {
    if (props.className && props.className.includes("task-list-item")) {
      return <li className="flex items-center my-1 pl-0" {...props} />;
    }
    return <li className="my-1" {...props} />;
  },

  // 체크박스
  input: (props) => {
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
  },

  // 인용구
  blockquote: (props) => (
    <blockquote
      className="pl-4 border-l-4 border-muted italic text-muted-foreground my-4"
      {...props}
    />
  ),

  // 강조 텍스트
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,

  // 링크
  a: (props) => <a className="text-primary hover:underline" {...props} />,

  // 구분선
  hr: () => <hr className="my-6 border-t border-border" />,

  // 이미지 - 외부 컴포넌트 사용
  img: ImageComponent,

  // 마크
  mark: (props) => <mark className="bg-primary/20 px-1 rounded" {...props} />,

  // KBD
  kbd: (props) => (
    <kbd
      className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono"
      {...props}
    />
  ),

  // 커스텀 아코디언 컴포넌트
  CustomAccordion,

  // 기존 details와 summary 태그도 계속 지원
  details: ({ children }) => {
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
  },

  summary: () => null,

  // 각주 컴포넌트
  FootnoteReference,

  // 콜아웃 컴포넌트 등록
  Callout: CalloutComponent,
  UICallout: Callout,

  // div에 클래스를 적용할 수 있도록 처리
  div: (props) => {
    // 콜아웃 div 처리
    if (props.className && props.className.includes("callout")) {
      const classNames = props.className.split(" ");
      const typeClass = classNames.find((cls) => cls.startsWith("callout-"));
      const type = typeClass ? typeClass.replace("callout-", "") : "info";

      return <CalloutComponent type={type}>{props.children}</CalloutComponent>;
    }

    return <div {...props} />;
  },

  // 정의 목록
  dl: (props) => <dl className="mt-4 mb-6" {...props} />,
  dt: (props) => <dt className="font-bold text-foreground mt-2" {...props} />,
  dd: (props) => <dd className="ml-4 text-muted-foreground mb-2" {...props} />,

  // 단락(p) 요소 처리 추가/개선
  p: (props) => {
    const content = props.children;

    // 텍스트 기반 콜아웃 확인
    if (typeof content === "string") {
      const processed = processContent(content);
      if (processed !== content) {
        return processed;
      }
    }

    return <p className="my-4" {...props} />;
  },
};

export default function MDXRenderer({ source }) {
  // 클라이언트 사이드에서만 렌더링하기 위한 상태
  const [isClient, setIsClient] = useState(false);
  const [footnotes, setFootnotes] = useState([]);
  const [processedSource, setProcessedSource] = useState(null);

  // 마운트 후에만 렌더링
  useEffect(() => {
    setIsClient(true);

    // 각주 요소 찾기 (마운트 후)
    if (typeof document !== "undefined") {
      setTimeout(() => {
        const footnoteList = Array.from(
          document.querySelectorAll(".footnote-definition")
        ).map((el) => ({
          id: el.id.replace("footnote-", ""),
          text: el.textContent.replace(/^\[\d+\]:/, "").trim(),
        }));
        setFootnotes(footnoteList);
      }, 500);
    }
  }, []);

  // 수정된 source 처리 (원본 source가 문자열인 경우)
  useEffect(() => {
    if (typeof source === "string") {
      // details/summary 태그 처리를 포함한 전처리
      const processedDetailsContent = extractDetailsContent(source);
      const processedContent = processCallouts(processedDetailsContent);

      serialize(processedContent, {
        mdxOptions,
        parseFrontmatter: true,
      }).then(setProcessedSource);
    }
  }, [source]);

  // 서버 렌더링 단계에서는 최소한의 컨텐츠만 표시
  if (!isClient) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
        콘텐츠 로딩 중...
      </div>
    );
  }

  // 클라이언트 사이드에서만 MDX 렌더링
  return (
    <>
      {processedSource
        ? (() => {
            return (
              <MDXRemote
                {...processedSource}
                components={components}
                options={{ mdxOptions, parseFrontmatter: true }}
              />
            );
          })()
        : (() => {
            return (
              <MDXRemote
                {...source}
                components={components}
                options={{ mdxOptions, parseFrontmatter: true }}
              />
            );
          })()}

      {/* 각주 목록 렌더링 */}
      {footnotes.length > 0 && (
        <div className="mt-10 pt-6 border-t border-border">
          <h2 className="text-xl font-bold mb-4">각주</h2>
          {footnotes.map((note) => (
            <div
              key={note.id}
              id={`footnote-${note.id}`}
              className="text-sm mb-2"
            >
              <a
                href={`#footnote-ref-${note.id}`}
                className="text-primary mr-1"
              >
                ^{note.id}
              </a>{" "}
              {note.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
