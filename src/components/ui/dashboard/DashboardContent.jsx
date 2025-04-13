import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/shadcn/carousel";
import Link from "next/link";
import Image from "next/image";

/**
 * 대시보드 컨텐츠 컴포넌트
 * 캐러셀에 표시할 이미지 데이터를 정의합니다.
 * 16:9 비율의 이미지를 올바르게 표시합니다.
 */
function DashboardContent({ posts }) {
  // 16:9 비율만 유지하도록 설정
  const aspectRatio = 16 / 9;

  const slides = posts.map((post) => ({
    id: post.id,
    content: post.title,
    imageUrl: post.thumbnail,
  }));

  return (
    <div className="mt-2 w-full xl:w-[889px] lg:w-[668px] rounded-2xl relative">
      {/* 고정 높이를 제거하고, aspectRatio만 유지되도록 수정 */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio,
        }}
      >
        <Carousel className="h-full">
          <CarouselContent className="h-full">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="h-full">
                <Link
                  href={`/posts/post-detail/${slide.id}`}
                  className="relative block w-full h-full overflow-hidden rounded-xl"
                >
                  <div className="absolute backdrop-blur-lg bottom-2 left-2 bg-white/50 px-4 py-1 rounded-xl text-black z-10">
                    <h1 className="text-2xl font-bold">{slide.content}</h1>
                  </div>
                  <div className="relative w-full h-full">
                    <div
                      className="relative w-full h-full"
                      style={{
                        aspectRatio,
                      }}
                    >
                      <Image
                        src={slide.imageUrl}
                        alt={slide.content}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}

export default DashboardContent;
