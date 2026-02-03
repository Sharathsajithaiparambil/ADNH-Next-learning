"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BrandModal from "./BrandModal";
import { OurBrandsClientProps, Brand } from "@/types";

export default function OurBrandsClient({ brands }: OurBrandsClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedBrand(null);
    }, 300);
  };

  return (
    <>
      <section id="our-brands" className="py-16 bg-[#fcfaf7]">
        <div className="container mx-auto px-4 container-padding">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-serif text-secondary font-bold mb-4"
            >
              Our Brands
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-0.5 bg-secondary mx-auto"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleBrandClick(brand)}
              >
                <div className="relative w-full md:h-25 lg:h-28 mb-4">
                  <Image
                    src={brand.logo}
                    alt={brand.alt_text}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BrandModal
        brand={selectedBrand}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

