/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 리다이렉트 설정을 명시적으로 제어
  async redirects() {
    // 빈 배열을 반환하여 기본 리다이렉트를 비활성화
    return [];
  },
  // 이미지 도메인 설정 추가
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
    ],
  },
  // 라우팅 설정 추가
  async rewrites() {
    return {
      beforeFiles: [
        // 필요한 경우 여기에 특정 재작성 규칙 추가
      ],
    };
  },
};

module.exports = nextConfig;
