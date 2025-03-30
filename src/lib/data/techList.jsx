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

// 기술 리스트 데이터
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

// 카테고리별 기술 스택 추가
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

// 1차원 배열 유지 (필요한 경우를 위해)
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
