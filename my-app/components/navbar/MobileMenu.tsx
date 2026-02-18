"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { useLenis } from "../providers/LenisContext";
import { MobileMenuProps } from "@/types";

export default function MobileMenu({ logoUrl }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useLenis();
  const fallbackLogo = "/images/Icon/logo_dark_logo-dark_1769083126 (2).svg";
  const displayLogoUrl = logoUrl || fallbackLogo;

  const links = [
    { href: "/", label: "HOME", sectionId: "home" },
    { href: "/", label: "ABOUT US", sectionId: "about-us" },
    { href: "/", label: "SERVICES", sectionId: "services" },
    { href: "/", label: "SECTORS", sectionId: "sectors" },
    { href: "/", label: "CONTACT US", sectionId: "contact-us" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const scroll = () => {
      const section = document.getElementById(sectionId);
      if (section && lenis) {
        lenis.scrollTo(section, {
          offset: 0,
          duration: 1.2,
        });
        return true;
      }
      return false;
    };

    if (!scroll()) {
      // Retry with increasing delays
      let attempts = 0;
      const maxAttempts = 10;
      const retry = setInterval(() => {
        attempts++;
        if (scroll() || attempts >= maxAttempts) {
          clearInterval(retry);
        }
      }, 100);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (sectionId === "home") {
      if (pathname === "/") {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      } else {
        closeMenu();
      }
      return;
    }

    e.preventDefault();
    closeMenu();
    if (pathname === "/") {
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      router.push("/");
      setTimeout(() => scrollToSection(sectionId), 300);
    }
  };

  return (
    <div className="lg:hidden">
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 focus:outline-none z-50 relative"
          aria-label="Toggle menu"
        >
          <HiMenu className="w-5 h-5 text-black transition-all duration-300" />
        </button>
      )}

      <div
        className={`fixed inset-0 bg-blurred bg-opacity-20 backdrop-blur-md z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-100 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out rounded-tl-2xl rounded-bl-2xl flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Image
              src={displayLogoUrl}
              alt="ADNH Catering"
              width={160}
              height={80}
              className="h-20 w-auto"
              unoptimized
            />
          </div>
          <button
            onClick={closeMenu}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition"
            aria-label="Close menu"
          >
            <span className="text-3xl text-gray-600 font-medium">×</span>
          </button>
        </div>

        <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === "/" && link.sectionId === "home"
              ? true
              : pathname === "/" && link.sectionId !== "home"
                ? false
                : pathname === link.href;

            return (
              <Link
                key={link.sectionId}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className={`px-6 py-2 mx-7 my-2 text-lg uppercase transition-all duration-200 rounded ${isActive
                  ? "text-gray-800 font-medium bg-gray-200"
                  : "text-gray-800 bg-gray-100 hover:bg-gray-150"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <button className="btn-primary text-white w-full px-3 py-2 rounded-2xl text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-95">
            Investor Relations
          </button>
        </div>
      </div>
    </div>
  );
}

