import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Globe } from 'lucide-react';

const Navbar = () => (
  <nav className="h-[72px] bg-white shadow-md flex items-center px-6 gap-4 sticky top-0 z-50 font-sans">
    {/* Brand */}
    <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
      <span className="text-[24px] font-bold tracking-tighter text-udemyDark">
        SSY <span className="text-udemyPurple">Academics</span>
      </span>
    </Link>

    <button className="hidden lg:block text-sm font-medium text-gray-700 hover:text-udemyPurple px-2 transition-colors">
      Categories
    </button>

    {/* Massive Search Bar */}
    <div className="flex-grow max-w-[800px] relative hidden md:block">
      <input 
        type="text" 
        placeholder="Search for anything" 
        className="w-full bg-[#f7f9fa] border border-udemyDark rounded-full py-3 px-12 text-sm focus:outline-none focus:bg-white transition-all"
      />
      <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
    </div>

    {/* Navigation Links */}
    <div className="hidden xl:flex items-center gap-5 text-sm font-medium">
      <Link to="/courses" className="hover:text-udemyPurple transition-colors">Courses</Link>
      <Link to="/placements" className="hover:text-udemyPurple transition-colors">Placements</Link>
      <Link to="/contact" className="hover:text-udemyPurple transition-colors">Contact Us</Link>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3 ml-auto">
      <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer relative transition-colors group">
        <ShoppingCart className="w-5 h-5 text-udemyDark" />
        <span className="absolute top-0 right-0 bg-udemyPurple text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
      </div>
      
      <Link to="/login" className="hidden sm:block px-5 py-2 border border-udemyDark font-bold text-sm hover:bg-gray-50 transition-colors">
        Log in
      </Link>
      <Link to="/join" className="px-5 py-2 bg-udemyDark text-white font-bold text-sm hover:bg-gray-800 transition-colors">
        Sign up
      </Link>
      <div className="p-2 border border-udemyDark hover:bg-gray-50 cursor-pointer hidden sm:block transition-colors">
        <Globe className="w-5 h-5 text-udemyDark" />
      </div>
    </div>
  </nav>
);

export default Navbar;