"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";

export default function Demos() {
  const demoList = [
    {
      title: "내비게이션 데모",
      description:
        "다양한 내비게이션 컴포넌트 (내비게이션 메뉴, 사이드바, 메뉴바 등) 예제",
      path: "/navigation-demo",
    },
    {
      title: "컴포넌트 쇼케이스",
      description: "다양한 UI 컴포넌트를 보여주는 예제 페이지",
      path: "/components-showcase",
    },
    {
      title: "폼 예제",
      description: "다양한 폼 컴포넌트와 유효성 검사 등을 보여주는 예제",
      path: "/form-examples",
    },
  ];

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">데모 목록</h1>
        <Link href="/">
          <Button variant="outline">홈으로 돌아가기</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoList.map((demo, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{demo.title}</CardTitle>
              <CardDescription>{demo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={demo.path}>
                <Button className="w-full">데모 보기</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
