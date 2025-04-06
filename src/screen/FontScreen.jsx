"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { Type, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn";

function FontScreen() {
  const weights = [
    { name: "Thin (100)", className: "font-thin" },
    { name: "Extra Light (200)", className: "font-extralight" },
    { name: "Light (300)", className: "font-light" },
    { name: "Normal (400)", className: "font-normal" },
    { name: "Medium (500)", className: "font-medium" },
    { name: "Semi Bold (600)", className: "font-semibold" },
    { name: "Bold (700)", className: "font-bold" },
    { name: "Extra Bold (800)", className: "font-extrabold" },
    { name: "Black (900)", className: "font-black" },
  ];

  const animationRef = useRef(null);

  useEffect(() => {
    // Animate the right column items
    if (animationRef.current) {
      anime({
        targets: animationRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 100 }), // Start animation slightly later
        easing: "easeOutQuad",
        duration: 600,
      });
    }

    // Animate the left column
    anime({
      targets: ".left-column-animate",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutQuad",
      duration: 600,
    });
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="left-column-animate flex flex-col items-center justify-center pt-4 text-center opacity-0 md:items-center md:text-center">
          <Type className="mb-4 h-16 w-16 text-primary" />
          <h1 className="font-pretendard text-2xl font-semibold">Pretendard</h1>
          <p className="mt-2 text-muted-foreground">
            pretentard 폰트를 사용합니다.
          </p>
          <div className="mt-4">
            <Link href="/design/color" legacyBehavior passHref>
              <button className="group cursor-pointer flex items-center justify-center">
                컬러 보기
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
        <div className="space-y-1 md:col-span-2" ref={animationRef}>
          {weights.map((weight) => (
            <div key={weight.name} className="opacity-0">
              <h2 className="mb-1 flex items-center font-pretendard text-sm font-medium text-muted-foreground">
                <Type className="mr-2 h-4 w-4 flex-shrink-0" />
                {weight.name}
              </h2>
              <p className={`font-pretendard text-xl ${weight.className}`}>
                The quick brown fox jumps over the lazy dog. 1234567890
              </p>
              <p className={`font-pretendard text-base ${weight.className}`}>
                가나다라마바사 아자차카타파하 ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FontScreen;
