"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DesktopImageRowProps, ImageItem } from "@/types";

export default function DesktopImageRow({ items, autoSwapInterval = 3000 }: DesktopImageRowProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-swap functionality
  useEffect(() => {
    if (items.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setExpandedIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoSwapInterval);

    return () => clearInterval(interval);
  }, [items.length, autoSwapInterval, isPaused]);

  return (
    <div className="flex gap-4 w-full h-[750px]">
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        
        return (
          <motion.div
            key={item.id}
            className="relative overflow-hidden rounded-2xl cursor-pointer"
            onMouseEnter={() => {
              setIsPaused(true);
              setExpandedIndex(index);
            }}
            onMouseLeave={() => setIsPaused(false)}
            initial={false}
            animate={{
              flex: isExpanded ? 1 : 0.25,
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isExpanded ? 1 : 1.2,
              }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={600}
                className="w-full h-full object-cover"
                unoptimized
              />
            </motion.div>

            <motion.div
              animate={{
                opacity: isExpanded ? 0 : 0.5,
              }}
              transition={{
                duration: 1.5,
              }}
              className="absolute inset-0 bg-black pointer-events-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

