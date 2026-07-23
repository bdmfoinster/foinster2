"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const services = [
  {
    title: "Architectural Design",
    subtitle: "Concept to Reality",
    overview: "Our architectural team specializes in creating unique identities for every project. We provide 3D visualizations, structural engineering, and detailed floor plans that optimize every square foot for sunlight, ventilation, and style.",
    features: ["Concept Development", "3D Visualizations", "Structural Engineering", "Detailed Floor Plans"],
    benefits: ["Optimized Space Utilization", "Climate-Adaptive Design", "Aesthetic Brilliance", "Safety & Durability"]
  },
  {
    title: "Turnkey Civil Construction",
    subtitle: "Total Project Control",
    overview: "We eliminate the stress of building. From obtaining permits to the final brick, our turnkey solutions ensure your project is built with premium materials, skilled craftsmanship, and strict adherence to the budget.",
    features: ["Permit Acquisition", "End-to-End Execution", "Material Procurement", "Project Management"],
    benefits: ["Stress-Free Building", "Budget Adherence", "Premium Materials", "On-Time Delivery"]
  },
  {
    title: "Interior Design & Execution",
    subtitle: "Defining the Inner Space",
    overview: "Whether it's a cozy living room, a professional office, or a grand auditorium lobby, we design interiors that inspire. Our team manages material selection, custom lighting, and high-end finishes to create a cohesive look.",
    features: ["Custom Lighting", "Material Selection", "High-End Finishes", "Bespoke Furniture"],
    benefits: ["Cohesive Aesthetic", "Enhanced Functionality", "Luxurious Comfort", "Inspiring Spaces"]
  },
  {
    title: "Renovation & Retrofitting",
    subtitle: "Breathe New Life",
    overview: "Transform your existing property into a modern masterpiece. Whether it's a single-room update or a complete structural retrofit, we enhance the value and functionality of your home with minimal disruption.",
    features: ["Structural Retrofits", "Single-Room Updates", "Modernization", "Value Enhancement"],
    benefits: ["Minimal Disruption", "Increased Property Value", "Modernized Living", "Restored Functionality"]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-heading text-charcoal mb-8">
            Our Services
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            From concept to reality, we deliver excellence through an integrated approach to architecture, interior design, and turnkey construction.
          </motion.p>
        </motion.div>
      </section>

      {/* Services List */}
      <div className="container-custom px-6 md:px-12 lg:px-24">
        {services.map((service, index) => (
          <motion.section 
            key={index} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={`py-24 border-t border-sand/50 ${index === services.length - 1 ? 'mb-12' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.h2 variants={fadeUp} className="text-sm uppercase tracking-widest text-burgundy font-medium mb-4">
                  0{index + 1}. {service.subtitle}
                </motion.h2>
                <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-heading text-charcoal mb-8 leading-tight">
                  {service.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="text-lg text-charcoal/70 font-light leading-relaxed mb-10">
                  {service.overview}
                </motion.p>
                
                <motion.div variants={fadeUp} className="mt-8">
                  <Link href="/projects" className="group flex items-center text-sm uppercase tracking-widest text-charcoal hover:text-primary transition-colors">
                    View Related Projects <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <div className="bg-ivory p-10 shadow-premium rounded-sm h-full flex flex-col justify-center">
                <motion.div variants={fadeUp} className="mb-10">
                  <h4 className="text-xl font-heading text-charcoal mb-6 border-b border-sand pb-3">Features & Deliverables</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-charcoal/70 font-light">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div variants={fadeUp}>
                  <h4 className="text-xl font-heading text-charcoal mb-6 border-b border-sand pb-3">Key Benefits</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-charcoal/70 font-light">
                        <CheckCircle size={16} className="text-burgundy mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-chocolate text-ivory py-24">
        <div className="container-custom px-6 md:px-12 lg:px-24 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading mb-8">Ready to Start Your Project?</motion.h2>
            <motion.p variants={fadeUp} className="text-sand/80 font-light mb-12 text-lg">Our team is ready to bring your vision to life with uncompromising quality and end-to-end management.</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="inline-block bg-primary text-ivory px-10 py-4 text-sm uppercase tracking-widest hover:bg-ivory hover:text-charcoal transition-colors duration-300 rounded-sm">
                Request a Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
