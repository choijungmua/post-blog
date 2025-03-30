// lib/posts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 프로젝트 루트의 posts 폴더 경로 설정
const postsDirectory = path.join(process.cwd(), "posts");

/**
 * 모든 게시글 데이터를 읽어 날짜 기준 내림차순으로 정렬하여 반환합니다.
 * (리스트 페이지에 필요한 메타데이터만 포함)
 * @returns {Array} 게시글 데이터 배열 (id, title, date 등)
 */
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // MDX 파일 확장자(.mdx)를 제거해 id 생성
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter를 사용해 메타데이터 파싱
    const { data } = matter(fileContents);
    return {
      id,
      ...data,
    };
  });

  // 날짜 기준 내림차순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 특정 게시글의 MDX 콘텐츠와 메타데이터를 반환합니다.
 * @param {string} id - 게시글의 고유 아이디 (파일명에서 확장자 제거한 값)
 * @returns {Promise<Object>} 게시글 데이터 (id, mdxSource, 메타데이터 등)
 */
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matter로 메타데이터와 콘텐츠 분리
  const { data, content } = matter(fileContents);

  // MDX 콘텐츠를 직렬화하여 클라이언트에서 MDXRemote로 렌더링 가능하도록 함
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [
        [remarkGfm, { tableCellPadding: true, tablePipeAlign: true }],
        remarkMath,
      ],
      rehypePlugins: [rehypeKatex],
      format: "mdx",
    },
    parseFrontmatter: true,
  });

  return {
    id,
    mdxSource,
    ...data,
  };
}

/**
 * 모든 게시글의 id를 동적 경로 생성 형식에 맞춰 반환합니다.
 * @returns {Array} { params: { slug: string } } 형식의 배열
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.mdx$/, ""),
    },
  }));
}
