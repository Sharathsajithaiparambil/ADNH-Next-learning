"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { BannerService, SlidingBannerData } from "@/types";

interface SlidingBannerClientProps {
    data: SlidingBannerData;
}

export default function SlidingBannerClient({ data }: SlidingBannerClientProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const services = data.services;
    const itemCount = services.length;

    // Define the overall timeline
    // 0.0 - 0.1: Initial State (Header + Centered Card Image)
    // 0.1 - 0.25: Zoom Phase (Card -> Full Screen, Header Fades, Lines Fade)
    // 0.25 - 1.0: Services Phase (Split equally among services)

    const zoomStart = 0.05;
    const zoomEnd = 0.2;
    const servicesStart = 0.2;

    // Header Animations
    const headerOpacity = useTransform(smoothProgress, [0, zoomStart], [1, 0]);
    const headerY = useTransform(smoothProgress, [0, zoomEnd], [0, -50]);

    // Image Zoom Logic (General for the first image)
    // Scale and dimension transforms to animate from a "card" to "full screen"
    const globalScale = useTransform(smoothProgress, [zoomStart, zoomEnd], [0.85, 1]);
    const globalBorderRadius = useTransform(smoothProgress, [zoomStart, zoomEnd], ["0.5rem", "0rem"]);
    const globalWidth = useTransform(smoothProgress, [zoomStart, zoomEnd], ["85%", "100%"]);
    const globalHeight = useTransform(smoothProgress, [zoomStart, zoomEnd], ["80vh", "100vh"]);

    return (
        <section ref={sectionRef} className="relative w-full bg-white" style={{ height: `${(itemCount + 1.5) * 100}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
                <motion.div
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="absolute top-0 left-0 right-0 z-40 text-center px-4 pointer-events-none pt-12"
                >
                    <div className="mb-3">
                        <span className="px-5  border border-gray-200 rounded-lg text-sm font-medium text-gray-500 bg-white">
                            {data.header.description}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-[#C5A059]">
                        {data.header.title}
                    </h2>
                </motion.div>

                {/* 2. Background Images (Transitions between services) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    {services.map((service, index) => (
                        console.log(service),
                        <BackgroundLayer
                            key={service.id}
                            image={service.image}
                            index={index}
                            total={itemCount}
                            progress={smoothProgress}
                            servicesStart={servicesStart}
                            zoomProps={{ globalScale, globalBorderRadius, globalWidth, globalHeight, zoomEnd }}
                        />
                    ))}
                </div>

                {/* 3. Text Overlay (Fixed per service) */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                    {services.map((service, index) => (
                        <ContentLayer
                            key={service.id}
                            service={service}
                            index={index}
                            total={itemCount}
                            progress={smoothProgress}
                            servicesStart={servicesStart}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

function BackgroundLayer({
    image,
    index,
    total,
    progress,
    servicesStart,
    zoomProps
}: {
    image: string;
    index: number;
    total: number;
    progress: any;
    servicesStart: number;
    zoomProps: any;
}) {
    const { globalScale, globalBorderRadius, globalWidth, globalHeight, zoomEnd } = zoomProps;

    // Each service gets a slice of [servicesStart, 1.0]
    const serviceSlice = (1 - servicesStart) / total;
    const start = servicesStart + (index * serviceSlice);
    const end = servicesStart + ((index + 1) * serviceSlice);

    // Visibility: Crossfade logic
    let opacity;
    if (index === 0) {
        // First image is visible from 0, fades out when second image arrives
        opacity = useTransform(progress, [end - 0.05, end], [1, 0]);
    } else {
        // Following images fade in and then out
        opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, index === total - 1 ? 1 : 0]);
    }

    // Cross line opacity (only for the first image during the initial zoom)
    const crossLineOpacity = useTransform(progress, [0, zoomEnd * 0.8], [1, 0]);

    // Transition zoom for non-first images
    const activeProgress = useTransform(progress, [start, end], [0, 1]);
    const subScale = useTransform(activeProgress, [0, 1], [1.1, 1.0]);

    return (
        <motion.div
            style={{
                opacity,
                scale: index === 0 ? globalScale : subScale,
                borderRadius: index === 0 ? globalBorderRadius : "0px",
                width: index === 0 ? globalWidth : "100%",
                height: index === 0 ? globalHeight : "100vh",
            }}
            className="absolute overflow-hidden shadow-2xl flex items-center justify-center bg-black"
        >
            <Image
                src={image}
                alt="Banner Background"
                fill
                className="object-cover"
                priority={index === 0}
            />

            {/* Cross Lines Overlay (Only for first image during zoom) */}
            {index === 0 && (
                <motion.div
                    style={{ opacity: crossLineOpacity }}
                    className="absolute inset-0 pointer-events-none z-10"
                >
                    <div className="absolute top-1/3 w-full h-px bg-white/40" />
                    <div className="absolute top-2/3 w-full h-px bg-white/40" />
                    <div className="absolute left-1/3 h-full w-px bg-white/40" />
                    <div className="absolute left-2/3 h-full w-px bg-white/40" />
                </motion.div>
            )}

            {/* Dark Overlay for content readability (Fades in as zoom completes) */}
            <motion.div
                style={{ opacity: useTransform(progress, [zoomEnd - 0.1, zoomEnd], [0, 0.6]) }}
                className="absolute inset-0 bg-black z-20 pointer-events-none"
            />
        </motion.div>
    );
}

function ContentLayer({ service, index, total, progress, servicesStart }: {
    service: BannerService;
    index: number;
    total: number;
    progress: any;
    servicesStart: number;
}) {
    const serviceSlice = (1 - servicesStart) / total;
    const start = servicesStart + (index * serviceSlice);
    const end = servicesStart + ((index + 1) * serviceSlice);

    // Within this service's slice:
    // 0.0 - 0.2: Content Fade In
    // 0.2 - 0.8: Read Phase (Highlights)
    // 0.8 - 1.0: Content Fade Out

    const relativeProgress = useTransform(progress, [start, end], [0, 1]);
    const contentOpacity = useTransform(relativeProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const contentY = useTransform(relativeProgress, [0, 0.2], [50, 0]);

    return (
        <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 flex flex-col items-start justify-end p-10 md:p-24 pb-32"
        >
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-8 border-l-4 border-[#C5A059] pl-6">
                {service.title}
            </h3>

            <div className="text-xl md:text-3xl text-white/40 leading-relaxed font-light max-w-5xl">
                <HighlightedText
                    content={service.description}
                    progress={relativeProgress}
                    range={[0.2, 0.8]}
                />
            </div>
        </motion.div>
    );
}

function HighlightedText({ content, progress, range }: { content: string; progress: any; range: [number, number] }) {
    const cleanText = useMemo(() => content.replace(/<[^>]+>/g, ''), [content]);
    const words = useMemo(() => cleanText.split(/\s+/), [cleanText]);
    const [start, end] = range;
    const step = (end - start) / words.length;

    return (
        <p className="flex flex-wrap gap-x-3 gap-y-2">
            {words.map((word, i) => {
                const wordStart = start + (i * step);
                const wordEnd = wordStart + step;

                const wordOpacity = useTransform(
                    progress,
                    [wordStart, wordEnd],
                    [0.25, 1]
                );

                return (
                    <motion.span
                        key={i}
                        style={{ opacity: wordOpacity }}
                        className="text-white"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </p>
    );
}
