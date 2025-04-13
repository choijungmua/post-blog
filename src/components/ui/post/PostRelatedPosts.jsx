"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import Image from "next/image";

/**
 * 관련 포스트 컴포넌트
 */
export default function PostRelatedPosts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">관련 포스트</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4"></div>
      </CardContent>
    </Card>
  );
}
