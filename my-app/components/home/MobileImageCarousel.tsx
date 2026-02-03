"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MobileImageCarouselProps, ImageItem } from "@/types";

export default function MobileImageCarousel({
  items,
  interval = 3000,
}: MobileImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-switch images
  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentItem.mobileImage || ""}
            alt={currentItem.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

