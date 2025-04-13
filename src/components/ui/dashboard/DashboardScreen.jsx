"use client";
import { useState, useMemo } from "react";
import DashboardContent from "@/components/ui/dashboard/DashboardContent";
import DashboardHeader from "@/components/ui/dashboard/DashboardHeader";
import DashboardList from "@/components/ui/dashboard/DashboardList";
import DashboardSideBar from "@/components/ui/dashboard/DashboardSideBar";
import DashboardPostNav from "./DashboardPostNav";
import DashboardPostList from "./DashboardPostList";

function PostListScreen({ posts }) {
  // 선택된 태그를 관리하는 상태 - 기본값은 'All'
  const [selectedTag, setSelectedTag] = useState("All");

  // 선택된 태그에 따라 필터링된 게시물 목록 생성
  const filteredPosts = useMemo(() => {
    // 'All' 태그가 선택되면 모든 게시물 표시
    if (selectedTag === "All") {
      return posts;
    }

    // 특정 태그가 선택된 경우, 해당 태그를 포함하는 게시물만 필터링
    return posts.filter(
      (post) => Array.isArray(post.tags) && post.tags.includes(selectedTag)
    );
  }, [posts, selectedTag]);

  // 태그 변경 핸들러
  const handleTagChange = (tagName) => {
    setSelectedTag(tagName);
  };

  return (
    <div className="container mx-auto max-w-8xl px-2 sm:px-4">
      <section className="flex gap-3 sm:gap-4 flex-col lg:flex-row">
        <div className="flex flex-col">
          <DashboardHeader />
          <DashboardContent posts={posts} />
        </div>
        <DashboardSideBar posts={posts} />
      </section>
      <DashboardList />

      <section className="flex gap-3 sm:gap-4 mt-8 sm:mt-12 w-full flex-col md:flex-row">
        <DashboardPostNav posts={posts} onTagChange={handleTagChange} />
        <DashboardPostList posts={filteredPosts} />
      </section>
    </div>
  );
}

export default PostListScreen;
