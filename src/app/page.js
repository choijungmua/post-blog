import PostListScreen from "@/components/ui/dashboard/DashboardScreen";
import { getSortedPostsData } from "@/utils/posts";
export default function Home() {
  // 동기적으로 데이터를 가져옵니다
  const allPostsData = getSortedPostsData();

  return (
    <div>
      <PostListScreen posts={allPostsData} />
    </div>
  );
}
