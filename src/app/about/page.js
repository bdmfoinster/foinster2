"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MessageSquare, ClipboardList, Map, Lightbulb, 
  PenTool, Box, DraftingCompass, Layers, 
  Hammer, CheckSquare, Eye, Key, Wrench 
} from "lucide-react";

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

const steps = [
  { icon: MessageSquare, title: "Consultation", timeline: "Step 1", desc: "Initial meeting to understand your vision, lifestyle, and project goals." },
  { icon: ClipboardList, title: "Requirement Analysis", timeline: "Step 2", desc: "Detailed breakdown of functional requirements and spatial needs." },
  { icon: Map, title: "Site Visit", timeline: "Step 3", desc: "Comprehensive site analysis to understand context, climate, and topography." },
  { icon: Lightbulb, title: "Concept Development", timeline: "Step 4", desc: "Translating ideas into preliminary design concepts and mood boards." },
  { icon: PenTool, title: "Planning", timeline: "Step 5", desc: "Developing precise floor plans optimizing space, light, and ventilation." },
  { icon: Box, title: "3D Visualization", timeline: "Step 6", desc: "Photorealistic 3D renderings to help you visualize the final outcome." },
  { icon: DraftingCompass, title: "Working Drawings", timeline: "Step 7", desc: "Detailed architectural and structural blueprints for execution." },
  { icon: Layers, title: "Material Selection", timeline: "Step 8", desc: "Curating premium finishes, fixtures, and materials aligned with the design." },
  { icon: Hammer, title: "Execution", timeline: "Step 9", desc: "Rigorous on-site construction and project management by our turnkey team." },
  { icon: CheckSquare, title: "Quality Inspection", timeline: "Step 10", desc: "Continuous monitoring to ensure structural integrity and flawless finishes." },
  { icon: Eye, title: "Client Review", timeline: "Step 11", desc: "Final walkthrough to ensure every detail meets our uncompromising standards." },
  { icon: Key, title: "Project Handover", timeline: "Step 12", desc: "Delivering the keys to your newly transformed space." },
  { icon: Wrench, title: "Maintenance Support", timeline: "Step 13", desc: "Ongoing support to preserve the quality and longevity of the build." }
];

const teamMembers = [
  { name: "Hamza Kutty", role: "Founder", image: "/team/Hamza_Kutty_Founder_True_Image.jpg" },
  { name: "Khaja Hussain", role: "CEO", image: "/team/Khaja hussain - CEO.jpg" },
  { name: "Faisal Babu", role: "Executive Director", image: "/team/Faisal Babu - Executive Director.jpg" },
  { name: "Rahul", role: "Design Manager", image: "/team/Rahul - Design Manager.jpg" },
  { name: "Shanib", role: "BDM", image: "/team/Shanib - BDM.jpg" },
  { name: "Anjana", role: "Accounts Manager", image: "/team/Anjana - Accounts Manager.jpg" },
  { name: "Athira", role: "HR Executive", image: "/team/Athira - HR Executive.jpg" },
  { name: "Sukanya", role: "CRM", image: "/team/Sukanya - CRM.jpg" },
  { name: "Kadeeja Shaibi", role: "Architect", image: "/team/Kadeeja Shaibi - Architect.jpg" },
  { name: "Sooraj", role: "Senior Designer", image: "/team/Sooraj - Senior Designer.jpg" },
  { name: "Adhil", role: "Junior Designer", image: "/team/Adhil - Junior Designer.jpg" },
  { name: "Fayas", role: "Junior Designer", image: "/team/Fayas - Junior Designer.jpg" },
  { name: "Junaid", role: "3D Visualizer", image: "/team/Junaid - 3D Visualizer.jpg" },
  { name: "Unni Mohandas", role: "3D Visualizer", image: "/team/Unni Mohandas - 3D Visualizer.jpg" },
  { name: "Shifana", role: "2D Detailer", image: "/team/Shifana - 2D Detailer.jpg" },
  { name: "Noushad", role: "Senior Accountant", image: "/team/Noushad - Senior Accountant.jpg" },
  { name: "Akhil", role: "Site Supervisor", image: "/team/Akhil - Site Supervisor.jpg" },
  { name: "Goutham", role: "Site Supervisor", image: "/team/Goutham - Site Supervisor.jpg" },
  { name: "Murshid", role: "Site Supervisor", image: "/team/Murshid - Site Supervisor.jpg" },
  { name: "Shamil", role: "Site Supervisor", image: "/team/Shamil - Site supervisor.jpg" },
  { name: "Swalih", role: "Site Supervisor", image: "/team/Swalih - Site Supervisor.jpg" },
];

const TeamCard = ({ member }) => (
  <motion.div 
    variants={fadeUp}
    className="group bg-ivory rounded-sm overflow-hidden shadow-premium hover:shadow-lg transition-all duration-500 flex flex-col transform hover:-translate-y-1"
  >
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      />
    </div>
    <div className="p-6 text-center flex-grow flex flex-col justify-center bg-ivory relative z-10 border-t border-sand/30">
      <h3 className="text-h4 text-charcoal mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
      <p className="text-xs uppercase tracking-widest text-burgundy font-medium">
        {member.role}
      </p>
    </div>
  </motion.div>
);

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
              <Image src="/team/Khaja hussain - CEO.jpg" alt="Khaja Hussain - CEO" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
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

      {/* Our Team Section */}
      <section className="bg-cream py-24 mb-24 border-t border-sand/30">
        <div className="container-custom px-6 md:px-12 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-h2 text-charcoal mb-4">Meet Our Team</motion.h2>
            <motion.p variants={fadeUp} className="text-charcoal/70 font-light text-lg md:text-xl max-w-3xl mx-auto">
              The talented architects, engineers, designers, and project specialists who transform ideas into exceptional spaces.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Process Section (Moved) */}
      <section id="process" className="container-custom px-6 md:px-12 lg:px-24 pt-24 mb-24 text-center border-t border-sand/30">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="max-w-4xl mx-auto mb-16">
          <motion.h2 variants={fadeUp} className="text-h1 text-charcoal mb-8">
            Our Process
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-charcoal/70 font-light leading-relaxed">
            A seamless, transparent, and highly disciplined workflow taking you from the first sketch to the final handover.
          </motion.p>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto text-left">
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
                    <h3 className="text-h4 text-charcoal mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
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
