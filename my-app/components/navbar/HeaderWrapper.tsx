"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/LenisContext";
import HeaderContent from "./HeaderContent";
import { HeaderWrapperProps } from "@/types";

export default function HeaderWrapper({ logoUrl }: HeaderWrapperProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: any) => {
      const currentScrollY = e.scroll;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -112,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <HeaderContent logoUrl={logoUrl} isScrolled={isScrolled} />
    </motion.header>
  );
}

