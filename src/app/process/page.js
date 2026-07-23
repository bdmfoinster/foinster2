"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, ClipboardList, Map, Lightbulb, 
  PenTool, Box, DraftingCompass, Layers, 
  Hammer, CheckSquare, Eye, Key, Wrench 
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const steps = [
  { icon: MessageSquare, title: "Consultation", timeline: "Week 1", desc: "Initial meeting to understand your vision, lifestyle, and project goals." },
  { icon: ClipboardList, title: "Requirement Analysis", timeline: "Week 1-2", desc: "Detailed breakdown of functional requirements and spatial needs." },
  { icon: Map, title: "Site Visit", timeline: "Week 2", desc: "Comprehensive site analysis to understand context, climate, and topography." },
  { icon: Lightbulb, title: "Concept Development", timeline: "Week 3-4", desc: "Translating ideas into preliminary design concepts and mood boards." },
  { icon: PenTool, title: "Planning", timeline: "Week 4-5", desc: "Developing precise floor plans optimizing space, light, and ventilation." },
  { icon: Box, title: "3D Visualization", timeline: "Week 6-8", desc: "Photorealistic 3D renderings to help you visualize the final outcome." },
  { icon: DraftingCompass, title: "Working Drawings", timeline: "Week 8-10", desc: "Detailed architectural and structural blueprints for execution." },
  { icon: Layers, title: "Material Selection", timeline: "Week 10-12", desc: "Curating premium finishes, fixtures, and materials aligned with the design." },
  { icon: Hammer, title: "Execution", timeline: "Month 3+", desc: "Rigorous on-site construction and project management by our turnkey team." },
  { icon: CheckSquare, title: "Quality Inspection", timeline: "Ongoing", desc: "Continuous monitoring to ensure structural integrity and flawless finishes." },
  { icon: Eye, title: "Client Review", timeline: "Pre-Handover", desc: "Final walkthrough to ensure every detail meets our uncompromising standards." },
  { icon: Key, title: "Project Handover", timeline: "Completion", desc: "Delivering the keys to your newly transformed space." },
  { icon: Wrench, title: "Maintenance Support", timeline: "Post-Handover", desc: "Ongoing support to preserve the quality and longevity of the build." }
];

export default function ProcessPage() {
  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24 mb-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-heading text-charcoal mb-8">
            Our Process
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            A seamless, transparent, and highly disciplined workflow taking you from the first sketch to the final handover.
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="container-custom px-6 md:px-12 lg:px-24">
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-sand/80 transform md:-translate-x-1/2"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className={`relative flex items-center mb-16 md:mb-24 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Icon Marker */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-ivory border-2 border-primary rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-premium">
                  <Icon size={24} className="text-primary" strokeWidth={1.5} />
                </div>

                {/* Content Box */}
                <div className={`ml-24 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-16 lg:pl-24' : 'md:pr-16 lg:pr-24'}`}>
                  <div className="bg-ivory p-8 md:p-10 shadow-sm border border-sand/30 rounded-sm hover:shadow-premium transition-shadow duration-300 relative group">
                    <span className="block text-xs font-bold uppercase tracking-widest text-burgundy mb-3">{step.timeline}</span>
                    <h3 className="text-2xl font-heading text-charcoal mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-charcoal/70 font-light leading-relaxed">{step.desc}</p>
                    
                    {/* Connecting line for desktop */}
                    <div className={`hidden md:block absolute top-1/2 w-8 lg:w-16 h-[1px] bg-sand/80 ${isEven ? '-left-8 lg:-left-16' : '-right-8 lg:-right-16'}`}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
