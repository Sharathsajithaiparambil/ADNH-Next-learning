"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { BrandModalProps } from "@/types";

export default function BrandModal({ brand, isOpen, onClose }: BrandModalProps) {
  if (!brand) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-blurred bg-opacity-50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-2xl z-50 overflow-y-auto rounded-tl-2xl rounded-bl-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-15 h-15 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <HiX className="w-7 h-7 text-gray-800" />
            </button>

            {/* Content */}
            <div className="p-8 lg:p-12">
              {/* Logo */}
              <div className="mb-8">
                <div className="relative w-48 h-32 mb-6">
                  <Image
                    src={brand.logo}
                    alt={brand.alt_text}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Thumbnail Image */}
              {brand.thumbnail && (
                <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden">
                  <Image
                    src={brand.thumbnail}
                    alt={brand.alt_text}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Description */}
              {brand.description && (
                <>
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 text-secondary ">{brand.name}</h2>
                </div>
                <div
                  className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: brand.description }}
                />
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

