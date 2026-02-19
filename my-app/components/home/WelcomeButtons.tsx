"use client";

import { HiArrowRight } from "react-icons/hi";
import { useLenis } from "../providers/LenisContext";

export default function WelcomeButtons() {
  const { lenis } = useLenis();

  const scrollToSection = (sectionId: string) => {
    const scroll = () => {
      const section = document.getElementById(sectionId);
      if (section && lenis) {
        lenis.scrollTo(section, {
          offset: 0,
          duration: 5,
          easing: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
        });
        return true;
      }
      return false;
    };

    // Try immediately first
    if (!scroll()) {
      // If section not found, wait a bit for page to render
      let attempts = 0;
      const maxAttempts = 3;
      const retry = setTimeout(() => {
        const checkSection = () => {
          attempts++;
          if (scroll() || attempts >= maxAttempts) {
            return;
          }
          setTimeout(checkSection, 100);
        };
        checkSection();
      }, 100);
    }
  };

  const handleGetInTouch = () => {
    scrollToSection("contact-us");
  };

  const handleExploreMore = () => {
    scrollToSection("services");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-0 items-start">
      <button 
        onClick={handleGetInTouch}
        className="btn-primary text-white px-6 py-3 rounded-lg text-xl font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-95 whitespace-nowrap flex items-center gap-2"
      >
        Get In Touch
        <HiArrowRight className="text-xl" />
      </button>
      <button
        onClick={handleExploreMore}
        className="text-primary px-6 py-3 rounded-lg text-xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-95 font-semibold hover:text-secondary transition-colors flex items-center gap-2"
      >
        Explore More
        <HiArrowRight className="text-xl" />
      </button>
    </div>
  );
}

