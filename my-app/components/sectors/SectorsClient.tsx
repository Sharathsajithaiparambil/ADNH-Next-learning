"use client";

import { SectorsClientProps, Sector } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SectorsClient({ title, description, short_description, sectors }: SectorsClientProps) {

  return (
    <section className="py-16 bg-[#fcfaf7] relative overflow-hidden">
      <div className="container mx-auto px-4 container-padding relative z-10">
        <div className="w-full mx-auto">
          {short_description && (
            <div className="flex justify-center mb-8">
              <button className="border border-gray-300 text-gray-700 px-5 py-1 rounded-lg text-sm font-medium transition-colors">
                {short_description}
              </button>
            </div>
          )}

          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-4xl xl:text-4xl font-serif">
              <span className="text-secondary font-bold">The Story Behind </span>
              <span className="text-primary font-bold">
                {title?.replace("The Story Behind ", " ") || title}
              </span>
            </h3>
          </div>

          {description && (
            <div
              className="text-lg lg:text-xl text-gray-800 px-4 lg:px-12 leading-relaxed space-y-1 text-center prose prose-lg max-w-none prose-p:text-gray-800 prose-p:text-center mb-12"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Sectors Swiper */}
          <div className="mt-16">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              speed={900}
              loop={true}
              loopAdditionalSlides={3}
              centeredSlides={true}
              breakpoints={{
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 32,
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
              {sectors.map((sector, index) => (
                <SwiperSlide key={(sector as Sector)._uniqueKey || `${sector.id}-${index}`}>
                  <div className="relative rounded-2xl shadow-lg overflow-hidden h-[450px] lg:h-[600px] w-full lg:w-[400px]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${sector.horizontal_thumbnail})` }}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                      <h3 className="text-2xl font-bold text-white">{sector.name}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

