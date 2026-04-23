import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      {/* Main Navbar Container */}
      <div className="h-[72px] flex items-center px-4 md:px-6 gap-2 md:gap-4 max-w-[1440px] mx-auto">
        
        {/* Mobile Menu Toggle (Left side on mobile) */}
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand */}
        <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105 mr-auto lg:mr-0">
          <span className="text-[20px] md:text-[24px] font-bold tracking-tighter text-udemyDark">
            SSY <span className="text-udemyPurple">Academics</span>
          </span>
        </Link>

        {/* Desktop Categories */}
        <button className="hidden lg:block text-sm font-medium text-gray-700 hover:text-udemyPurple px-2">
          Categories
        </button>

        {/* Massive Search Bar - Hidden on Mobile, Flex on Desktop */}
        <div className="flex-grow max-w-[600px] relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search for anything" 
            className="w-full bg-[#f7f9fa] border border-udemyDark rounded-full py-2.5 px-12 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-udemyPurple transition-all"
          />
          <Search className="absolute left-4 top-2.5 text-gray-500 w-5 h-5" />
        </div>

        {/* Desktop Navigation Links - Shown from lg screen up */}
        <div className="hidden lg:flex items-center gap-5 text-sm font-medium">
          <Link to="/courses" className="hover:text-udemyPurple transition-colors whitespace-nowrap">Courses</Link>
          <Link to="/placements" className="hover:text-udemyPurple transition-colors whitespace-nowrap">Placements</Link>
          <Link to="/contact" className="hover:text-udemyPurple transition-colors whitespace-nowrap">Contact Us</Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto lg:ml-0">
          {/* Mobile Search Icon (Only visible on small screens) */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            <Search className="w-5 h-5 text-udemyDark" />
          </button>

          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer relative group">
            <ShoppingCart className="w-5 h-5 text-udemyDark" />
            <span className="absolute top-0 right-0 bg-udemyPurple text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
          </div>
          
          <Link to="/login" className="hidden sm:block px-5 py-2 border border-udemyDark font-bold text-sm hover:bg-gray-50 transition-colors">
            Log in
          </Link>
          <Link to="/join" className="px-4 py-2 md:px-5 md:py-2 bg-udemyDark text-white font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap">
            Sign up
          </Link>
          <div className="p-2 border border-udemyDark hover:bg-gray-50 cursor-pointer hidden xl:block">
            <Globe className="w-5 h-5 text-udemyDark" />
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Drawer) */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t bg-white ${isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col p-4 gap-4 text-sm font-semibold text-gray-700">
          <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="hover:text-udemyPurple">Courses</Link>
          <Link to="/placements" onClick={() => setIsMenuOpen(false)} className="hover:text-udemyPurple">Placements</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-udemyPurple">Contact Us</Link>
          <hr className="border-gray-100" />
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-udemyPurple">Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;