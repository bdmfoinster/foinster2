"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MasonryGallery from "@/components/MasonryGallery";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [isScrolled, setIsScrolled] = useState(false);
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All Projects",
    "Residential",
    "Commercial",
    "Interior",
    "Exterior"
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const json = await res.json();
        if (json.success) {
          setDbProjects(json.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProjects();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = activeCategory === "All Projects"
    ? dbProjects
    : dbProjects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-ivory min-h-screen pt-24 pb-20">
      <div className="container-custom px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto mt-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium tracking-widest uppercase mb-4 text-sm"
          >
            Portfolio
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-6"
          >
            Featured <span className="font-semibold italic text-primary">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            A curated selection of our finest architectural and interior design work.
          </motion.p>
        </div>

        {/* Filters */}
        <div className={`sticky top-[80px] z-40 bg-ivory/95 backdrop-blur-sm py-4 mb-12 transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md transform scale-105"
                    : "bg-white text-charcoal hover:bg-cream border border-sand/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid / Gallery */}
        {loading ? (
          <div className="text-center py-20 text-charcoal">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-charcoal">No projects found. Add some in the Admin Dashboard!</div>
        ) : (
          <MasonryGallery images={filteredProjects.map((p, index) => ({
            id: p.id,
            src: p.image_url,
            title: p.title,
            category: p.category,
            alt: p.title
          }))} />
        )}
      </div>
    </div>
  );
}
