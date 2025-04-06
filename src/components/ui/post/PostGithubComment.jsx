"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

function PostGithubComment({
  repo,
  theme: commentTheme,
  issueTerm = "pathname",
}) {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const loadComments = () => {
      // GitHub 댓글 스크립트가 이미 로드되었는지 확인
      const commentsScript = document.getElementById("github-comments");
      if (commentsScript) {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        const scriptEl = document.createElement("script");
        scriptEl.async = true;
        scriptEl.src = "https://utteranc.es/client.js";
        scriptEl.setAttribute("repo", repo);
        scriptEl.setAttribute("issue-term", issueTerm);
        scriptEl.setAttribute(
          "theme",
          commentTheme || (theme === "dark" ? "github-dark" : "github-light")
        );
        scriptEl.setAttribute("crossorigin", "anonymous");

        if (containerRef.current) {
          containerRef.current.appendChild(scriptEl);
        }
      } else {
        // 최초 로드 시
        const scriptEl = document.createElement("script");
        scriptEl.id = "github-comments";
        scriptEl.async = true;
        scriptEl.src = "https://utteranc.es/client.js";
        scriptEl.setAttribute("repo", repo);
        scriptEl.setAttribute("issue-term", issueTerm);
        scriptEl.setAttribute(
          "theme",
          commentTheme || (theme === "dark" ? "github-dark" : "github-light")
        );
        scriptEl.setAttribute("crossorigin", "anonymous");

        if (containerRef.current) {
          containerRef.current.appendChild(scriptEl);
        }
      }
    };

    loadComments();

    // 테마 변경 시 댓글 재로드
    return () => {
      const commentsScript = document.getElementById("github-comments");
      if (commentsScript) {
        commentsScript.remove();
      }
    };
  }, [repo, issueTerm, theme, commentTheme]);

  return (
    <section className="mt-10 w-full">
      <div className="utterances-frame" ref={containerRef} />
    </section>
  );
}

export default PostGithubComment;
