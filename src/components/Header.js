"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { 
      name: "About", 
      subLinks: [
        { name: "About", path: "/about" },
        { name: "Process", path: "/about#process" }
      ]
    },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { 
      name: "Gallery", 
      subLinks: [
        { name: "Gallery", path: "/gallery" }
      ]
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-premium py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-custom flex justify-between items-center px-6 md:px-12 lg:px-24">
        <Link href="/" className="relative z-10 block transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="/logo.png"
            alt="KVH Foinster Logo"
            width={240}
            height={80}
            className="object-contain w-auto h-[36px] md:h-[44px] lg:h-[56px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.path ? (
                <Link
                  href={link.path}
                  className="text-sm font-medium tracking-wide uppercase text-charcoal hover:text-primary transition-colors duration-300 relative group flex items-center h-8"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <div className="text-sm font-medium tracking-wide uppercase text-charcoal hover:text-primary transition-colors duration-300 cursor-pointer flex items-center gap-1 h-8">
                  {link.name}
                  {link.name !== "Gallery" && (
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </div>
              )}

              {link.subLinks && (
                <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-ivory shadow-premium border border-sand/20 rounded-sm py-2 min-w-[180px] flex flex-col">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.path}
                        className="px-6 py-3 text-sm tracking-wider uppercase text-charcoal hover:text-primary hover:bg-cream transition-colors duration-200 block"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-10 text-charcoal p-2 focus:outline-none"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            setOpenDropdown(null); // Reset dropdowns when closing menu
          }}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-full h-screen bg-ivory z-0 flex flex-col justify-center items-center"
            >
              <nav className="flex flex-col items-center space-y-6 w-full max-w-sm px-6">
                {navLinks.map((link) => (
                  <div key={link.name} className="w-full flex flex-col items-center">
                    {link.path ? (
                      <Link
                        href={link.path}
                        className="text-h4 text-charcoal hover:text-primary transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className="text-h4 text-charcoal hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        {link.name}
                        {link.name !== "Gallery" && (
                          <svg className={`w-6 h-6 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                    )}
                    
                    {/* Mobile Dropdown Accordion */}
                    <AnimatePresence>
                      {link.subLinks && openDropdown === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden w-full flex flex-col items-center mt-4 space-y-4"
                        >
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.path}
                              className="text-xl text-charcoal/70 uppercase tracking-widest hover:text-primary transition-colors duration-300"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
