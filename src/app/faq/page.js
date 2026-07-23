"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const faqs = [
  {
    category: "Architecture & Design",
    items: [
      { q: "What is your architectural design philosophy?", a: "Our philosophy goes 'Beyond Aesthetics'. We focus on Climate-Adaptive design tailored to Kerala's tropical environment, Structural Integrity with an engineering-first approach, perfect Scale & Proportion, and Human-Centric layouts that prioritize comfort and flow." },
      { q: "Do you provide 3D visualizations before construction?", a: "Yes, as part of our Architectural Design services, we provide comprehensive 3D visualizations and photorealistic renderings so you can clearly see the final concept before we break ground." }
    ]
  },
  {
    category: "Construction & Execution",
    items: [
      { q: "What does 'Turnkey Civil Construction' include?", a: "Our turnkey solution provides total project control. It includes everything from obtaining necessary permits and material procurement to structural execution and final handover, ensuring strict adherence to both timeline and budget." },
      { q: "How do you ensure the quality of materials and construction?", a: "We maintain transparent standards with no hidden costs. We source only high-grade materials and enforce rigorous quality inspections throughout the ongoing execution phase." }
    ]
  },
  {
    category: "Timeline & Cost",
    items: [
      { q: "How long does a typical residential project take?", a: "A standard modern villa can take anywhere from 10 to 18 months from concept to handover, depending on scale and complexity. Our rigorous project management ensures on-time delivery." },
      { q: "Are there any hidden costs in your estimates?", a: "No. One of our core 'Why Foinster' pillars is Transparent Standards. We provide detailed, itemized cost estimates and ensure there are no hidden fees or unexpected charges during execution." },
      { q: "What are the standard payment terms?", a: "Payments are typically structured around project milestones (e.g., foundation completion, roofing, interior finishing). A detailed payment schedule is agreed upon during the contract signing phase." }
    ]
  },
  {
    category: "Interior Design & Renovation",
    items: [
      { q: "Do you handle interior design for existing structures?", a: "Absolutely. Our Renovation & Retrofitting service breathes new life into older structures. We handle everything from single-room updates to complete structural retrofits." },
      { q: "What is included in your interior execution?", a: "Our interior execution covers bespoke furniture design, custom lighting plans, premium material selection, and high-end finishes, delivering a cohesive and luxurious inner space." }
    ]
  },
  {
    category: "Warranty & Support",
    items: [
      { q: "Do you provide post-construction support?", a: "Yes. The final step of our process is Maintenance Support. We provide ongoing assistance and warranties for our construction and structural work to preserve the longevity of your build." }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-heading text-charcoal mb-8">
            Frequently Asked Questions
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            Transparent answers regarding our architectural process, construction timelines, costs, and services.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="container-custom px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        {faqs.map((group, groupIdx) => (
          <motion.div 
            key={groupIdx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="text-2xl font-heading text-primary border-b border-sand pb-4 mb-6">{group.category}</h2>
            
            <div className="space-y-4">
              {group.items.map((item, itemIdx) => {
                const uniqueIndex = `${groupIdx}-${itemIdx}`;
                const isOpen = openIndex === uniqueIndex;

                return (
                  <div key={itemIdx} className="bg-ivory shadow-sm rounded-sm border border-sand/50 overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFAQ(uniqueIndex)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-sand/20 transition-colors"
                    >
                      <span className="text-lg font-heading text-charcoal pr-8">{item.q}</span>
                      <div className="text-burgundy flex-shrink-0">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 pt-0 text-charcoal/70 font-light leading-relaxed border-t border-sand/30 mx-6 mt-2">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
