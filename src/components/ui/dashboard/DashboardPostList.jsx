import React from "react";
import Image from "next/image";
import { recentPosts } from "@/lib/data/siteData";

// 오류 없는 샘플 이미지로 업데이트 - 새로운 Unsplash 이미지 URL 사용
const sampleImages = [
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
];

// 기본 이미지 경로 수정 - public 폴더 내의 실제 존재하는 이미지 경로 사용
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866"; // public 폴더에 이 파일이 있는지 확인하세요

function DashboardPostList() {
  return (
    <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recentPosts.map((post, index) => (
        <div key={post.id} className="flex flex-col bg-background rounded-lg ">
          <div className="w-full h-40 relative rounded-t-md overflow-hidden mb-0">
            <Image
              className="hover:scale-105 transition-all duration-300"
              src={
                post.imageUrl ||
                sampleImages[index % sampleImages.length] ||
                DEFAULT_IMAGE
              }
              alt={post.title || "포스트 이미지"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={false}
              // 이미지 로드 오류 처리 추가
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE;
              }}
            />
            <div className="absolute bottom-0 left-0 px-2 py-1 bg-background text-foreground text-xs font-medium">
              Next.js
            </div>
          </div>
          <div className="flex flex-col p-4">
            <h3 className="font-medium text-foreground">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {post.excerpt || "설명이 없습니다."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPostList;
