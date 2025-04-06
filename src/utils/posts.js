// lib/posts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 프로젝트 루트의 posts 폴더 경로 설정
const postsDirectory = path.join(process.cwd(), "public/posts");

// Unsplash 이미지 기본 URL 목록 (assets 폴더에 이미지가 없을 경우 대체용)
const unsplashImages = [
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605379399843-5870eea9b74e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
];

/**
 * 포스트 디렉토리 내 assets 폴더에서 첫 번째 이미지 파일을 찾는 함수
 * @param {string} folderName - 포스트 디렉토리 이름
 * @returns {string|null} 이미지 파일 경로 또는 null
 */
function findFirstImageInAssets(folderName) {
  const assetsDir = path.join(postsDirectory, folderName, "assets");

  // assets 디렉토리가 존재하는지 확인
  if (!fs.existsSync(assetsDir)) {
    return null;
  }

  // 이미지 파일 확장자 목록
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  // assets 디렉토리 내 파일 목록 가져오기
  const files = fs.readdirSync(assetsDir);

  // 이미지 파일 찾기
  const imageFile = files.find((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  if (!imageFile) {
    return null;
  }

  // Next.js가 접근할 수 있는 형태의 URL 경로로 반환 (/api/asset/[id]/assets/[filename] 형태)
  return `/posts/${folderName}/assets/${imageFile}`;
}

/**
 * 모든 게시글 데이터를 읽어 날짜 기준 내림차순으로 정렬하여 반환합니다.
 * (리스트 페이지에 필요한 메타데이터만 포함)
 * @returns {Array} 게시글 데이터 배열 (id, title, date 등)
 */
export function getSortedPostsData() {
  // 폴더 목록을 가져옵니다 (각 폴더는 하나의 게시글을 나타냄)
  const folderNames = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const allPostsData = folderNames
    .map((folderName) => {
      // 폴더명이 id가 됩니다
      const id = folderName;
      const indexPath = path.join(postsDirectory, folderName, "index.mdx");

      // index.mdx 파일이 존재하는지 확인
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(indexPath, "utf8");

      // gray-matter를 사용해 메타데이터 파싱
      const { data } = matter(fileContents);

      // 썸네일 이미지 처리 - assets 폴더 내 이미지를 사용
      let thumbnail = data.thumbnail;

      // 썸네일이 지정되지 않았거나 로컬 경로인 경우
      if (
        !thumbnail ||
        (!thumbnail.startsWith("http") && !thumbnail.startsWith("/"))
      ) {
        // assets 폴더에서 이미지 찾기
        const assetImage = findFirstImageInAssets(folderName);

        if (assetImage) {
          // assets 폴더에 이미지가 있으면 그것을 사용
          thumbnail = assetImage;
        } else {
          // 없으면 Unsplash 이미지 사용
          const index = Math.abs(
            id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
              unsplashImages.length
          );
          thumbnail = unsplashImages[index];
        }
      }

      return {
        id,
        ...data,
        thumbnail,
      };
    })
    .filter(Boolean); // null 값 제거

  // 날짜 기준 내림차순 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 특정 게시글의 MDX 콘텐츠와 메타데이터를 반환합니다.
 * @param {string} id - 게시글의 고유 아이디 (폴더명)
 * @returns {Promise<Object>} 게시글 데이터 (id, mdxSource, 메타데이터 등)
 */
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, id, "index.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matter로 메타데이터와 콘텐츠 분리
  const { data, content } = matter(fileContents);

  // 이미지 경로를 상대 경로로 변환하는 함수
  const processImagePaths = (contentStr) => {
    // 로컬 이미지 경로를 posts/[id]/이미지명 형태로 변환
    return contentStr.replace(
      /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
      (match, alt, imgPath) => {
        // 이미 절대 경로면 그대로 반환
        if (imgPath.startsWith("/")) return match;

        // 상대 경로를 절대 경로로 변환 (실제 파일이 있는 경로)
        return `![${alt}](/posts/${id}/${imgPath})`;
      }
    );
  };

  // 썸네일 이미지 처리 - assets 폴더 내 이미지를 사용
  let thumbnail = data.thumbnail;

  // 썸네일이 지정되지 않았거나 로컬 경로인 경우
  if (
    !thumbnail ||
    (!thumbnail.startsWith("http") && !thumbnail.startsWith("/"))
  ) {
    // assets 폴더에서 이미지 찾기
    const assetImage = findFirstImageInAssets(id);

    if (assetImage) {
      // assets 폴더에 이미지가 있으면 그것을 사용
      thumbnail = assetImage;
    } else {
      // 없으면 Unsplash 이미지 사용
      const index = Math.abs(
        id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
          unsplashImages.length
      );
      thumbnail = unsplashImages[index];
    }
  }

  // 콘텐츠 내 이미지 경로 처리
  const processedContent = processImagePaths(content);

  // MDX 콘텐츠를 직렬화하여 클라이언트에서 MDXRemote로 렌더링 가능하도록 함
  const mdxSource = await serialize(processedContent, {
    scope: { ...data, thumbnail },
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
    thumbnail,
  };
}

/**
 * 모든 게시글의 id를 동적 경로 생성 형식에 맞춰 반환합니다.
 * @returns {Array} { params: { slug: string } } 형식의 배열
 */
export function getAllPostIds() {
  const folderNames = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((folderName) => {
      // index.mdx 파일이 있는 폴더만 선택
      return fs.existsSync(path.join(postsDirectory, folderName, "index.mdx"));
    });

  return folderNames.map((folderName) => ({
    params: {
      slug: folderName,
    },
  }));
}

/**
 * 게시글 폴더 내의 정적 파일(이미지 등)을 위한 핸들러
 *
 * Next.js API 라우트에서 사용할 수 있도록 정적 파일을 제공하는 함수
 * @param {string} id - 게시글 ID (폴더명)
 * @param {string} filename - 파일 이름
 * @returns {Object} 파일 데이터와 MIME 타입
 */
export function getPostAsset(id, filename) {
  const filePath = path.join(postsDirectory, id, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileData = fs.readFileSync(filePath);

  // 간단한 MIME 타입 결정 (필요에 따라 확장)
  const ext = path.extname(filePath).toLowerCase();
  let contentType = "application/octet-stream";

  if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
  else if (ext === ".png") contentType = "image/png";
  else if (ext === ".gif") contentType = "image/gif";
  else if (ext === ".svg") contentType = "image/svg+xml";
  else if (ext === ".webp") contentType = "image/webp";

  return {
    data: fileData,
    contentType,
  };
}
