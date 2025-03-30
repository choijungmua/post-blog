"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/card";
import { Switch } from "@/components/shadcn/switch";
import { Label } from "@/components/shadcn/label";
import { Slider } from "@/components/shadcn/slider";
import { Progress } from "@/components/shadcn/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/shadcn/table";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/shadcn/hover-card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/shadcn/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/shadcn/sheet";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/shadcn/sonner";

export default function ComponentsShowcase() {
  const [progress, setProgress] = useState(30);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="container mx-auto py-12 space-y-12">
      <Toaster />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Shadcn/UI 컴포넌트 쇼케이스</h1>
        <div className="space-x-2">
          <Link href="/form-examples">
            <Button variant="outline">폼 예제</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 스위치(Switch) 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>Switch</CardTitle>
            <CardDescription>
              상태를 토글하는 스위치 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Label htmlFor="dark-mode">다크 모드</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">비행기 모드</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              size="sm"
              onClick={() =>
                toast.success(`다크 모드: ${darkMode ? "켜짐" : "꺼짐"}`)
              }
            >
              상태 확인
            </Button>
          </CardFooter>
        </Card>

        {/* 슬라이더(Slider) 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>Slider</CardTitle>
            <CardDescription>
              범위 값을 선택하는 슬라이더 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>볼륨 조절</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label>진행률 조절: {progress}%</Label>
              <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={([value]) => setProgress(value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Progress value={progress} className="h-2" />
            </div>
          </CardFooter>
        </Card>

        {/* 셀렉트(Select) 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>
              옵션을 선택하는 셀렉트 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="framework">프레임워크</Label>
              <Select defaultValue="next">
                <SelectTrigger>
                  <SelectValue placeholder="프레임워크 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">테마</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="테마 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">라이트</SelectItem>
                  <SelectItem value="dark">다크</SelectItem>
                  <SelectItem value="system">시스템</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("옵션이 저장되었습니다.")}
            >
              설정 저장
            </Button>
          </CardFooter>
        </Card>

        {/* 테이블(Table) 카드 */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Table</CardTitle>
            <CardDescription>
              데이터를 표 형식으로 표시하는 테이블 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead className="text-right">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">홍길동</TableCell>
                  <TableCell>hong@example.com</TableCell>
                  <TableCell>관리자</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">김철수</TableCell>
                  <TableCell>kim@example.com</TableCell>
                  <TableCell>편집자</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">이영희</TableCell>
                  <TableCell>lee@example.com</TableCell>
                  <TableCell>작가</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* HoverCard 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>HoverCard</CardTitle>
            <CardDescription>
              요소에 호버했을 때 추가 정보를 표시합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">홍길동에 대해 더 알아보기</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div>
                    <h4 className="text-sm font-semibold">홍길동</h4>
                    <p className="text-sm">프론트엔드 개발자</p>
                    <div className="flex items-center pt-2">
                      <span className="text-xs text-muted-foreground">
                        Next.js, React, TailwindCSS 전문가
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">프로젝트 상세 보기</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">블로그 플랫폼</h4>
                  <p className="text-xs">
                    Next.js로 구축한 블로그 플랫폼으로, 마크다운 지원 및 댓글
                    기능을 포함합니다.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      자세히 보기
                    </Button>
                    <Button size="sm">데모</Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardContent>
        </Card>

        {/* Popover 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>Popover</CardTitle>
            <CardDescription>
              클릭 시 추가 내용을 표시하는 팝오버 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button>설정</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">알림 설정</h4>
                    <p className="text-sm text-muted-foreground">
                      알림 수신 여부를 설정합니다.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notification-email">이메일 알림</Label>
                      <Switch id="notification-email" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notification-push">푸시 알림</Label>
                      <Switch id="notification-push" defaultChecked />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => toast.success("설정이 저장되었습니다.")}
                  >
                    저장
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">프로필</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">홍길동</h4>
                    <p className="text-sm text-muted-foreground">
                      hong@example.com
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      로그아웃
                    </Button>
                    <Button size="sm">프로필 편집</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Sheet 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>Sheet</CardTitle>
            <CardDescription>
              화면 측면에서 슬라이드되는 패널 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">오른쪽에서 열기</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>프로필 편집</SheetTitle>
                    <SheetDescription>
                      프로필 정보를 변경하고 저장하세요.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">이름</Label>
                      <input
                        id="name"
                        className="rounded-md border p-2"
                        defaultValue="홍길동"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="username">사용자명</Label>
                      <input
                        id="username"
                        className="rounded-md border p-2"
                        defaultValue="honggildong"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        onClick={() =>
                          toast.success("프로필이 업데이트되었습니다.")
                        }
                      >
                        변경사항 저장
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">왼쪽에서 열기</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>메뉴</SheetTitle>
                    <SheetDescription>사이트를 탐색하세요.</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col py-6 gap-2">
                    <Button variant="ghost" className="justify-start">
                      홈
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      블로그
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      프로젝트
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      연락처
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          이 페이지는 shadcn/ui 컴포넌트 라이브러리를 활용하여 구현되었습니다.
          더 많은 컴포넌트를 확인하려면{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            shadcn/ui 공식 문서
          </a>
          를 참조하세요.
        </p>
      </div>
    </div>
  );
}
