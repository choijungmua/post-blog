# Next.js 블로그 프로젝트

이 프로젝트는 Next.js 15와 React 19 기반의 현대적인 블로그 플랫폼입니다. MDX를 활용하여 마크다운과 React 컴포넌트를 결합한 풍부한 콘텐츠 작성 환경을 제공합니다.

## 프로젝트 소개

이 블로그 플랫폼은 다음과 같은 특징을 가지고 있습니다:

- **최신 Next.js 15 App Router** 아키텍처 적용
- **React 19** 의 최신 기능 활용
- **MDX** 기반 콘텐츠 작성으로 마크다운과 리액트 컴포넌트 결합
- **수학 공식 렌더링** 지원 (KaTeX)
- **반응형 디자인**으로 모든 디바이스에 최적화된 레이아웃
- **다크/라이트 테마** 지원

## 핵심 기술

### 프론트엔드

- **React 19**: 최신 버전의 리액트를 사용하여 효율적인 UI 구현
- **Next.js 15**: App Router, SSR(Server-Side Rendering), ISR(Incremental Static Regeneration) 등의 기능 활용

### 디자인 & UI

- **TailwindCSS 4**: 유틸리티-퍼스트 CSS 프레임워크
- **shadcn/ui**: Radix UI 기반의 모던하고 접근성 높은 컴포넌트 라이브러리
- **Radix UI**: 접근성과 사용성을 고려한 헤드리스 컴포넌트 제공
  - Alert Dialog, Avatar, Checkbox, Context Menu, Dialog, Dropdown Menu, Hover Card 등 다양한 컴포넌트 활용
- **lucide-react**: 깔끔하고 가볍고 현대적인 아이콘 세트
- **Embla Carousel**: 성능 최적화된 캐러셀 컴포넌트
- **react-syntax-highlighter**: 코드 구문 강조 기능
- **tailwindcss-animate**: 부드러운 애니메이션 구현
- **tw-animate-css**: 애니메이션 효과 라이브러리

### 콘텐츠 관리

- **MDX**: Markdown과 JSX를 결합한 강력한 콘텐츠 작성 포맷
- **next-mdx-remote**: MDX 콘텐츠의 동적 로딩 및 렌더링
- **gray-matter**: 마크다운 파일의 프론트매터 파싱
- **remark/rehype**: 마크다운 처리 생태계
  - remark-gfm: GitHub Flavored Markdown 지원
  - remark-math, rehype-katex: 수학 수식 지원
  - rehype-prism-plus: 향상된 코드 하이라이팅
  - remark-footnotes: 각주 지원

### 상태 관리 & 데이터

- **Zustand**: 간결하고 유연한 상태 관리 라이브러리
- **SWR/React Query**: 데이터 페칭 및 캐싱 라이브러리
- **React Hook Form**: 효율적인 폼 상태 관리 및 검증
- **@hookform/resolvers**: 폼 검증 기능 확장

### 유틸리티

- **date-fns**: 날짜 처리 라이브러리
- **next-themes**: 테마 전환 관리
- **class-variance-authority**: 클래스 조건부 적용 유틸리티
- **clsx & tailwind-merge**: 클래스 결합 및 충돌 해결 유틸리티
- **react-resizable-panels**: 리사이즈 가능한 패널 구현

## 프로젝트 구조

```
next-blog/
├── public/             # 정적 파일
├── posts/              # MDX 블로그 포스트
├── src/
│   ├── app/            # Next.js App Router 구조
│   │   ├── posts/      # 블로그 포스트 라우트
│   │   ├── design/     # 디자인 시스템 페이지
│   │   └── layout.js   # 루트 레이아웃
│   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── mdx/        # MDX 관련 커스텀 컴포넌트
│   │   ├── shadcn/     # shadcn/ui 컴포넌트
│   │   ├── theme/      # 테마 관련 컴포넌트
│   │   └── ui/         # 사용자 정의 UI 컴포넌트
│   ├── lib/            # 유틸리티 함수
│   ├── screen/         # 페이지 화면 컴포넌트
│   └── assets/         # 자원 파일들
```

## 블로그 포스트 작성

블로그 포스트는 MDX 형식으로 작성되며, 프론트매터를 통해 메타데이터를 정의합니다:

````mdx
---
title: "포스트 제목"
date: "2024-03-30"
description: "포스트에 대한 간단한 설명"
---

여기에 마크다운 내용을 작성합니다...

수학 공식도 지원합니다:

$$
E = mc^2
$$

코드 블록도 구문 강조와 함께 사용할 수 있습니다:

```jsx
function Hello() {
  return <div>Hello World</div>;
}
```
````

또한 리액트 컴포넌트도 직접 삽입 가능합니다:
<CustomComponent propA={value} />

```

## 라이센스

MIT
```
