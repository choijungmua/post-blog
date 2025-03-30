"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/shadcn/sheet";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/shadcn/menubar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/shadcn/context-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { Badge } from "@/components/shadcn/badge";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/shadcn/resizable";
import { Calendar } from "@/components/shadcn/calendar";
import { toast } from "sonner";
import { Toaster } from "@/components/shadcn/sonner";

export default function NavigationDemo() {
  const [date, setDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container mx-auto py-12 space-y-12">
      <Toaster />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">내비게이션 컴포넌트 데모</h1>
        <div className="space-x-2">
          <Link href="/components-showcase">
            <Button variant="outline">컴포넌트 쇼케이스</Button>
          </Link>
          <Link href="/form-examples">
            <Button variant="outline">폼 예제</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>

      {/* 브레드크럼 */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">브레드크럼 (Breadcrumb)</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/navigation-demo">
                내비게이션
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>브레드크럼</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 내비게이션 메뉴 */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">
          내비게이션 메뉴 (Navigation Menu)
        </h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>시작하기</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 hover:bg-accent rounded-md">
                      <h3 className="font-medium">소개</h3>
                      <p className="text-sm text-muted-foreground">
                        프로젝트 소개 및 개요를 확인합니다.
                      </p>
                    </div>
                    <div className="p-2 hover:bg-accent rounded-md">
                      <h3 className="font-medium">설치</h3>
                      <p className="text-sm text-muted-foreground">
                        설치 방법 및 시작 가이드를 확인합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>컴포넌트</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[500px]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 hover:bg-accent rounded-md">
                      <h3 className="font-medium">UI 컴포넌트</h3>
                      <p className="text-sm text-muted-foreground">
                        버튼, 카드, 아바타 등 기본 UI 컴포넌트
                      </p>
                    </div>
                    <div className="p-2 hover:bg-accent rounded-md">
                      <h3 className="font-medium">폼 컴포넌트</h3>
                      <p className="text-sm text-muted-foreground">
                        입력 필드, 체크박스, 라디오 버튼 등 폼 컴포넌트
                      </p>
                    </div>
                    <div className="p-2 hover:bg-accent rounded-md">
                      <h3 className="font-medium">내비게이션</h3>
                      <p className="text-sm text-muted-foreground">
                        메뉴, 탭, 브레드크럼 등 내비게이션 컴포넌트
                      </p>
                    </div>
                    <div className="p-2 hover:bg-accent rounded-md">
                      <h3 className="font-medium">피드백</h3>
                      <p className="text-sm text-muted-foreground">
                        알림, 토스트, 프로그레스 등 피드백 컴포넌트
                      </p>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  문서
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* 메뉴바 */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">메뉴바 (Menubar)</h2>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>파일</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => toast("새 파일 생성")}>
                새 파일 <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => toast("파일 열기")}>
                열기... <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => toast("저장")}>
                저장 <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>편집</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => toast("실행 취소")}>
                실행 취소 <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => toast("다시 실행")}>
                다시 실행 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => toast("잘라내기")}>
                잘라내기 <MenubarShortcut>⌘X</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => toast("복사")}>
                복사 <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => toast("붙여넣기")}>
                붙여넣기 <MenubarShortcut>⌘V</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>보기</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => toast("확대")}>
                확대 <MenubarShortcut>⌘+</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => toast("축소")}>
                축소 <MenubarShortcut>⌘-</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* 사이드바 (Sheet 활용) */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">
          사이드바 (Sheet 컴포넌트 활용)
        </h2>
        <div className="space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>왼쪽 사이드바 열기</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>사이드 내비게이션</SheetTitle>
                <SheetDescription>
                  사이드바를 통해 다양한 섹션으로 이동할 수 있습니다.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">메인 메뉴</h3>
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        홈
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        문서
                        <Badge variant="secondary" className="ml-auto">
                          NEW
                        </Badge>
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        프로필
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        설정
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">프로젝트</h3>
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start">
                        웹사이트 리뉴얼
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        모바일 앱
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        API 개발
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>닫기</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button>오른쪽 사이드바 열기</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>상세 정보</SheetTitle>
                <SheetDescription>
                  현재 항목에 대한 상세 정보를 확인합니다.
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">프로젝트 정보</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">이름</p>
                        <p className="text-sm text-muted-foreground">
                          Next.js 블로그
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">생성일</p>
                        <p className="text-sm text-muted-foreground">
                          2023년 3월 29일
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">상태</p>
                        <Badge>진행 중</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">일정</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className="rounded-md border"
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* 컨텍스트 메뉴 */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">컨텍스트 메뉴 (Context Menu)</h2>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
            이 영역에서 우클릭하세요 (또는 길게 터치)
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem onClick={() => toast("보기 선택")}>
              보기
            </ContextMenuItem>
            <ContextMenuItem onClick={() => toast("편집 선택")}>
              편집
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => toast("복사 선택")}>
              복사
            </ContextMenuItem>
            <ContextMenuItem onClick={() => toast("잘라내기 선택")}>
              잘라내기
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => toast("삭제 선택")}
              className="text-red-500"
            >
              삭제
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* 크기 조절 패널 */}
      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">
          크기 조절 패널 (Resizable Panel)
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          핸들을 드래그하여 패널의 크기를 조절할 수 있습니다.
        </p>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">사이드바 패널</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">컨텐츠 패널</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          이 페이지는 shadcn/ui의 다양한 내비게이션 및 레이아웃 컴포넌트를
          활용하여 구현되었습니다.
        </p>
      </div>
    </div>
  );
}
