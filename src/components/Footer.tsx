import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Board of Directors', href: '/board' },
  { name: 'Sponsors', href: '/sponsors' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const programLinks = [
  { name: 'Housing Stability', href: '/programs#housing' },
  { name: 'Baby Supplies', href: '/programs#supplies' },
  { name: 'Childcare Support', href: '/programs#childcare' },
  { name: 'Emergency Assistance', href: '/programs#emergency' },
];

const formLinks = [
  { name: 'Request Support', href: '/forms/family-support' },
  { name: 'Emergency Help', href: '/forms/emergency-assistance' },
  { name: 'Volunteer', href: '/forms/volunteer' },
  { name: 'Partner With Us', href: '/forms/sponsor-inquiry' },
];

export default function Footer() {
  return (
    <footer className="bg-[#5A4A42] text-white">
      {/* Main Footer */}
      <div className="mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-['Montserrat'] font-bold text-2xl tracking-tight text-white">
                Samara Works
              </span>
            </Link>
            <p className="text-[#D4C4BC] text-sm leading-relaxed mb-6">
              Building safe homes, stronger families, and brighter futures for mothers, 
              children, and families in need.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8B4B8] hover:text-[#5A4A42] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8B4B8] hover:text-[#5A4A42] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8B4B8] hover:text-[#5A4A42] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8B4B8] hover:text-[#5A4A42] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider mb-6 text-[#E8B4B8]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#D4C4BC] hover:text-[#E8B4B8] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider mb-6 text-[#E8B4B8]">
              Programs
            </h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#D4C4BC] hover:text-[#E8B4B8] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider mb-6 mt-8 text-[#E8B4B8]">
              Get Involved
            </h3>
            <ul className="space-y-3">
              {formLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#D4C4BC] hover:text-[#E8B4B8] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider mb-6 text-[#E8B4B8]">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <span className="text-[#D4C4BC] text-sm">
                  22 Fairlawn Ave<br />
                  Albany, NY 12203
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E8B4B8] flex-shrink-0" />
                <a
                  href="tel:614-733-9624"
                  className="text-[#D4C4BC] hover:text-[#E8B4B8] transition-colors text-sm"
                >
                  614-733-9624
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E8B4B8] flex-shrink-0" />
                <a
                  href="mailto:info@samaraworks.org"
                  className="text-[#D4C4BC] hover:text-[#E8B4B8] transition-colors text-sm"
                >
                  info@samaraworks.org
                </a>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider mb-4 text-[#E8B4B8]">
                Newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/10 rounded-full text-sm text-white placeholder:text-[#D4C4BC] focus:outline-none focus:ring-2 focus:ring-[#E8B4B8]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E8B4B8] text-[#5A4A42] font-semibold text-sm rounded-full hover:bg-[#D9A5A5] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#D4C4BC] text-sm text-center md:text-left">
              © 2026 Samara Works, Inc. All rights reserved.
            </p>
            <p className="text-[#D4C4BC] text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-[#E8B4B8] fill-[#E8B4B8]" /> for families
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[#D4C4BC] hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#D4C4BC] hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
