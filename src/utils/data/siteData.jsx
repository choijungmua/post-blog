import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaAws,
  FaNpm,
  FaHtml5,
  FaCss3Alt,
  FaLinux,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiReactquery,
  SiSass,
  SiRecoil,
  SiPostgresql,
  SiFirebase,
  SiJavascript,
  SiVercel,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export const menuItems = [
  {
    title: "Home",
    submenu: [
      {
        title: "홈",
        href: "/",
        description: "메인 페이지",
      },
    ],
    width: "300px",
  },
  {
    title: "Design",
    submenu: [
      {
        title: "색상",
        href: "/design/color",
        description: "블로그의 현재 색상 테마를 보여줍니다.",
      },
      {
        title: "폰트",
        href: "/design/font",
        description: "블로그의 현재 폰트 테마를 보여줍니다.",
      },
    ],
    width: "300px",
  },
];
// 기술 스택 데이터
export const frontendTechs = [
  { id: 1, name: "React", icon: "react.svg" },
  { id: 2, name: "Next.js", icon: "nextjs.svg" },
  { id: 3, name: "TypeScript", icon: "typescript.svg" },
  { id: 4, name: "Tailwind CSS", icon: "tailwind.svg" },
];

export const backendTechs = [
  { id: 1, name: "Node.js", icon: "nodejs.svg" },
  { id: 2, name: "Express", icon: "express.svg" },
  { id: 3, name: "MongoDB", icon: "mongodb.svg" },
  { id: 4, name: "PostgreSQL", icon: "postgresql.svg" },
];

export const devopsTechs = [
  { id: 1, name: "Docker", icon: "docker.svg" },
  { id: 2, name: "AWS", icon: "aws.svg" },
  { id: 3, name: "CI/CD", icon: "cicd.svg" },
];

// 카테고리별 기술 스택
export const techStacksByCategory = {
  프론트엔드: [
    { id: "react", name: "React", icon: FaReact },
    { id: "nextjs", name: "Next.js", icon: SiNextdotjs },
    { id: "tailwind", name: "Tailwind", icon: SiTailwindcss },
    { id: "html", name: "HTML", icon: FaHtml5 },
    { id: "css", name: "CSS", icon: FaCss3Alt },
    { id: "javascript", name: "JavaScript", icon: SiJavascript },
    { id: "scss", name: "SCSS", icon: SiSass },
    { id: "reactnative", name: "React Native", icon: TbBrandReactNative },
  ],
  백엔드: [
    { id: "nodejs", name: "Node.js", icon: FaNodeJs },
    { id: "postgresql", name: "PostgreSQL", icon: SiPostgresql },
    { id: "firebase", name: "Firebase", icon: SiFirebase },
  ],
  도구: [
    { id: "github", name: "GitHub", icon: FaGithub },
    { id: "npm", name: "NPM", icon: FaNpm },
    { id: "aws", name: "AWS", icon: FaAws },
    { id: "vercel", name: "Vercel", icon: SiVercel },
    { id: "linux", name: "Linux", icon: FaLinux },
  ],
  상태관리: [
    { id: "recoil", name: "Recoil", icon: SiRecoil },
    { id: "zustand", name: "Zustand", icon: FaLayerGroup },
    { id: "reactquery", name: "React Query", icon: SiReactquery },
  ],
};

// 1차원 배열 기술 스택
export const allTechStacks = [
  { id: "react", name: "React", icon: FaReact },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs },
  { id: "tailwind", name: "Tailwind", icon: SiTailwindcss },
  { id: "nodejs", name: "Node.js", icon: FaNodeJs },
  { id: "github", name: "GitHub", icon: FaGithub },
  { id: "reactnative", name: "React Native", icon: TbBrandReactNative },
  { id: "scss", name: "SCSS", icon: SiSass },
  { id: "aws", name: "AWS", icon: FaAws },
  { id: "recoil", name: "Recoil", icon: SiRecoil },
  { id: "zustand", name: "Zustand", icon: FaLayerGroup },
  { id: "postgresql", name: "PostgreSQL", icon: SiPostgresql },
  { id: "firebase", name: "Firebase", icon: SiFirebase },
  { id: "html", name: "HTML", icon: FaHtml5 },
  { id: "css", name: "CSS", icon: FaCss3Alt },
  { id: "javascript", name: "JavaScript", icon: SiJavascript },
  { id: "linux", name: "Linux", icon: FaLinux },
  { id: "npm", name: "NPM", icon: FaNpm },
  { id: "reactquery", name: "React Query", icon: SiReactquery },
  { id: "vercel", name: "Vercel", icon: SiVercel },
];

// 최신 글 데이터
export const recentPosts = [
  {
    id: 1,
    title: "최신 기술 트렌드 #1",
    description: "프론트엔드 개발 트렌드와 최신 기술에 대한 소개",
    date: "2023-09-15",
  },
  {
    id: 2,
    title: "최신 기술 트렌드 #2",
    description: "백엔드 아키텍처와 서버리스 기술 동향",
    date: "2023-09-10",
  },
  {
    id: 3,
    title: "최신 기술 트렌드 #3",
    description: "모바일 앱 개발을 위한 크로스 플랫폼 프레임워크 비교",
    date: "2023-09-05",
  },
  {
    id: 4,
    title: "최신 기술 트렌드 #4",
    description: "웹 성능 최적화 방법과 툴 소개",
    date: "2023-09-01",
  },
  {
    id: 5,
    title: "최신 기술 트렌드 #5",
    description: "인공지능과 머신러닝 기술의 웹 개발 적용 사례",
    date: "2023-08-28",
  },
  {
    id: 6,
    title: "프론트엔드 개발자의 필수 도구",
    description: "효율적인 개발을 위한 프론트엔드 개발자의 필수 도구 모음",
    date: "2023-08-25",
  },
  {
    id: 7,
    title: "데이터베이스 선택 가이드",
    description: "프로젝트에 적합한 데이터베이스 선택 방법 안내",
    date: "2023-08-20",
  },
  {
    id: 8,
    title: "클라우드 서비스 비교",
    description: "인기 있는 클라우드 서비스 플랫폼 비교 분석",
    date: "2023-08-15",
  },
  {
    id: 9,
    title: "웹 접근성 향상 방법",
    description: "모두를 위한 웹을 만들기 위한 접근성 향상 기법",
    date: "2023-08-10",
  },
  {
    id: 10,
    title: "CI/CD 파이프라인 구축",
    description: "효율적인 개발 워크플로우를 위한 CI/CD 파이프라인 구축 방법",
    date: "2023-08-05",
  },
  {
    id: 11,
    title: "마이크로서비스 아키텍처",
    description: "마이크로서비스 아키텍처의 장단점과 구현 전략",
    date: "2023-08-01",
  },
];
