"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollAnimatedImagesProps, AnimatedImageItemProps, ImageItem } from "@/types";

function AnimatedImageItem({ item, index }: AnimatedImageItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        rotateX,
      }}
      className="relative overflow-hidden rounded-xl"
    >
      {/* Desktop Image */}
      <div className="hidden md:block relative w-full h-[500px] lg:h-[450px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-2xl"
          unoptimized
        />
      </div>

      {/* Mobile Image */}
      {item.mobileImage && (
        <div className="md:hidden relative w-full h-[300px]">
          <Image
            src={item.mobileImage}
            alt={item.title}
            fill
            className="object-cover rounded-2xl"
            unoptimized
          />
        </div>
      )}
    </motion.div>
  );
}

export default function ScrollAnimatedImages({ items }: ScrollAnimatedImagesProps) {
  if (!items || items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
      {items.map((item, index) => (
        <AnimatedImageItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

