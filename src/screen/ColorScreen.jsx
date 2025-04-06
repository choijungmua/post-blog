"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { Palette, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const colors = [
  {
    name: "Background",
    className: "bg-background",
    textColor: "text-foreground",
  },
  {
    name: "Foreground",
    className: "bg-foreground",
    textColor: "text-background",
  },
  { name: "Card", className: "bg-card", textColor: "text-card-foreground" },
  {
    name: "Card Foreground",
    className: "bg-card-foreground",
    textColor: "text-card",
  },
  {
    name: "Popover",
    className: "bg-popover",
    textColor: "text-popover-foreground",
  },
  {
    name: "Popover Foreground",
    className: "bg-popover-foreground",
    textColor: "text-popover",
  },
  {
    name: "Primary",
    className: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    name: "Primary Foreground",
    className: "bg-primary-foreground",
    textColor: "text-primary",
  },
  {
    name: "Secondary",
    className: "bg-secondary",
    textColor: "text-secondary-foreground",
  },
  {
    name: "Secondary Foreground",
    className: "bg-secondary-foreground",
    textColor: "text-secondary",
  },
  { name: "Muted", className: "bg-muted", textColor: "text-muted-foreground" },
  {
    name: "Muted Foreground",
    className: "bg-muted-foreground",
    textColor: "text-muted",
  },
  {
    name: "Accent",
    className: "bg-accent",
    textColor: "text-accent-foreground",
  },
  {
    name: "Accent Foreground",
    className: "bg-accent-foreground",
    textColor: "text-accent",
  },
  {
    name: "Destructive",
    className: "bg-destructive",
    textColor: "text-destructive-foreground",
  },
  {
    name: "Destructive Foreground",
    className: "bg-destructive-foreground",
    textColor: "text-destructive",
  },
  { name: "Border", className: "border border-border", isBorder: true },
  { name: "Input", className: "border border-input", isBorder: true },
  { name: "Ring", className: "border border-ring", isBorder: true },
];

function ColorScreen() {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      anime({
        targets: animationRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(50, { start: 100 }),
        easing: "easeOutQuad",
        duration: 500,
      });
    }

    anime({
      targets: ".left-column-animate",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutQuad",
      duration: 600,
    });
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="left-column-animate flex flex-col items-center justify-center pt-4 text-center opacity-0 md:items-center md:text-center">
          <Palette className="mb-4 h-16 w-16 text-primary" />
          <h1 className="font-pretendard text-2xl font-semibold">Colors</h1>
          <p className="mt-2 text-muted-foreground">
            프로젝트에서 사용되는 기본 색상 팔레트입니다.
          </p>
          <div className="mt-4">
            <Link href="/design/font" legacyBehavior passHref>
              <button className="group cursor-pointer flex items-center justify-center">
                폰트 보기
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-2 md:col-span-2 md:grid-cols-3"
          ref={animationRef}
        >
          {colors.map((color) => (
            <div key={color.name} className="opacity-0">
              <div
                className={cn(
                  "flex h-20 items-center justify-center rounded-md p-2 text-sm font-medium shadow-sm",
                  color.isBorder ? "bg-background" : color.className,
                  !color.isBorder && color.textColor
                )}
              >
                {color.isBorder ? (
                  <div
                    className={cn("h-full w-full rounded-sm", color.className)}
                  ></div>
                ) : (
                  <span>{color.name}</span>
                )}
              </div>
              <p className="mt-1.5 text-center text-xs text-muted-foreground">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorScreen;
