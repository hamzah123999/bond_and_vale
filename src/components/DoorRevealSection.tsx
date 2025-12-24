"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type DoorRevealSectionProps = {
  children: React.ReactNode;
  className?: string;
  background?: React.ReactNode;
  heightVh?: number;
  enable3D?: boolean;
};

export default function DoorRevealSection({
  children,
  background,
  className = "",
  heightVh = 220,
  enable3D = true,
}: DoorRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const openEnd = 0.55;

  const topY = useTransform(scrollYProgress, [0, openEnd], ["0%", "-122%"]);
  const bottomY = useTransform(scrollYProgress, [0, openEnd], ["0%", "122%"]);

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, openEnd], [24, 0]);

  const sceneOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const topRotateX = useTransform(
    scrollYProgress,
    [0, openEnd],
    [enable3D ? 10 : 0, 0]
  );
  const bottomRotateX = useTransform(
    scrollYProgress,
    [0, openEnd],
    [enable3D ? -10 : 0, 0]
  );

  const sceneScale = useTransform(
    scrollYProgress,
    [0, openEnd],
    [enable3D ? 1.015 : 1, 1]
  );

  const seamOpacity = useTransform(scrollYProgress, [0, 0.08, openEnd], [0, 1, 0.85]);

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-x-clip ${className}`}
      style={{ height: `${heightVh}vh`, overflowX: "clip" }}
    >
      <motion.div
        style={{
          opacity: sceneOpacity,
          scale: sceneScale,
          perspective: enable3D ? 1600 : undefined,
          transformStyle: "preserve-3d",
        }}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden overflow-x-clip"
      >

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-[2] flex items-center justify-center px-6"
        >
          <div className="max-w-3xl text-center">{children}</div>
        </motion.div>

        <motion.div
          style={{
            y: topY,
            rotateX: topRotateX,
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
            boxShadow: enable3D ? "0 30px 60px rgba(0,0,0,0.20)" : undefined,
          }}
          className="absolute left-0 top-0 z-[3] h-1/2 w-full overflow-hidden"
        >
          <div className="h-[200%] w-full">{background}</div>
        </motion.div>

        <motion.div
          style={{
            y: bottomY,
            rotateX: bottomRotateX,
            transformOrigin: "top",
            transformStyle: "preserve-3d",
            boxShadow: enable3D ? "0 -30px 60px rgba(0,0,0,0.20)" : undefined,
          }}
          className="absolute left-0 bottom-0 z-[3] h-1/2 w-full overflow-hidden"
        >
          <div className="-translate-y-1/2 h-[200%] w-full">{background}</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
