"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ServicesClientProps } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function ServicesClient({ header, services }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<number | null>(11);
  const totalColumns = services.length + 3;

  const handleServiceClick = (serviceId: number) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="pt-16 bg-white relative overflow-hidden">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          {header.tag && (
            <div className="flex justify-center mb-6">
              <button className="border border-gray-300 text-gray-700 px-5 py-1 rounded-lg text-sm font-medium transition-colors">
                {header.tag}
              </button>
            </div>
          )}
          
          {header.title && (
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              <span className="text-secondary">{header.title}</span>{" "}
            </h2>
          )}

          {header.description && (
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-8 px-4">
              {header.description}
            </p>
          )}
        </div>

        {/* Services Grid - Desktop */}
        <div className="mt-16 hidden lg:block">
          <div 
            className="grid items-stretch gap-0"
            style={{ 
              gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))`,
              width: '100%'
            }}
          >
            {services.map((service) => {
              const isSelected = selectedService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  initial={false}
                  animate={{
                    gridColumn: isSelected ? `span 4` : `span 1`,
                  }}
                  transition={{ duration: 0 }}
                  className={`relative border-l-1 border-gray-200 bg-slate-100/50  overflow-hidden cursor-pointer`}
                  onHoverStart={() => {
                    if (!isSelected) {
                      handleServiceClick(service.id);
                    }
                  }}
                >
                  {!isSelected ? (
                    // Collapsed view - rotated text
                    <div className="h-[550px] flex items-center justify-center p-4">
                      <h3 className="text-2xl font-semibold text-secondary whitespace-nowrap transform -rotate-90 origin-center">
                        {service.title}
                      </h3>
                    </div>
                  ) : (
                    // Expanded view - image and description
                    <div 
                      className="relative h-[550px] bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${service.image})` }}
                    >
                      {/* Gradient Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-gradient-to-t from-[#b49b57]/110 via-[#b49b57]/60 to-transparent"
                        />
                      
                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-8"
                      >
                        <h3 className="text-3xl font-bold text-white mb-4">
                          {service.title}
                        </h3>
                        <p className="text-white/95 leading-relaxed text-base">
                          {service.description}
                        </p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile View - Swiper */}
        <div className="lg:hidden mt-8">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            speed={900}
            loop={true}
            centeredSlides={true}
            breakpoints={{
              768: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="services-swiper"
            style={{ paddingLeft: '20px', paddingRight: '20px' }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="relative rounded-2xl shadow-lg overflow-hidden h-[450px]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#b49b57]/110 via-[#b49b57]/60 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/95 leading-relaxed text-sm line-clamp-4">{service.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

