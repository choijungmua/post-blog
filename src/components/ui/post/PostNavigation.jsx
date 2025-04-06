"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";

/**
 * 이전/다음 포스트 네비게이션 컴포넌트
 */
export default function PostNavigation() {
  const pathname = usePathname();
  const [navigation, setNavigation] = useState({ prev: null, next: null });
  const currentSlug = pathname.split("/").pop();

  useEffect(() => {
    // API 또는 정적 데이터에서 이전/다음 포스트 정보 가져오기
    // 실제 구현 시에는 이 부분을 서버 컴포넌트로 전환하거나 API 호출로 대체할 수 있습니다
    const fetchNavigation = async () => {
      try {
        // 예시 데이터 - 실제로는 API 호출이나 서버 컴포넌트에서 처리해야 합니다
        // 여기서는 임시로 더미 데이터를 사용합니다
        setNavigation({
          prev: {
            slug: "previous-post",
            title: "이전 포스트",
          },
          next: {
            slug: "next-post",
            title: "다음 포스트",
          },
        });

        // 실제 구현 예시:
        // const response = await fetch(`/api/posts/navigation?slug=${currentSlug}`);
        // const data = await response.json();
        // setNavigation(data);
      } catch (error) {
        console.error("Failed to fetch post navigation:", error);
      }
    };

    fetchNavigation();
  }, [currentSlug]);

  if (!navigation.prev && !navigation.next) return null;

  return (
    <div className="mt-12 border-t border-border pt-8">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {navigation.prev ? (
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2 group"
                asChild
              >
                <Link href={`/posts/post-detail/${navigation.prev.slug}`}>
                  <ChevronLeftIcon
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  <span className="truncate">
                    <span className="block text-xs text-muted-foreground">
                      이전 포스트
                    </span>
                    {navigation.prev.title}
                  </span>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {navigation.next && (
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2 group justify-end"
                asChild
              >
                <Link href={`/posts/post-detail/${navigation.next.slug}`}>
                  <span className="truncate text-right">
                    <span className="block text-xs text-muted-foreground">
                      다음 포스트
                    </span>
                    {navigation.next.title}
                  </span>
                  <ChevronRightIcon
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
