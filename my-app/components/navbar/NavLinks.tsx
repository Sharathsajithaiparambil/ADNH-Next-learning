"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "../providers/LenisContext";

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useLenis();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!lenis || pathname !== "/") return;

    let ticking = false;
    const sections = [
      { id: "home", offset: 0 },
      { id: "about-us", offset: 150 },
      { id: "services", offset: 150 },
      { id: "sectors", offset: 150 },
      { id: "contact-us", offset: 150 },
    ];

    const handleScroll = (e: any) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = e.scroll || window.scrollY;
          let currentSection = "home";
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i].id);
            if (section) {
              const rect = section.getBoundingClientRect();
              const sectionTop = rect.top + scrollY - sections[i].offset;

              if (scrollY >= sectionTop - 300) {
                currentSection = sections[i].id;
                break;
              }
            }
          }

          if (scrollY < 300) {
            currentSection = "home";
          }

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    const initialScroll = lenis.scroll || window.scrollY;
    handleScroll({ scroll: initialScroll });

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, pathname]);

  const scrollToSection = (sectionId: string) => {
    const scroll = () => {
      const section = document.getElementById(sectionId);
      if (section && lenis) {
        lenis.scrollTo(section, {
          offset: 0,
          duration: 2,
          easing: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
        });
        return true;
      }
      return false;
    };

    // Try immediately first
    if (!scroll()) {
      // If section not found, wait a bit for page to render, but limit retries
      let attempts = 0;
      const maxAttempts = 3; // Reduced from 10 to 3
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (sectionId === "home") {
      if (pathname === "/") {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    e.preventDefault();
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      router.push("/");
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => scrollToSection(sectionId), 300);
      });
    }
  };

  const links = [
    { href: "/", label: "HOME", sectionId: "home" },
    { href: "/", label: "ABOUT US", sectionId: "about-us" },
    { href: "/", label: "SERVICES", sectionId: "services" },
    { href: "/", label: "SECTORS", sectionId: "sectors" },
    { href: "/", label: "CONTACT US", sectionId: "contact-us" },
  ];

  return (
    <nav className="hidden lg:flex items-center gap-5 xl:gap-15">
      {links.map((link) => {
        // Use scroll-based active state on home page, pathname-based on other pages
        const isActive = pathname === "/"
          ? activeSection === link.sectionId
          : pathname === link.href;

        return (
          <Link
            key={link.sectionId}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.sectionId)}
            className={`nav-link text-lg uppercase transition-colors ${isActive ? "text-primary font-medium" : "text-gray-800 nav-link-hover"
              }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

