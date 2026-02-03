"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "../providers/LenisContext";

export default function NavLinks() {
  const pathname = usePathname();
  const { lenis } = useLenis();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!lenis || pathname !== "/") return;

    const handleScroll = (e: any) => {
      const scrollY = e.scroll || window.scrollY;
      const sections = [
        { id: "home", offset: 0 },
        { id: "about-us", offset: 150 },
      ];

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
    };

    const initialScroll = lenis.scroll || window.scrollY;
    handleScroll({ scroll: initialScroll });

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, pathname]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.2,
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleAboutUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const aboutUsSection = document.getElementById("about-us");
      if (aboutUsSection && lenis) {
        lenis.scrollTo(aboutUsSection, {
          offset: 0,
          duration: 1.2,
        });
      }
    }
  };

  const links = [
    { href: "/", label: "HOME", sectionId: "home", onClick: handleHomeClick },
    { href: "/about-us", label: "ABOUT US", sectionId: "about-us", onClick: handleAboutUsClick },
    { href: "/services", label: "SERVICES", sectionId: "services", onClick: undefined },
    { href: "/sectors", label: "SECTORS", sectionId: "sectors", onClick: undefined },
    { href: "/contact-us", label: "CONTACT US", sectionId: "contact-us", onClick: undefined },
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
            key={link.href}
            href={link.href}
            onClick={link.onClick}
            className={`nav-link text-lg uppercase transition-colors ${
              isActive ? "text-primary font-medium" : "text-gray-800 nav-link-hover"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

