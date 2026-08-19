const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const blogPosts = [
  {
    title: "Modern Kerala Architecture: Blending Tradition with Innovation",
    date: "March 15, 2026",
    image_url: "/residential.png",
    excerpt: "Exploring how contemporary designs in Kerala are respecting local climate and heritage while pushing the boundaries of modern aesthetics.",
    content: "Exploring how contemporary designs in Kerala are respecting local climate and heritage while pushing the boundaries of modern aesthetics."
  },
  {
    title: "The Ultimate Interior Design Guide for Luxury Homes",
    date: "April 02, 2026",
    image_url: "/interior.png",
    excerpt: "A comprehensive look at bespoke material selection, custom lighting, and high-end finishes that define premium living spaces.",
    content: "A comprehensive look at bespoke material selection, custom lighting, and high-end finishes that define premium living spaces."
  },
  {
    title: "Sustainable Buildings: Engineering for the Future",
    date: "April 20, 2026",
    image_url: "/hero.png",
    excerpt: "How climate-adaptive design and structural integrity are paving the way for a more sustainable architectural skyline.",
    content: "How climate-adaptive design and structural integrity are paving the way for a more sustainable architectural skyline."
  },
  {
    title: "Commercial Architecture: Maximizing Space and ROI",
    date: "May 05, 2026",
    image_url: "/commercial.png",
    excerpt: "Insights into designing multi-story developments that prioritize optimal footfall and striking aesthetic presence.",
    content: "Insights into designing multi-story developments that prioritize optimal footfall and striking aesthetic presence."
  },
  {
    title: "Choosing an Architect: What You Need to Know",
    date: "May 18, 2026",
    image_url: "/interior.png",
    excerpt: "Key factors to consider when selecting a multidisciplinary firm for your next residential or commercial project.",
    content: "Key factors to consider when selecting a multidisciplinary firm for your next residential or commercial project."
  },
  {
    title: "Project Stories: Transforming a Vision into Reality",
    date: "June 10, 2026",
    image_url: "/residential.png",
    excerpt: "An inside look at our turnkey civil construction process, from the first sketch to the final handover of a luxury villa.",
    content: "An inside look at our turnkey civil construction process, from the first sketch to the final handover of a luxury villa."
  }
];

async function seed() {
  const { data, error } = await supabase.from('blogs').insert(blogPosts);
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Successfully inserted sample blogs!");
  }
}

seed();
