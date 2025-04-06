import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/shadcn/carousel";
import Image from "next/image";

/**
 * 대시보드 컨텐츠 컴포넌트
 * 캐러셀에 표시할 이미지 데이터를 정의합니다.
 */
function DashboardContent() {
  // 캐러셀에 표시할 이미지 데이터
  const slides = [
    {
      id: 1,
      content: "첫 번째 슬라이드",
      imageUrl: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    },
    {
      id: 2,
      content: "두 번째 슬라이드",
      imageUrl: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
    },
    {
      id: 3,
      content: "세 번째 슬라이드",
      imageUrl: "https://images.unsplash.com/photo-1522252234503-e356532cafd5",
    },
    {
      id: 4,
      content: "네 번째 슬라이드",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  ];

  return (
    <div className="mt-2 w-[889px] h-[500px] rounded-2xl relative overflow-hidden">
      <Carousel className="h-full">
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-[889px] h-[500px] overflow-hidden rounded-xl">
                <div className="absolute backdrop-blur-sm bottom-8 left-8 bg-black/50 px-4 py-2 rounded-xl text-white">
                  <h1 className="text-2xl font-bold">{slide.content}</h1>
                </div>
                <Image
                  src={slide.imageUrl}
                  alt={slide.content}
                  width={889}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}

export default DashboardContent;
