"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;

  /**
   * How much it moves (px). Example: 60 means it moves from +60 to -60.
   */
  strength?: number;

  /**
   * Direction:
   *  1  => normal (moves up as you scroll down)
   * -1  => inverted (moves down as you scroll down)
   */
  direction?: 1 | -1;
};

export default function ParallaxSection({
  children,
  className = "",
  strength = 60,
  direction = 1,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"], // element enters -> leaves viewport
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [strength * direction, -strength * direction]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
