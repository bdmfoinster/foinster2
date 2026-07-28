"use client";

import { useState } from "framer-motion"; // actually need react
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MasonryGallery from "@/components/MasonryGallery";

const residentialGalleryImages = [
  "/images/projects/residential/p2_KTN02.png",
  "/images/projects/residential/p2_KTN03.png",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.17.jpeg",
  "/images/projects/residential/p2_KTN01.png",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.14 (1).jpeg",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.15 (1).jpeg",
  "/images/projects/residential/p1_EX01.jpg",
  "/images/projects/residential/p1_DSC00948.JPG",
  "/images/projects/residential/p2_UPS01.png",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.16.jpeg",
  "/images/projects/residential/p1_EX02.png",
  "/images/projects/residential/p2_UPS02.png",
  "/images/projects/residential/p2_ST02.png",
  "/images/projects/residential/p1_DSC01005.JPG",
  "/images/projects/residential/p1_DSC01011.JPG",
  "/images/projects/residential/p2_ST01.png",
  "/images/projects/residential/p1_DSC00912.JPG",
  "/images/projects/residential/p1_DSC00847-HDR.JPG",
  "/images/projects/residential/p1_DSC00888.JPG",
  "/images/projects/residential/p2_TVU01.png",
  "/images/projects/residential/p2_TVU02.png",
  "/images/projects/residential/p2_TVU03.png",
  "/images/projects/residential/p2_EX02.png",
  "/images/projects/residential/p2_LV01.png",
  "/images/projects/residential/p1_DSC00924.JPG",
  "/images/projects/residential/p2_EX03.png",
  "/images/projects/residential/p1_DSC00879.JPG",
  "/images/projects/residential/p2_BR01.png",
  "/images/projects/residential/p1_DSC01032.JPG",
  "/images/projects/residential/p2_LV02.png",
  "/images/projects/residential/p2_EX01.jpg",
  "/images/projects/residential/p2_LV03.png",
  "/images/projects/residential/p2_BR02.png",
  "/images/projects/residential/p1_DSC00885.JPG",
  "/images/projects/residential/p2_EX04.png",
  "/images/projects/residential/p2_DN01.png",
  "/images/projects/residential/p1_DSC00937.JPG",
  "/images/projects/residential/p2_EX05.png",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.16 (1).jpeg",
  "/images/projects/residential/p1_DSC00882.JPG",
  "/images/projects/residential/p1_DSC00829-HDR.JPG",
  "/images/projects/residential/p2_EX07.png",
  "/images/projects/residential/p2_DN02.png",
  "/images/projects/residential/p2_DN03.png",
  "/images/projects/residential/p2_EX06.png",
  "/images/projects/residential/p1_DSC00850-HDR.JPG",
  "/images/projects/residential/p1_DSC00990.JPG",
  "/images/projects/residential/p1_DSC01053.JPG",
  "/images/projects/residential/p1_DSC00859-HDR.JPG",
  "/images/projects/residential/p1_DSC00979.JPG",
  "/images/projects/residential/p1_DSC00945.JPG",
  "/images/projects/residential/p2_WA01.png",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.15.jpeg",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.16 (2).jpeg",
  "/images/projects/residential/p3_WhatsApp Image 2026-07-28 at 12.55.14.jpeg",
  "/images/projects/residential/p1_DSC00996.JPG"
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const projects = [
  {
    id: 2,
    title: "Al Silaa Opticals & Commercial Hubs",
    category: "Commercial",
    description: "Contemporary multi-story developments engineered for optimal footfall, striking aesthetics, and commercial viability.",
    image: "/commercial.png",
    designStyle: "Modern Commercial / Glass Facade",
    keyFeatures: ["Maximized Floor Area", "Premium Facade", "Energy Efficient"],
    constructionType: "Commercial Execution",
    relatedServices: ["Architectural Design", "Interior Design"]
  },
  {
    id: 3,
    title: "Karimbalayil & MK Convention Centers",
    category: "Convention Centers",
    description: "Grand elevations and massive hall layouts prioritizing human-centric flow and unparalleled structural integrity for large gatherings.",
    image: "/hero.png",
    designStyle: "Monumental Architecture",
    keyFeatures: ["Column-Free Halls", "Acoustic Treatment", "Grand Entrance"],
    constructionType: "Large Scale Turnkey",
    relatedServices: ["Architectural Design", "Interior Design"]
  },
  {
    id: 4,
    title: "Residential & Commercial Interiors",
    category: "Premium Interiors",
    description: "From cozy living rooms to professional offices and grand auditorium lobbies, creating spaces that inspire through bespoke material selection.",
    image: "/interior.png",
    designStyle: "Luxury Bespoke",
    keyFeatures: ["Custom Lighting", "Premium Finishes", "Ergonomic Layouts"],
    constructionType: "Interior Execution",
    relatedServices: ["Interior Design & Execution"]
  },
  {
    id: 6,
    title: "Meridian HQ Plaza",
    category: "Commercial",
    description: "Contemporary multi-story developments engineered for optimal footfall.",
    image: "/commercial.png",
    designStyle: "Modern Commercial",
    keyFeatures: ["Maximized Floor Area", "Premium Facade"],
    constructionType: "Commercial Execution",
    relatedServices: ["Architectural Design"]
  },
  {
    id: 7,
    title: "Emerald Convention Center",
    category: "Convention Centers",
    description: "Grand elevations and massive hall layouts prioritizing flow.",
    image: "/hero.png",
    designStyle: "Monumental Architecture",
    keyFeatures: ["Column-Free Halls", "Acoustic Treatment"],
    constructionType: "Large Scale Turnkey",
    relatedServices: ["Architectural Design"]
  },
  {
    id: 8,
    title: "Executive Office Suite",
    category: "Premium Interiors",
    description: "Creating spaces that inspire through bespoke material selection.",
    image: "/interior.png",
    designStyle: "Luxury Bespoke",
    keyFeatures: ["Custom Lighting", "Premium Finishes"],
    constructionType: "Interior Execution",
    relatedServices: ["Interior Design & Execution"]
  }
];

const categories = ["All", "Residential", "Commercial", "Convention Centers", "Premium Interiors"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-16 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-h1 text-charcoal mb-8">
            Selected Works
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            A diverse portfolio showcasing our proven expertise across residential, commercial, and public spaces.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex flex-wrap justify-center gap-4 border-b border-sand pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm uppercase tracking-widest px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-primary text-ivory shadow-lg" 
                  : "bg-transparent text-charcoal/70 hover:bg-sand/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid / Gallery */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        {activeCategory === "Residential" ? (
          <MasonryGallery images={residentialGalleryImages} />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer flex flex-col items-center"
                >
                  <div className="relative overflow-hidden w-full aspect-[4/3] mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                  </div>
                  
                  <h3 className="text-sm tracking-wide text-charcoal/90 text-center transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mt-32 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-chocolate text-ivory p-16 rounded-[40px] shadow-premium">
          <h2 className="text-h2 mb-6">Have a project in mind?</h2>
          <Link href="/contact" className="inline-block bg-primary text-ivory px-10 py-4 text-sm uppercase tracking-widest hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm">
            Discuss Your Vision
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
