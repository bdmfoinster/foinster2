"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* 1. Hero & About Us */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-24">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
          <motion.h1 variants={fadeUp} className="text-h1 text-charcoal mb-8">
            About KVH Foinster
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            Based in Mannarkkad and serving clients across Kerala, KVH Foinster is a premier multidisciplinary firm. From intimate private residences to grand commercial landmarks, we deliver excellence through integrated design and construction.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="bg-ivory py-24 mb-24">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-sm uppercase tracking-widest text-burgundy font-medium mb-6">Our Vision</motion.h2>
              <motion.p variants={fadeUp} className="text-h2 text-charcoal">
                To redefine the skyline of Kerala with sustainable, smart, and iconic structures.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-sm uppercase tracking-widest text-burgundy font-medium mb-6">Our Mission</motion.h2>
              <motion.p variants={fadeUp} className="text-h2 text-charcoal">
                To provide a seamless, transparent, and high-quality building experience for every client.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CEO Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-5/12">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-premium bg-sand">
              {/* Assuming a CEO photo exists or we use a stylish placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-stone font-light italic">CEO Photo</div>
              {/* <Image src="/ceo.jpg" alt="Khaja Hussain - CEO" fill className="object-cover" /> */}
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="w-full lg:w-7/12">
            <motion.h2 variants={fadeUp} className="text-h2 text-charcoal mb-4">Khaja Hussain</motion.h2>
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest text-burgundy mb-8">CEO, KVH Foinster</motion.p>
            <motion.div variants={fadeUp} className="space-y-6 text-charcoal/80 font-light leading-relaxed text-lg">
              <p>
                "We transform complex visions into architectural landmarks. Guided by a decade of architectural excellence, KVH Foinster is driven by a steadfast commitment to quality and innovation."
              </p>
              <p>
                "Under our unique design approach, we merge traditional Kerala aesthetics with international engineering standards. My expertise ensures that every project—from private residences to grand commercial landmarks—is delivered with technical perfection and a deep respect for local heritage."
              </p>
              <p>
                "At KVH Foinster, we don't just build structures; we deliver projects that stand the test of time and elevate the lifestyle of our clients."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Design Philosophy */}
      <section className="bg-chocolate text-ivory py-24 mb-24">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-h2 mb-4">Our Design Philosophy</motion.h2>
            <motion.p variants={fadeUp} className="text-sand/70 font-light text-xl tracking-wide uppercase">Beyond Aesthetics</motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Climate-Adaptive", desc: "Intelligent designs tailored to Kerala's tropical environment." },
              { title: "Structural Integrity", desc: "Engineering-first approach ensuring safety and durability." },
              { title: "Scale & Proportion", desc: "Mastering the art of space, whether in a 3-bedroom home or a massive convention hall." },
              { title: "Human-Centric", desc: "Creating spaces that prioritize the comfort and flow of the people using them." }
            ].map((phil, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} viewport={{ once: true }} className="border-l border-burgundy/30 pl-6">
                <h3 className="text-card-title text-primary mb-3">{phil.title}</h3>
                <p className="text-sand/70 font-light leading-relaxed">{phil.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Foinster */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-16">
          <motion.h2 variants={fadeUp} className="text-h2 text-charcoal mb-4">Why Foinster</motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-[1px] bg-burgundy"></motion.div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "Diverse Portfolio", desc: "Proven expertise in Residential, Commercial, and Public spaces." },
            { title: "End-to-End Management", desc: "We take you from the first sketch to the final handover." },
            { title: "Transparent Standards", desc: "No hidden costs, high-grade materials, and ethical practices." },
            { title: "On-Time Delivery", desc: "Rigorous project management to meet every deadline." }
          ].map((reason, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }} className="bg-ivory p-10 shadow-premium rounded-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-h4 text-charcoal mb-3">{reason.title}</h3>
              <p className="text-charcoal/70 font-light leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
