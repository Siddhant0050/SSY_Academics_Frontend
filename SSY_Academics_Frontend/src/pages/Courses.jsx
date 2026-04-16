import React, { useState } from 'react';
import { Search, Star, ChevronDown, Filter, LayoutGrid } from 'lucide-react';

const Courses = () => {
  // Enhanced dummy data with professional image links
  const courses = [
    { 
      id: 1, 
      title: 'Java Spring Boot 3.0: The Complete Guide', 
      author: 'Siddhant Yadav', 
      rating: 4.8, 
      reviews: '15,432', 
      price: '₹499', 
      oldPrice: '₹3,499', 
      tag: 'Bestseller',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop' // Tech/Code
    },
    { 
      id: 2, 
      title: 'React JS 19 - Mastering Hooks and Context', 
      author: 'SSY Team', 
      rating: 4.9, 
      reviews: '8,210', 
      price: '₹399', 
      oldPrice: '₹1,999', 
      tag: 'New',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop' // React Logo
    },
    { 
      id: 3, 
      title: 'Advanced PostgreSQL for Developers', 
      author: 'Siddhant Yadav', 
      rating: 4.7, 
      reviews: '2,150', 
      price: '₹599', 
      oldPrice: '₹2,499', 
      tag: 'Hot',
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop' // Server/Database
    },
    { 
      id: 4, 
      title: 'Tailwind CSS: From Zero to UI Expert', 
      author: 'SSY Team', 
      rating: 4.6, 
      reviews: '5,600', 
      price: '₹449', 
      oldPrice: '₹3,299', 
      tag: '',
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600&auto=format&fit=crop' // Modern UI design
    },
    { 
      id: 5, 
      title: 'Microservices with Spring Cloud', 
      author: 'Siddhant Yadav', 
      rating: 4.8, 
      reviews: '1,200', 
      price: '₹799', 
      oldPrice: '₹4,999', 
      tag: 'Bestseller',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' // Cloud/Networking
    },
    { 
      id: 6, 
      title: 'Full Stack Web Development with React & Java', 
      author: 'SSY Team', 
      rating: 4.9, 
      reviews: '10,100', 
      price: '₹999', 
      oldPrice: '₹6,499', 
      tag: 'Bestseller',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop' // Collaboration/Project
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Enhanced Page Header Banner */}
      <section className="bg-udemyBg border-b border-udemyBorder py-10 px-6 mb-12">
        <div className="max-w-[1340px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-udemyDark tracking-tight mb-2">Software Development Courses</h1>
            <p className="text-udemyGray text-lg max-w-2xl">Master the most in-demand tech skills from industry experts at SSY Academics.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 border border-udemyDark px-4 py-2 font-bold text-sm">
             <LayoutGrid className="w-4 h-4" />
             Explore Learning Paths
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <div className="max-w-[1340px] mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <button className="flex items-center gap-2 lg:hidden mb-4 p-2 border border-udemyDark font-bold text-sm w-full justify-center hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            
            <div className="hidden lg:block space-y-6">
              <FilterSection title="Category" options={['Java', 'React', 'Database', 'Cloud']} />
              <FilterSection title="Level" options={['Beginner', 'Intermediate', 'Expert']} />
              <FilterSection title="Price" options={['Paid', 'Free']} />
              <FilterSection title="Rating" options={['4.5 & up', '4.0 & up', '3.5 & up']} />
            </div>
          </aside>

          {/* Course Grid - Now using the CourseCard with Images */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-4">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

/* Sub-Component: Filter Section */
const FilterSection = ({ title, options }) => (
  <div className="border-t border-udemyBorder pt-4">
    <div className="flex justify-between items-center cursor-pointer group mb-3">
      <h3 className="font-bold text-lg text-udemyDark">{title}</h3>
      <ChevronDown className="w-4 h-4 text-udemyDark group-hover:text-udemyPurple" />
    </div>
    <div className="space-y-2">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 border-udemyDark rounded-none checked:bg-udemyDark" />
          <span className="text-sm text-gray-700 group-hover:text-udemyDark">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

/* Enhanced Sub-Component: Course Card with Images */
const CourseCard = ({ title, author, rating, reviews, price, oldPrice, tag, imageUrl }) => (
  <div className="flex flex-col gap-1 cursor-pointer group">
    {/* Clean Image Container with Shadow */}
    <div className="aspect-video bg-gray-100 border border-udemyBorder overflow-hidden mb-1 shadow-sm transition-shadow group-hover:shadow-md">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    
    {/* Text Content */}
    <h3 className="font-bold text-[16px] leading-tight text-udemyDark group-hover:text-udemyPurple line-clamp-2 mt-1">
      {title}
    </h3>
    <p className="text-[12px] text-udemyGray">{author}</p>
    
    {/* Ratings */}
    <div className="flex items-center gap-1">
      <span className="text-orange-900 font-bold text-sm">{rating}</span>
      <div className="flex text-orange-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 fill-current ${i >= Math.floor(rating) ? 'text-gray-300' : ''}`} />
        ))}
      </div>
      <span className="text-udemyGray text-[12px]">({reviews})</span>
    </div>
    
    {/* Pricing */}
    <div className="flex items-center gap-2">
      <span className="font-bold text-lg text-udemyDark">{price}</span>
      <span className="text-udemyGray line-through text-sm">{oldPrice}</span>
    </div>
    
    {/* Bestseller Badge */}
    {tag && (
      <div className="mt-1">
        <span className="bg-[#ecebfe] text-[#1e1e1c] text-[10px] font-bold px-2 py-0.5">
          {tag}
        </span>
      </div>
    )}
  </div>
);

export default Courses;