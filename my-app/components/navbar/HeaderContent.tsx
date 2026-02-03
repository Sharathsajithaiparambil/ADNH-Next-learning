"use client";

import Image from "next/image";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { HeaderContentProps } from "@/types";

export default function HeaderContent({ logoUrl, isScrolled = false }: HeaderContentProps) {
  return (
    <div className={`${isScrolled ? "bg-white" : "bg-slate-100"} py-4 transition-colors duration-300`}>
      <div className="h-full mx-auto flex items-center justify-between container container-padding">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src={logoUrl}
            alt="ADNH Catering"
            width={200}
            height={100}
            className="h-20 w-auto"
            unoptimized
          />
        </div>

        <NavLinks />
        <button className="hidden lg:block btn-primary text-white px-4 py-2 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-95 flex-shrink-0 whitespace-nowrap">
          Investor Relations
        </button>
        <MobileMenu logoUrl={logoUrl} />
      </div>
    </div>
  );
}

