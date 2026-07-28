"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "./Lightbox";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function MasonryGallery({ images }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // slight delay to allow exit animation before nullifying index
    setTimeout(() => setCurrentIndex(null), 300);
  };

  const navigateLightbox = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 pb-20">
        {images.map((src, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="break-inside-avoid"
          >
            <div 
              className="relative w-full cursor-pointer overflow-hidden rounded-sm bg-sand/20 shadow-sm transition-all duration-500 hover:shadow-xl group"
              onClick={() => openLightbox(index)}
            >
              {/* Using a placeholder ratio to prevent CLS before load, but we don't know the exact ratio.
                  Next.js Image with layout="responsive" is deprecated in 13+, so we use standard styling for masonry. 
                  In standard masonry, we can just render the image natively or let Next.js figure out width/height.
                  Since we need width/height for next/image without fill, or we use standard img tag, 
                  Next.js allows omitting width/height if using layout fill, but in masonry heights vary. 
                  To solve CLS in masonry without knowing dimensions, we can use an empty div with padding, but we don't have dimensions.
                  Alternatively, we can use a standard HTML img tag for the masonry flow to determine height naturally, but Next.js Image is better for optimization.
                  Let's use Next.js Image with style={{ width: '100%', height: 'auto' }} and generic dimensions that scale.
              */}
              <Image
                src={src}
                alt={`Residential Project ${index + 1}`}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-auto object-cover transition-transform duration-700 ease-[0.25,0.46,0.45,0.94] group-hover:scale-[1.03]"
                loading={index < 8 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox 
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
}
