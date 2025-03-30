"use client";

import { useState, useEffect } from "react";
import MDXRenderer from "@/components/mdx/MDXRenderer";
import useSWR from "swr";

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
    revalidateOnFocus: false, // 페이지 포커스 시 재검증 비활성화
    revalidateOnReconnect: false, // 네트워크 재연결 시 재검증 비활성화
    dedupingInterval: 1000 * 60 * 60, // 1시간 동안 중복 요청 방지
  });

  // 캐시된 데이터가 있으면 사용, 없으면 props의 데이터 사용
  useEffect(() => {
    if (data && data !== cachedData) {
      setCachedData(data);
      // 로컬 스토리지에도 저장 (선택적)
      try {
        localStorage.setItem(`post-${postId}`, JSON.stringify(data));
        console.log(`포스트 ${postId} 캐시에 저장됨`);
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
          const parsedData = JSON.parse(storedData);
          console.log(`포스트 ${postId} 캐시에서 로드됨`);
          setCachedData(parsedData);
        }
      } catch (error) {
        console.error("로컬 스토리지 로드 실패:", error);
      }
    }
  }, [postId]);

  return (
    <article className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{cachedData.title}</h1>
      <div className="text-gray-500 mb-4">{cachedData.date}</div>
      <div className="prose prose-lg mx-auto max-w-3xl">
        <MDXRenderer source={cachedData.mdxSource} />
      </div>
    </article>
  );
}
