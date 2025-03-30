"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { animation } from "@/lib/anime";
import { Button } from "@/components/shadcn";
import { ArrowRightIcon } from "lucide-react";
function DashboardHeader() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    animation.textRotateAndShow([
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
    ]);
  }, []);

  return (
    <section className="flex flex-col items-start">
      <Button
        variant="ghost"
        className="group hover:!bg-transparent hover:!text-current hover:![border:none] hover:![box-shadow:none]"
      >
        <span className="relative z-10">Click me</span>
        <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
      </Button>
      <div>
        <section>
          <div>
            {/* 첫번째 텍스트 라인 */}
            <div className="overflow-hidden mb-4">
              <div
                ref={line1Ref}
                style={{ opacity: 0 }}
                className="text-4xl font-bold"
              >
                Building my own UI language
              </div>
            </div>
            {/* 두번째 텍스트 라인 */}
            <div className="overflow-hidden">
              <div
                ref={line2Ref}
                style={{ opacity: 0 }}
                className="font-semibold text-xl"
              >
                Exploring design systems, component architecture,
              </div>
            </div>
            {/* 세번째 텍스트 라인 */}
            <div className="overflow-hidden">
              <div
                ref={line3Ref}
                style={{ opacity: 0 }}
                className="font-semibold text-xl"
              >
                and the future of frontend. A personal journey through code,
                pattern, and open thinking.
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default DashboardHeader;

// ⌘
