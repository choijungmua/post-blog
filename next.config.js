/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 개발 환경에서는 output export를 사용하지 않음 (middleware 사용을 위해)
  ...(process.env.NODE_ENV === "production" && { output: "export" }),
  // basePath 추가 (배포 환경에 맞게 조정 필요)
  // basePath: '/next-blog',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 예시: 사용하려는 이미지 도메인
        pathname: "**", // 모든 경로를 허용
      },
      {
        protocol: "https",
        hostname: "muke.co.kr", // 이 도메인에서 이미지 제공되는 경우
        pathname: "**",
      },
    ],
    unoptimized: true, // 이미지 최적화 비활성화
  },
  // 정적 배포 시 이미지 경로 수정을 위한 assetPrefix 설정 (배포 환경에 맞게 조정 필요)
  // assetPrefix: 'https://your-cloudfront-distribution.cloudfront.net',
};

module.exports = nextConfig;
