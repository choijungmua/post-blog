"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Button } from "@/components/shadcn/button";
import SidebarTechStacks from "./SidebarTechStacks";
import SidebarRecentPosts from "./SidebarRecentPosts";

export default function DashboardSideBar() {
  // 토글 상태 관리 추가
  const [activeTab, setActiveTab] = useState("techstack");

  return (
    <div className="w-full h-full relative">
      {/* 상단 토글 버튼 추가 */}
      <div className="grid grid-cols-2 w-full border-b border-border/40">
        <Button
          variant="ghost"
          className={`rounded-none h-12 flex flex-col items-center justify-center border-b-2 transition-colors ${
            activeTab === "techstack"
              ? "border-b-primary"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("techstack")}
        >
          <span className="text-sm">기술 스택</span>
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none h-12 flex flex-col items-center justify-center border-b-2 transition-colors ${
            activeTab === "recent" ? "border-b-primary" : "border-transparent"
          }`}
          onClick={() => setActiveTab("recent")}
        >
          <span className="text-sm">최신 글</span>
        </Button>
      </div>

      <div className="relative">
        <ScrollArea className="h-[calc(100vh-280px)] pr-4">
          {activeTab === "techstack" ? (
            <SidebarTechStacks />
          ) : (
            <SidebarRecentPosts />
          )}
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
