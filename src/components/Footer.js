import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-chocolate text-ivory py-16 md:py-24 border-t border-burgundy/20">
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Image
              src="/logo.jpg"
              alt="Foinster Arch Logo"
              width={240}
              height={80}
              className="object-contain w-auto h-12 md:h-16 mb-8 mix-blend-screen invert opacity-90"
            />
            <p className="text-sand/80 leading-relaxed max-w-sm font-light text-sm md:text-base">
              Designing spaces with clarity, craft, and calm. We create timeless architecture, interiors, renovations, and turnkey solutions shaped by context, function, and elegance.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-lg md:text-xl text-cream mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Services</Link></li>
              <li><Link href="/projects" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Projects</Link></li>
              <li><Link href="/process" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Our Process</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-lg md:text-xl text-cream mb-6 tracking-wide">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/gallery" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Gallery</Link></li>
              <li><Link href="/blog" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Blog</Link></li>
              <li><Link href="/testimonials" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Testimonials</Link></li>
              <li><Link href="/faq" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-sand/70 hover:text-ivory transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-lg md:text-xl text-cream mb-6 tracking-wide">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sand/70">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-burgundy" strokeWidth={1.5} />
                <div className="flex flex-col space-y-2">
                  <span className="text-sm leading-relaxed"><strong>Head Office:</strong> PO Kumaramputhoor, Mannarkkad via, Palakkad, PIN 678583, Kerala</span>
                  <span className="text-sm leading-relaxed"><strong>Corporate Office:</strong> Hilite Business Park, Calicut</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sand/70">
                <Phone size={18} className="mt-1 flex-shrink-0 text-burgundy" strokeWidth={1.5} />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm">+91 7560 870 124</span>
                  <span className="text-sm">+91 6235 003 603</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sand/70">
                <Mail size={18} className="flex-shrink-0 text-burgundy" strokeWidth={1.5} />
                <span className="text-sm">kvhfoinster@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sand/50 tracking-wider">
            &copy; {new Date().getFullYear()} FOINSTER ARCH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 text-sm font-medium">
            <a href="#" aria-label="Instagram" className="text-sand/70 hover:text-ivory transition-colors duration-300">
              IG
            </a>
            <a href="#" aria-label="LinkedIn" className="text-sand/70 hover:text-ivory transition-colors duration-300">
              IN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
