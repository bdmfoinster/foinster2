"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Clock, Send } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-h1 text-charcoal mb-8">
            Let&apos;s Talk
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            Reach out to discuss your architectural vision, interior design project, or turnkey construction needs.
          </motion.p>
        </motion.div>
      </section>

      <section className="container-custom px-6 md:px-12 lg:px-24 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Details */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-12">
            
            <motion.div variants={fadeUp}>
              <h3 className="text-h4 text-primary border-b border-sand pb-3 mb-6">Head Office</h3>
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-burgundy flex-shrink-0 mt-1" strokeWidth={1.5} />
                <p className="text-charcoal/70 font-light leading-relaxed">
                  PO Kumaramputhoor,<br />
                  Mannarkkad Via, Palakkad,<br />
                  PIN 678583, Kerala
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-h4 text-primary border-b border-sand pb-3 mb-6">Corporate Office</h3>
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-burgundy flex-shrink-0 mt-1" strokeWidth={1.5} />
                <p className="text-charcoal/70 font-light leading-relaxed">
                  Hilite Business Park,<br />
                  Calicut, Kerala
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm uppercase tracking-widest text-burgundy mb-4">Contact Info</h4>
                <div className="space-y-4 font-light text-charcoal/70">
                  <div className="flex items-center gap-3"><Phone size={18} strokeWidth={1.5} /> <span>+91 7560 870 124</span></div>
                  <div className="flex items-center gap-3"><Phone size={18} strokeWidth={1.5} /> <span>+91 6235 003 603</span></div>
                  <div className="flex items-center gap-3"><Mail size={18} strokeWidth={1.5} /> <span>kvhfoinster@gmail.com</span></div>
                  <div className="flex items-center gap-3"><Globe size={18} strokeWidth={1.5} /> <span>www.kvhfoinster.com</span></div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-widest text-burgundy mb-4">Working Hours</h4>
                <div className="space-y-4 font-light text-charcoal/70">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="mt-1" strokeWidth={1.5} /> 
                    <div>
                      <p>Mon - Sat</p>
                      <p>9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Luxury Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-ivory p-10 lg:p-14 shadow-premium rounded-sm">
            <h3 className="text-h2 text-charcoal mb-8">Send a Message</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input type="text" id="name" placeholder=" " className="peer w-full bg-transparent border-b border-sand/70 text-charcoal py-3 focus:outline-none focus:border-primary transition-colors placeholder-transparent" required />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-charcoal/50 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">Full Name</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" placeholder=" " className="peer w-full bg-transparent border-b border-sand/70 text-charcoal py-3 focus:outline-none focus:border-primary transition-colors placeholder-transparent" required />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-charcoal/50 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">Email Address</label>
                </div>
              </div>
              
              <div className="relative">
                <input type="tel" id="phone" placeholder=" " className="peer w-full bg-transparent border-b border-sand/70 text-charcoal py-3 focus:outline-none focus:border-primary transition-colors placeholder-transparent" />
                <label htmlFor="phone" className="absolute left-0 -top-3.5 text-charcoal/50 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">Phone Number</label>
              </div>

              <div className="relative">
                <textarea id="message" rows="4" placeholder=" " className="peer w-full bg-transparent border-b border-sand/70 text-charcoal py-3 focus:outline-none focus:border-primary transition-colors placeholder-transparent resize-none" required></textarea>
                <label htmlFor="message" className="absolute left-0 -top-3.5 text-charcoal/50 text-xs tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">Project Details</label>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-primary text-ivory px-8 py-5 text-sm uppercase tracking-widest hover:bg-charcoal transition-colors duration-300 rounded-sm shadow-md group">
                Submit Inquiry <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative bg-sand/30">
        {/* Placeholder for Google Maps embed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-card-title text-charcoal/50">Interactive Google Map Integration</p>
        </div>
      </section>
    </div>
  );
}
