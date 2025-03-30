// app/blog/[slug]/page.js
import { getPostData, getAllPostIds } from "@/lib/posts";
import PostDetailScreen from "@/screen/PostDetailScreen";

/**
 * 빌드 시 정적 페이지 생성을 위한 동적 경로 목록을 생성합니다.
 */
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

/**
 * 게시글 상세 페이지 컴포넌트
 * @param {Object} props - Next.js가 전달하는 props
 * @param {Promise<Object>} props.params - URL 파라미터 (예: { slug: 'example-post' })
 */
export default async function PostDetailPage({ params }) {
  // params가 Promise처럼 동작한다면 await한 후 destructuring합니다.
  const { slug } = await params;
  const postData = await getPostData(slug);

  return <PostDetailScreen postData={postData} />;
}
