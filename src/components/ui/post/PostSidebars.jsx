"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/shadcn/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

// 동적으로 컴포넌트 로드 (코드 스플리팅)
const TableOfContents = dynamic(() => import("./PostTableOfContents"), {
  loading: () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">목차</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-4/5 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  ),
  ssr: false,
});

// 모든 사이드바 컴포넌트를 객체로 내보내기
const PostSidebars = {
  TableOfContents,
};

export default PostSidebars;
