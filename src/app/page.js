"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="bg-cream min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.png" 
            alt="Cinematic architecture space" 
            fill 
            priority
            className="object-cover scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply"></div>
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent"></div>
        </div>

        <div className="container-custom relative z-10 px-6 md:px-12 lg:px-24 mt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1 
              variants={fadeUp}
              className="text-hero text-ivory mb-6"
            >
              Crafted by many hands,<br/>perfected with one vision.
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-sand/90 font-light max-w-2xl mb-12 leading-relaxed"
            >
              We transform complex visions into architectural landmarks. Based in Kerala, KVH Foinster is a premier multidisciplinary firm merging traditional aesthetics with international engineering standards.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16">
              <Link href="/projects" className="group flex items-center justify-center bg-ivory text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-transparent hover:text-ivory border border-ivory transition-all duration-300 rounded-sm">
                View Projects
                <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="group flex items-center justify-center bg-transparent text-ivory px-8 py-4 text-sm uppercase tracking-widest border border-transparent hover:border-ivory transition-all duration-300 rounded-sm">
                Start a Consultation
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-sand uppercase">
              <span>15+ Years Experience</span>
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy"></span>
              <span>200+ Projects</span>
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy"></span>
              <span>Global Reach</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. About Foinster */}
      <section className="section-padding bg-ivory relative">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sand/30 rounded-bl-[100px] z-0 hidden lg:block"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-burgundy"></span>
                <h4 className="text-sm uppercase tracking-widest text-burgundy font-medium">About Us</h4>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-h2 text-charcoal mb-8">
                Transforming complex visions into architectural landmarks.
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-6 text-charcoal/70 font-light leading-relaxed">
                <p>
                  Guided by a decade of architectural excellence, KVH Foinster is driven by a steadfast commitment to quality and innovation. Under the visionary leadership of our CEO, Mr. Khaja Hussain, we deliver projects that stand the test of time.
                </p>
                <p>
                  From intimate private residences to grand commercial landmarks, his expertise ensures that every project is delivered with technical perfection and a deep respect for local heritage, elevating the lifestyle of our clients.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-10">
                <Link href="/about" className="inline-block border-b border-charcoal pb-1 text-sm uppercase tracking-widest hover:text-primary hover:border-primary transition-colors duration-300">
                  Discover Our Story
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] w-full rounded-tr-[80px] rounded-bl-[80px] overflow-hidden shadow-premium">
                <Image src="/interior.png" alt="Elegant Interior" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-cream p-8 md:p-12 shadow-premium rounded-tl-[40px] rounded-br-[40px] max-w-[280px]">
                <h3 className="text-card-title text-charcoal mb-3">Our Vision</h3>
                <p className="text-sm text-charcoal/70 font-light">To redefine modern living through timeless design.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1px] bg-burgundy"></span>
                <h4 className="text-sm uppercase tracking-widest text-burgundy font-medium">Portfolio</h4>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-h2 text-charcoal">
                Featured Projects
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/projects" className="group flex items-center text-sm uppercase tracking-widest text-charcoal hover:text-primary transition-colors">
                View All Projects <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {[
              { img: "/residential.png", cat: "Residential", title: "Modern & Traditional Villas" },
              { img: "/commercial.png", cat: "Commercial", title: "Contemporary Developments" },
              { img: "/hero.png", cat: "Convention Centers", title: "Elevations & Hall Layouts" },
              { img: "/interior.png", cat: "Premium Interiors", title: "Residential & Commercial" },
              { img: "/residential.png", cat: "Residential", title: "Luxury Hillside Villa" },
              { img: "/commercial.png", cat: "Commercial", title: "Meridian HQ Plaza" },
              { img: "/hero.png", cat: "Convention Centers", title: "Emerald Convention Center" },
              { img: "/interior.png", cat: "Premium Interiors", title: "Executive Office Suite" }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="relative overflow-hidden w-full aspect-[4/3] mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <Image 
                    src={project.img} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest text-primary mb-2">
                    {project.cat}
                  </span>
                  <h3 className="text-sm tracking-wide text-charcoal/90 text-center transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Services */}
      <section className="section-padding bg-chocolate text-ivory relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-burgundy rounded-full blur-[120px] opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-24"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-sand/50"></span>
              <h4 className="text-sm uppercase tracking-widest text-sand font-medium">Capabilities</h4>
              <span className="w-8 h-[1px] bg-sand/50"></span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-h2">
              Our Expertise
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Architectural Design", desc: "Concept development for homes, apartments, and commercial hubs with 3D visualizations." },
              { title: "Turnkey Civil Construction", desc: "Full-scale project execution with expert supervision, ensuring on-time delivery." },
              { title: "Interior Design & Execution", desc: "Bespoke interiors for luxury and functionality, defining the inner space." },
              { title: "Renovation & Retrofitting", desc: "Revitalizing and modernizing older structures to breathe new life." }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-charcoal/40 border border-white/5 p-10 rounded-tr-[30px] rounded-bl-[30px] hover:bg-burgundy/20 transition-colors duration-500 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sand/10 text-sand mb-8 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-card-title mb-4">{service.title}</h3>
                <p className="text-sand/70 font-light text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. Contact & CTA */}
      <section className="section-padding bg-ivory">
        <div className="container-custom max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-cream p-12 md:p-20 rounded-[40px] shadow-premium relative overflow-hidden"
          >
            {/* Background Logo */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.04] pointer-events-none mix-blend-multiply">
              <Image src="/logo.png" alt="Foinster Background" fill className="object-contain p-8 md:p-16" />
            </div>
            
            <div className="absolute top-0 left-0 w-32 h-32 bg-stone/20 rounded-br-full z-0"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-sand/30 rounded-tl-full z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-h2 text-charcoal mb-6">
                Ready to transform your space?
              </h2>
              <p className="text-charcoal/70 font-light mb-12 max-w-xl mx-auto">
                Schedule a consultation with our lead architects to discuss your vision, requirements, and how we can bring your next project to life.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="tel:+917560870124" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-ivory px-10 py-4 text-sm uppercase tracking-widest hover:bg-charcoal transition-colors duration-300 rounded-sm shadow-lg">
                  <Phone size={18} />
                  Call Now
                </a>
                <a href="https://wa.me/917560870124" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent border border-charcoal text-charcoal px-10 py-4 text-sm uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-colors duration-300 rounded-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
