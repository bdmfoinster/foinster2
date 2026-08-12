"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const categories = ["All", "Architecture Trends", "Interior Design", "Construction Tips", "Sustainable Buildings"];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (data) {
        setBlogs(data);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

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
      {blogs.length > 0 && (
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
              src={blogs[0].image_url || "/hero.png"} 
              alt="Featured Post" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </div>
          <div className="lg:w-1/3 p-10 lg:p-16 flex flex-col justify-center border-l border-sand/30">
            <span className="text-xs uppercase tracking-widest text-burgundy mb-4 block">Featured</span>
            <h2 className="text-h2 text-charcoal mb-6 group-hover:text-primary transition-colors leading-tight">
              {blogs[0].title}
            </h2>
            <p className="text-charcoal/70 font-light leading-relaxed mb-8">
              {blogs[0].excerpt}
            </p>
            <div className="flex items-center text-xs text-charcoal/50 tracking-widest uppercase mb-8">
              <span>{blogs[0].date}</span>
              <span className="mx-3 w-1 h-1 bg-primary rounded-full"></span>
              <span className="flex items-center"><Clock size={12} className="mr-1" /> 5 min read</span>
            </div>
            <Link href="#" className="inline-flex items-center text-sm uppercase tracking-widest text-charcoal group-hover:text-primary transition-colors">
              Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
      )}

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

        {loading ? (
          <div className="text-center py-20 text-charcoal/50">Loading articles...</div>
        ) : (
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {blogs.slice(1).map((post) => (
            <motion.article key={post.id} variants={fadeUp} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm mb-6 shadow-sm group-hover:shadow-premium transition-shadow duration-300">
                <Image 
                  src={post.image_url || "/interior.png"} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <span className="text-xs uppercase tracking-widest text-burgundy mb-3">Article</span>
                <h4 className="text-h4 text-charcoal mb-4 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h4>
                <p className="text-charcoal/70 font-light leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-charcoal/50 tracking-widest uppercase mt-auto pt-6 border-t border-sand/50">
                  <span>{post.date}</span>
                  <span className="mx-2 w-1 h-1 bg-sand rounded-full"></span>
                  <span>5 min read</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        )}
        
        <div className="text-center mt-20">
          <button className="bg-transparent text-charcoal border border-charcoal px-10 py-4 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-colors duration-300 rounded-sm">
            Load More Articles
          </button>
        </div>
      </section>
    </div>
  );
}
