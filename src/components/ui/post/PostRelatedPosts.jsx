"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

/**
 * 관련 포스트 컴포넌트
 */
export default function PostRelatedPosts() {
  const pathname = usePathname();
  const [relatedPosts, setRelatedPosts] = useState([]);
  const currentSlug = pathname.split("/").pop();

  useEffect(() => {
    // 관련 포스트 가져오기
    const fetchRelatedPosts = async () => {
      try {
        // 임시 데이터 - 실제 구현 시에는 API 호출이나 서버 컴포넌트로 대체
        setRelatedPosts([
          {
            id: 1,
            slug: "related-post-1",
            title: "관련 포스트 1",
            thumbnail: "https://placekitten.com/300/200",
            date: "2023-04-01",
          },
          {
            id: 2,
            slug: "related-post-2",
            title: "관련 포스트 2",
            thumbnail: "https://placekitten.com/300/201",
            date: "2023-03-15",
          },
          {
            id: 3,
            slug: "related-post-3",
            title: "관련 포스트 3",
            thumbnail: "https://placekitten.com/300/202",
            date: "2023-02-28",
          },
        ]);

        // 실제 구현 예시:
        // const response = await fetch(`/api/posts/related?slug=${currentSlug}`);
        // const data = await response.json();
        // setRelatedPosts(data);
      } catch (error) {
        console.error("Failed to fetch related posts:", error);
      }
    };

    fetchRelatedPosts();
  }, [currentSlug]);

  if (relatedPosts.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">관련 포스트</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <div key={post.id} className="group">
              <Link href={`/posts/post-detail/${post.slug}`} className="block">
                <div className="flex gap-3">
                  {post.thumbnail && (
                    <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.date}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
