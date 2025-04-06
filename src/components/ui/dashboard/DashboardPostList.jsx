import React from "react";
import Image from "next/image";
import Link from "next/link";

// 기본 이미지 경로
const DEFAULT_IMAGE = "https://placekitten.com/800/400";

function DashboardPostList({ posts }) {
  // 게시물 데이터가 없는 경우 처리
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="w-full flex-1 flex items-center justify-center min-h-[200px] bg-background rounded-lg">
        <p className="text-muted-foreground">
          선택한 태그에 해당하는 게시물이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          href={`/posts/post-detail/${post.id}`}
          key={post.id}
          className="flex flex-col bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-full h-40 relative rounded-t-md overflow-hidden mb-0">
            <Image
              className="hover:scale-105 transition-all duration-300"
              src={post.thumbnail || DEFAULT_IMAGE}
              alt={post.title || "포스트 이미지"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority={false}
              // 이미지 로드 오류 처리
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE;
              }}
            />
            {post.tags && post.tags.length > 0 && (
              <div className="absolute bottom-0 left-0 px-2 py-1 bg-background text-foreground text-xs font-medium">
                {post.tags[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col p-4">
            <h3 className="font-medium text-foreground">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {post.excerpt ||
                post.description ||
                `${post.title}에 대한 포스트입니다.`}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">{post.date}</span>
              {post.author && (
                <span className="text-xs text-muted-foreground">
                  by {post.author}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DashboardPostList;
