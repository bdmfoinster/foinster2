"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const blogPosts = [
  {
    id: 1,
    title: "Modern Kerala Architecture: Blending Tradition with Innovation",
    category: "Architecture Trends",
    date: "March 15, 2026",
    readTime: "5 min read",
    image: "/residential.png",
    excerpt: "Exploring how contemporary designs in Kerala are respecting local climate and heritage while pushing the boundaries of modern aesthetics."
  },
  {
    id: 2,
    title: "The Ultimate Interior Design Guide for Luxury Homes",
    category: "Interior Design Guide",
    date: "April 02, 2026",
    readTime: "8 min read",
    image: "/interior.png",
    excerpt: "A comprehensive look at bespoke material selection, custom lighting, and high-end finishes that define premium living spaces."
  },
  {
    id: 3,
    title: "Sustainable Buildings: Engineering for the Future",
    category: "Sustainable Buildings",
    date: "April 20, 2026",
    readTime: "6 min read",
    image: "/hero.png",
    excerpt: "How climate-adaptive design and structural integrity are paving the way for a more sustainable architectural skyline."
  },
  {
    id: 4,
    title: "Commercial Architecture: Maximizing Space and ROI",
    category: "Commercial Architecture",
    date: "May 05, 2026",
    readTime: "7 min read",
    image: "/commercial.png",
    excerpt: "Insights into designing multi-story developments that prioritize optimal footfall and striking aesthetic presence."
  },
  {
    id: 5,
    title: "Choosing an Architect: What You Need to Know",
    category: "Choosing an Architect",
    date: "May 18, 2026",
    readTime: "4 min read",
    image: "/interior.png",
    excerpt: "Key factors to consider when selecting a multidisciplinary firm for your next residential or commercial project."
  },
  {
    id: 6,
    title: "Project Stories: Transforming a Vision into Reality",
    category: "Project Stories",
    date: "June 10, 2026",
    readTime: "10 min read",
    image: "/residential.png",
    excerpt: "An inside look at our turnkey civil construction process, from the first sketch to the final handover of a luxury villa."
  }
];

// Other topics required: Construction Tips, Luxury Homes, Villa Design
const categories = ["All", "Architecture Trends", "Interior Design", "Construction Tips", "Sustainable Buildings"];

export default function BlogPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-h1 text-charcoal mb-8">
            Journal & Insights
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            Thoughts, trends, and project stories from the forefront of luxury architecture and interior design.
          </motion.p>
        </motion.div>
      </section>

      {/* Featured Post */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group cursor-pointer flex flex-col lg:flex-row bg-ivory shadow-premium rounded-sm overflow-hidden"
        >
          <div className="lg:w-2/3 relative aspect-video lg:aspect-auto overflow-hidden">
            <Image 
              src="/hero.png" 
              alt="Featured Post" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </div>
          <div className="lg:w-1/3 p-10 lg:p-16 flex flex-col justify-center border-l border-sand/30">
            <span className="text-xs uppercase tracking-widest text-burgundy mb-4 block">Featured • Villa Design</span>
            <h2 className="text-h2 text-charcoal mb-6 group-hover:text-primary transition-colors leading-tight">
              Mastering Scale and Proportion in Luxury Homes
            </h2>
            <p className="text-charcoal/70 font-light leading-relaxed mb-8">
              Discover how Foinster Arch balances monumental architectural elements with human-centric flow to create spaces that evoke calm and inspire connection.
            </p>
            <div className="flex items-center text-xs text-charcoal/50 tracking-widest uppercase mb-8">
              <span>July 12, 2026</span>
              <span className="mx-3 w-1 h-1 bg-primary rounded-full"></span>
              <span className="flex items-center"><Clock size={12} className="mr-1" /> 12 min read</span>
            </div>
            <Link href="#" className="inline-flex items-center text-sm uppercase tracking-widest text-charcoal group-hover:text-primary transition-colors">
              Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between border-b border-sand pb-6 mb-12">
          <h3 className="text-h3 text-charcoal">Latest Articles</h3>
          <div className="hidden md:flex gap-6">
            {categories.map((cat, i) => (
              <button key={i} className={`text-xs uppercase tracking-widest ${i === 0 ? 'text-primary' : 'text-charcoal/50 hover:text-charcoal transition-colors'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {blogPosts.map((post) => (
            <motion.article key={post.id} variants={fadeUp} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm mb-6 shadow-sm group-hover:shadow-premium transition-shadow duration-300">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <span className="text-xs uppercase tracking-widest text-burgundy mb-3">{post.category}</span>
                <h4 className="text-h4 text-charcoal mb-4 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h4>
                <p className="text-charcoal/70 font-light leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-charcoal/50 tracking-widest uppercase mt-auto pt-6 border-t border-sand/50">
                  <span>{post.date}</span>
                  <span className="mx-2 w-1 h-1 bg-sand rounded-full"></span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        
        <div className="text-center mt-20">
          <button className="bg-transparent text-charcoal border border-charcoal px-10 py-4 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-colors duration-300 rounded-sm">
            Load More Articles
          </button>
        </div>
      </section>
    </div>
  );
}
