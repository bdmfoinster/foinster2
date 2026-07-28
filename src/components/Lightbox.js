"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }) {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onNavigate("prev");
    if (e.key === "ArrowRight") onNavigate("next");
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("prev");
            }}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white z-50 p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all hidden md:flex"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("next");
            }}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white z-50 p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all hidden md:flex"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/80 font-medium tracking-widest text-sm z-50 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image Container with Swipe */}
          <motion.div
            key={currentIndex}
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                onNavigate("next");
              } else if (swipe > 10000) {
                onNavigate("prev");
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center"
            >
              <Image
                src={currentImage}
                alt={`Residential Project ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
          
          {/* Mobile Nav Overlay */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:hidden z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("prev");
              }}
              className="text-white bg-black/40 p-4 rounded-full backdrop-blur-md"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("next");
              }}
              className="text-white bg-black/40 p-4 rounded-full backdrop-blur-md"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
