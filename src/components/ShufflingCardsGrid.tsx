"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type CardItem = {
  id: string;
  type?: "logo" | "image";
  title?: string;
  img?: string;
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickUniqueIndices(count: number, maxExclusive: number) {
  const set = new Set<number>();
  while (set.size < count) set.add(randInt(0, maxExclusive - 1));
  return Array.from(set);
}

function swap<T>(arr: T[], i: number, j: number) {
  const next = [...arr];
  const tmp = next[i];
  next[i] = next[j];
  next[j] = tmp;
  return next;
}

const items = [
  { id: "image1", type: "image", img: "/company/img1.webp" },
  { id: "image2", type: "image", img: "/company/img2.webp" },
  { id: "image3", type: "image", img: "/company/img3.webp" },
  { id: "image4", type: "image", img: "/company/img4.webp" },
  { id: "image5", type: "image", img: "/company/img5.webp" },
  { id: "image6", type: "image", img: "/company/img6.webp" },
  { id: "image7", type: "image", img: "/company/img7.webp" },
  { id: "image8", type: "image", img: "/company/img8.webp" },
  { id: "image9", type: "image", img: "/company/img9.webp" },
  { id: "image10", type: "image", img: "/company/img10.webp" },
  { id: "image11", type: "image", img: "/company/img11.webp" },
  { id: "image12", type: "image", img: "/company/img12.webp" }
] satisfies CardItem[];

export default function ShufflingCardsGrid({
  intervalMs = 2200,
  movesPerTick = 3,
  animDuration = 1.2,
  className = "",
}: {
  intervalMs?: number;
  movesPerTick?: number;
  animDuration?: number;
  className?: string;
}) {
  const [order, setOrder] = useState(items.map((i) => i.id));
  const [enableShuffle, setEnableShuffle] = useState(false);

  const byId = useMemo(() => {
    const map = new Map<string, CardItem>();
    items.forEach((i) => map.set(i.id, i));
    return map;
  }, [items]);

  useEffect(() => {
    setOrder(items.map((i) => i.id));
  }, [items]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnableShuffle(mq.matches);

    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (!enableShuffle) {
      setOrder(items.map((i) => i.id));
      return;
    }

    const t = setInterval(() => {
      setOrder((prev) => {
        const n = prev.length;
        if (n < 2) return prev;

        const swaps = Math.min(
          Math.max(movesPerTick, 1),
          Math.floor(n / 2)
        );

        let next = [...prev];

        for (let s = 0; s < swaps; s++) {
          const [i, j] = pickUniqueIndices(2, n);
          next = swap(next, i, j);
        }

        return next;
      });
    }, intervalMs);

    return () => clearInterval(t);
  }, [enableShuffle, intervalMs, movesPerTick, items]);

  const orderedItems = order.map((id) => byId.get(id)!).filter(Boolean);

  return (
    <div className={className}>
      <div className="grid md:gap-5 gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {orderedItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            transition={{
              duration: animDuration,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="aspect-square w-full border border-black/20 bg-[#e6d7c4] overflow-hidden flex items-center justify-center"
          >
            {item.type === "image" && item.img ? (
              <img
                src={item.img}
                alt={item.title ?? "card"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="px-4 text-center font-serif text-[#23352d] text-[clamp(16px,1.2vw,22px)] whitespace-pre-line">
                {item.title}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}