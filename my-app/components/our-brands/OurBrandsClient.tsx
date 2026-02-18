"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
              className="text-4xl lg:text-5xl font-serif text-secondary font-bold mb-3"
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

          {/* Mobile Swiper */}
          <div className="lg:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              speed={900}
              breakpoints={{
                767: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="brands-swiper"
            >
              {brands.map((brand, index) => (
                <SwiperSlide key={brand.id}>
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex flex-col items-center justify-center p-4 cursor-pointer h-full"
                    onClick={() => handleBrandClick(brand)}
                  >
                    <div className="relative w-full h-24 mb-4">
                      <Image
                        src={brand.logo}
                        alt={brand.alt_text}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                <div className="relative w-full h-32 lg:h-36 mb-4">
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

