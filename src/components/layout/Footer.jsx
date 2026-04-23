import React from "react";
import { Link } from "react-router-dom";

// ✅ Lucide → ONLY UI icons
import { Globe, Mail, Phone, ArrowRight, MapPin } from "lucide-react";

// ✅ React Icons → Social icons
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-udemyDark text-white pt-12 md:pt-16 pb-8 px-4 sm:px-6 lg:px-20 border-t border-gray-700 font-sans">
      <div className="max-w-[1340px] mx-auto">
        
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-12 border-b border-gray-800">
          {/* Brand & Mission */}
          <div className="w-full lg:max-w-md">
            <Link to="/" className="inline-block mb-4 md:mb-6 group">
              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                SSY{" "}
                <span className="text-udemyPurple group-hover:text-white transition-colors">
                  Academics
                </span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the next generation of developers with
              industry-standard Java, React, and Full Stack expertise. Join our
              community and accelerate your career.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              <SocialIcon icon={<FaLinkedin size={18} />} href="https://linkedin.com" />
              <SocialIcon icon={<FaTwitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<FaYoutube size={18} />} href="https://youtube.com" />
              <SocialIcon icon={<FaInstagram size={18} />} href="https://instagram.com" />
              <SocialIcon icon={<FaFacebook size={18} />} href="https://facebook.com" />
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full lg:w-auto">
            <h4 className="font-bold mb-3 text-lg">Stay in the loop</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest course updates and placement news.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 p-3 px-4 text-sm focus:outline-none focus:border-udemyPurple transition-all w-full sm:min-w-[280px]"
              />

              <button className="bg-udemyPurple hover:bg-purple-700 px-6 py-3 flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-95 w-full sm:w-auto">
                Subscribe <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: LINK COLUMNS --- */}
        {/* Changed grid-cols-2 to grid-cols-1 for very small mobile, and md:grid-cols-4 for desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-12">
          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-sm uppercase tracking-widest text-udemyPurple">
              Explore
            </h5>
            <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm">
              <li><FooterLink to="/courses">Browse Courses</FooterLink></li>
              <li><FooterLink to="/placements">Placement Portal</FooterLink></li>
              <li><FooterLink to="/">Learning Paths</FooterLink></li>
              <li><FooterLink to="/">Tech Blog</FooterLink></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-sm uppercase tracking-widest text-udemyPurple">
              Learning
            </h5>
            <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm">
              <li><FooterLink to="/">Java Development</FooterLink></li>
              <li><FooterLink to="/">Frontend Engineering</FooterLink></li>
              <li><FooterLink to="/">Backend Systems</FooterLink></li>
              <li><FooterLink to="/">Database Design</FooterLink></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-sm uppercase tracking-widest text-udemyPurple">
              Support
            </h5>
            <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm">
              <li><FooterLink to="/contact">Contact Support</FooterLink></li>
              <li><FooterLink to="/">Terms & Conditions</FooterLink></li>
              <li><FooterLink to="/">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/">Cookie Settings</FooterLink></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 md:mb-6 text-sm uppercase tracking-widest text-udemyPurple">
              Contact Us
            </h5>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3 group">
                <Mail size={16} className="text-udemyPurple flex-shrink-0" />
                <span className="group-hover:text-white transition-colors break-all">
                  yadavsiddhant10@gmail.com
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={16} className="text-udemyPurple flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">
                  +91 9359562815
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-udemyPurple mt-1 flex-shrink-0" />
                <span>Nandanvan Park, Karve Nagar, Pune 411052</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: LEGAL & LOCALE --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 mt-4 text-gray-500 text-[11px] md:text-[12px] gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <p>© {currentYear} SSY Academics. All rights reserved.</p>
            <div className="flex gap-4">
              <FooterLink to="/">Sitemap</FooterLink>
              <FooterLink to="/">Accessibility</FooterLink>
            </div>
          </div>

          <button className="flex items-center gap-2 border border-gray-700 px-4 py-1.5 hover:bg-gray-800 transition-colors">
            <Globe size={14} />
            <span>English (India)</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

/* --- HELPER COMPONENTS --- */

const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 p-2.5 hover:bg-udemyPurple hover:text-white text-gray-400 cursor-pointer transition-all duration-300 rounded-sm"
  >
    {icon}
  </a>
);

const FooterLink = ({ children, to }) => (
  <Link
    to={to}
    className="hover:text-white hover:translate-x-1 transition-all inline-block"
  >
    {children}
  </Link>
);

export default Footer;