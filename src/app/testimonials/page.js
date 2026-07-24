"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const testimonials = [
  {
    id: 1,
    name: "Dr. Aisha Rahman",
    projectType: "Modern Villa Residence",
    rating: 5,
    text: "KVH Foinster transformed our vision into an architectural masterpiece. The structural integrity and climate-adaptive design are evident in every room. Their transparent standards and on-time delivery exceeded our expectations.",
    avatar: "AR"
  },
  {
    id: 2,
    name: "Mohammed Al Qasimi",
    projectType: "Commercial Plaza",
    rating: 5,
    text: "An incredibly professional team. The end-to-end management from concept development to final execution was flawless. They truly master the art of space and proportion in commercial architecture.",
    avatar: "MQ"
  },
  {
    id: 3,
    name: "Rev. Thomas Mathew",
    projectType: "Convention Center & Auditorium",
    rating: 5,
    text: "The sheer scale of our auditorium required unparalleled engineering. Foinster Arch delivered a human-centric, grand elevation that handles massive footfall with ease while maintaining a luxurious aesthetic.",
    avatar: "TM"
  },
  {
    id: 4,
    name: "Priya Menon",
    projectType: "Premium Interior Renovation",
    rating: 5,
    text: "They breathed new life into our older property. The bespoke material selection and custom lighting completely modernized the space without losing its traditional Kerala heritage. Highly recommended.",
    avatar: "PM"
  },
  {
    id: 5,
    name: "Hassan Ibrahim",
    projectType: "Multi-story Development",
    rating: 5,
    text: "Rigorous project management and no hidden costs. Working with Khaja Hussain and his team has been a masterclass in how turnkey civil construction should be handled.",
    avatar: "HI"
  },
  {
    id: 6,
    name: "Sneha Varghese",
    projectType: "Luxury Home Interior",
    rating: 5,
    text: "The attention to detail is just staggering. Every corner feels cohesive, luxurious, and perfectly aligned with our lifestyle. Foinster is undoubtedly the premier multidisciplinary firm in Kerala.",
    avatar: "SV"
  }
];

export default function TestimonialsPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-h1 text-charcoal mb-8">
            Client Perspectives
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            Discover what our clients have to say about our seamless, transparent, and high-quality building experiences.
          </motion.p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {testimonials.map((test) => (
            <motion.div 
              key={test.id} 
              variants={fadeUp} 
              className="bg-ivory p-10 md:p-14 shadow-premium rounded-sm flex flex-col relative"
            >
              <Quote className="absolute top-10 right-10 text-sand/40 w-16 h-16" strokeWidth={1} />
              
              <div className="flex gap-1 text-primary mb-8 relative z-10">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              
              <p className="text-h4 text-charcoal leading-relaxed mb-10 flex-grow relative z-10">
                "{test.text}"
              </p>
              
              <div className="flex items-center gap-5 border-t border-sand/50 pt-8 relative z-10">
                <div className="w-14 h-14 bg-charcoal text-ivory rounded-full flex items-center justify-center text-card-title shadow-md">
                  {test.avatar}
                </div>
                <div>
                  <h4 className="text-small-heading text-charcoal">{test.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-burgundy">{test.projectType}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
