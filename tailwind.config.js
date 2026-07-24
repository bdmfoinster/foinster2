/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C19A6B", /* Muted gold / Camel */
        ivory: "#F5F5DC",   /* Soft warm beige */
        cream: "#FAF9F6",   /* Off-white */
        sand: "#E6E2D8",
        stone: "#9C978F",   /* Warm gray */
        burgundy: "#800020",
        chocolate: "#3E2723", /* Dark brown */
        charcoal: "#2C2C2C",  /* Charcoal */
        "bg-secondary": "#FAF9F6",
        gold: "#C19A6B", /* Muted gold alias */
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-heading)', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
