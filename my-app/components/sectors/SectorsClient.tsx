"use client";

import { SectorsClientProps, Sector } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SectorsClient({ title, description, short_description, sectors }: SectorsClientProps) {
  const swiperRef = useRef<any>(null);
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(1);
  
  const handleCurve = (swiper: any) => {
    swiper.slides.forEach((slide: HTMLElement, index: number) => {
      // @ts-ignore
      const progress = slide.progress;
      const offset = progress;
      const translateY = Math.abs(offset) * 45;
      slide.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
  };

  return (
    <section className="py-16 bg-[#fcfaf7] relative overflow-hidden">
      <div className="relative z-10">
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
              className="text-lg lg:text-xl text-gray-800 px-4 lg:px-50 leading-relaxed space-y-1 text-center prose prose-lg max-w-none prose-p:text-gray-800 prose-p:text-center mb-12"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Sectors Swiper */}
          <div className="mt-16">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              speed={1500}
              loop={true}
              loopAdditionalSlides={3}
              centeredSlides={true}
              watchSlidesProgress={true}
              onSwiper={(s) => {
                swiperRef.current = s;
                const real = s.realIndex ?? s.activeIndex ?? 0;
                setActiveSlide(sectors[real]?.id ?? 1);
                handleCurve(s);
              }}
              onProgress={(s) => handleCurve(s)}
              onSlideChange={(s) => setActiveSlide(sectors[s.realIndex]?.id ?? 1)}
              onSetTransition={(s, duration) => {
                s.slides.forEach((slide: HTMLElement) => {
                  slide.style.transition = `${duration}ms`;
                });
              }}
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
                  slidesPerView: 2.3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3.3,
                  spaceBetween: 24,
                },
                1500: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="services-swiper pb-25!"
              style={{ paddingLeft: '20px', paddingRight: '20px' }}
            >
              {sectors.map((sector, index) => {
                const isActive = activeSlide === sector.id;

                return (
                  <SwiperSlide key={(sector as Sector)._uniqueKey || `${sector.id}-${index}`}>
                    <div
                      onClick={() => {
                        if (isActive) {
                          router.push(`/sectors/${sector.slug}`);
                        } else {
                          swiperRef.current?.slideToLoop(index);
                        }
                      }}
                      className="group opacity-85 text-center relative rounded-2xl shadow-lg overflow-hidden h-[450px] lg:h-[600px] w-full lg:w-100 cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1500 ease-in-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${sector.horizontal_thumbnail})` }}
                      />
                      <div className={`absolute inset-0 ${isActive ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' : 'bg-transparent'}`} />
                      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 text-white">
                        <h3 className="text-3xl font-bold">{sector.name}</h3>

                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.div
                              key="active-content"
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="mt-3"
                            >
                              <p className="text-lg text-white/90 leading-relaxed">
                                {sector.place_holder}
                              </p>

                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-center"
                              >
                                <div className="p-3 rounded-full transition-all duration-300 group-hover:bg-white/10 backdrop-blur-sm">
                                  <ArrowUpRight size={50} />
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>

                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

