// app/posts/post-list/page.js
// 게시글 리스트 페이지: 빌드 시점에 정적 페이지를 생성하여 빠른 초기 로딩을 지원합니다.

import { getSortedPostsData } from "@/lib/posts"; // 절대 경로 사용
import PostListScreen from "@/components/ui/dashboard/DashboardScreen";

// Next.js App Router는 기본적으로 서버 컴포넌트이므로, 빌드 타임에 데이터를 불러올 수 있습니다.
export default function Blog() {
  // 동기적으로 데이터를 가져올 수 있습니다.
  const allPostsData = getSortedPostsData();

  return <PostListScreen posts={allPostsData} />;
}
