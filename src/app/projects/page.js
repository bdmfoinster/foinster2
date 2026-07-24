"use client";

import { useState } from "framer-motion"; // actually need react
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    id: 1,
    title: "Modern & Traditional Villas",
    category: "Residential",
    description: "Intelligent designs tailored to Kerala's tropical environment, enhancing value and functionality while mastering scale and proportion.",
    image: "/residential.png",
    designStyle: "Contemporary Kerala / Modern Minimalist",
    keyFeatures: ["Climate-Adaptive", "Natural Light Optimization", "Vastu Compliant"],
    constructionType: "Turnkey Civil Construction",
    relatedServices: ["Architectural Design", "Turnkey Construction"]
  },
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
    id: 5,
    title: "Luxury Hillside Villa",
    category: "Residential",
    description: "Intelligent designs tailored to Kerala's tropical environment.",
    image: "/residential.png",
    designStyle: "Contemporary Kerala",
    keyFeatures: ["Climate-Adaptive", "Natural Light Optimization"],
    constructionType: "Turnkey Civil Construction",
    relatedServices: ["Architectural Design", "Turnkey Construction"]
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

      {/* Projects Grid */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer relative overflow-hidden rounded-sm shadow-premium aspect-[4/3] w-full"
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-primary mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.category}
                  </span>
                  <h3 className="text-card-title text-ivory transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
