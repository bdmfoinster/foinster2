"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

const categories = ["All", "Residential", "Commercial", "Interior", "Exterior", "Completed Projects"];

const galleryImages = [
  { id: 1, src: "/residential.png", alt: "Modern Villa Exterior", category: "Residential" },
  { id: 2, src: "/commercial.png", alt: "Commercial Plaza", category: "Commercial" },
  { id: 3, src: "/interior.png", alt: "Luxury Living Room", category: "Interior" },
  { id: 4, src: "/hero.png", alt: "Convention Center Architecture", category: "Exterior" },
  { id: 5, src: "/residential.png", alt: "Traditional Kerala Home", category: "Completed Projects" },
  { id: 6, src: "/commercial.png", alt: "Office Building Facade", category: "Exterior" },
  { id: 7, src: "/interior.png", alt: "Auditorium Interior", category: "Interior" },
  { id: 8, src: "/hero.png", alt: "Grand Entrance", category: "Completed Projects" },
  { id: 9, src: "/residential.png", alt: "Villa Pool Area", category: "Residential" }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory || (activeCategory === 'Completed Projects' && ['Residential', 'Commercial', 'Interior', 'Exterior'].includes(img.category)));

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading text-charcoal mb-8">
            Visual Gallery
          </h1>
          <p className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            Explore our curated portfolio of architectural excellence and meticulous interior design.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs md:text-sm uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-charcoal text-ivory shadow-lg" 
                  : "bg-ivory text-charcoal/70 border border-sand hover:bg-sand/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square w-full overflow-hidden group cursor-pointer shadow-premium"
                onClick={() => setSelectedImage(image)}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-ivory">
                  <ZoomIn size={48} className="mb-4 opacity-70" strokeWidth={1} />
                  <span className="font-heading text-xl">{image.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-ivory/70 hover:text-ivory transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={36} strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                fill 
                className="object-contain bg-black/20"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="text-ivory font-heading text-2xl">{selectedImage.alt}</p>
                <p className="text-ivory/70 text-sm uppercase tracking-widest">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
