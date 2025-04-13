"use client";

import { useState, useEffect } from "react";
import MDXRenderer from "@/utils/mdx/MDXRenderer";
import useSWR from "swr";
import Image from "next/image";

/**
 * 게시글 상세 화면 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.postData - 게시글 데이터 (제목, 날짜, MDX 소스 등)
 */
export default function PostDetailScreen({ postData }) {
  // 캐시에서 데이터를 가져오거나 캐시에 저장하는 로직
  const [cachedData, setCachedData] = useState(postData);
  const postId = postData?.id;

  // SWR을 사용하여 데이터 캐싱
  const fetcher = () => Promise.resolve(postData);
  const { data } = useSWR(postId ? `/posts/${postId}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000 * 60 * 60, // 1시간 동안 중복 요청 방지
  });

  // 캐시된 데이터 관리
  useEffect(() => {
    if (data && data !== cachedData) {
      setCachedData(data);
      try {
        localStorage.setItem(`post-${postId}`, JSON.stringify(data));
      } catch (error) {
        console.error("로컬 스토리지 저장 실패:", error);
      }
    }
  }, [data, cachedData, postId]);

  // 컴포넌트 마운트 시 로컬 스토리지 확인
  useEffect(() => {
    if (postId) {
      try {
        const storedData = localStorage.getItem(`post-${postId}`);
        if (storedData) {
          setCachedData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("로컬 스토리지 로드 실패:", error);
      }
    }
  }, [postId]);

  return (
    <article className="pt-0 px-4">
      {cachedData.thumbnail && (
        <div className="mb-8">
          <div className="relative aspect-[16/9] w-full rounded-lg shadow-md border border-border overflow-hidden">
            <Image
              src={cachedData.thumbnail}
              alt={cachedData.title}
              width={1200}
              height={675}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              className="object-cover hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      )}

      {cachedData.tags && cachedData.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {cachedData.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {cachedData.title}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="text-muted-foreground">{cachedData.date}</div>

          {/* 포스트 메뉴 추가 */}
          {/* <PostMenu
            postSlug={cachedData.id || cachedData.slug}
            postTitle={cachedData.title}
          /> */}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRenderer source={cachedData.mdxSource} />
        </div>
      </div>
    </article>
  );
}
