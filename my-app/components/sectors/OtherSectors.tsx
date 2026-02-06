"use client";

import { Sector } from "@/types";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRouter } from "next/navigation";

export default function OtherSectors({
    sectors,
    currentSectorId,
}: {
    sectors: Sector[];
    currentSectorId: number;
}) {
    const router = useRouter();
    const otherSectors = sectors.filter((sector) => sector.id !== currentSectorId);

    return (
        <section className="py-16 bg-[#fcfaf7]">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-serif text-secondary mb-12">
                    <span className="font-bold border-b-2 border-primary/30 pb-2">Other Sectors</span>
                </h2>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="w-full pb-10"
                >
                    {otherSectors.map((sector) => (
                        <SwiperSlide key={sector.id} className="h-auto">
                            <div
                                onClick={() => router.push(`/sectors/${sector.slug}`)}
                                className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] w-full cursor-pointer"
                            >
                                <Image
                                    src={sector.vertical_thumbnail}
                                    alt={sector.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex flex-col gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-3xl font-bold font-serif">{sector.name}</h3>

                                    <div className="overflow-hidden max-h-0 group-hover:max-h-[200px] transition-all duration-500 ease-in-out">
                                        <p className="text-white/90 line-clamp-3 text-sm leading-relaxed mb-4">
                                            {sector.place_holder}
                                        </p>
                                        <div className="flex items-center text-[#BFA658] font-semibold tracking-wide uppercase text-sm">
                                            Read More
                                            <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
