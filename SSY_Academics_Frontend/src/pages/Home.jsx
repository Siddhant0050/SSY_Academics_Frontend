import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  PlayCircle,
  Award,
  Users,
  ShieldCheck,
} from "lucide-react";

const Home = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const featuredCourses = [
    {
      id: 1,
      title: "Mastering Spring Boot 3.0 & Microservices",
      author: "Siddhant Yadav",
      rating: 4.9,
      reviews: "2.5k",
      price: "₹499",
      oldPrice: "₹3,499",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "React JS 19: The Ultimate Deep Dive",
      author: "SSY Team",
      rating: 4.8,
      reviews: "1.8k",
      price: "₹399",
      oldPrice: "₹2,999",
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop",
      badge: "New",
    },
    {
      id: 3,
      title: "Complete PostgreSQL for Architects",
      author: "Siddhant Yadav",
      rating: 4.7,
      reviews: "950",
      price: "₹599",
      oldPrice: "₹1,999",
      img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400&auto=format&fit=crop",
      badge: "",
    },

    // --- UPDATED COURSE HERE ---
    {
      id: 4,
      title: "DevOps Mastery: Docker, Kubernetes & CI/CD", // Updated Title
      author: "SSY Team",
      rating: 4.9,
      reviews: "3.2k",
      price: "₹799",
      oldPrice: "₹4,499",
      // Updated Image Link (Server/Infrastructure focused)
      img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400&auto=format&fit=crop",
      badge: "Bestseller",
    },
    // ----------------------------

    {
      id: 5,
      title: "Full Stack Java: React & Spring Boot",
      author: "Siddhant Yadav",
      rating: 4.9,
      reviews: "5.1k",
      price: "₹899",
      oldPrice: "₹6,499",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
      badge: "Career Track",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#f8f9fb] py-16 px-6 lg:px-20 overflow-hidden">
        <div className="max-w-[1340px] mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 z-10">
            <div className="inline-block bg-udemyPurple/10 text-udemyPurple font-bold text-xs px-3 py-1 mb-4 rounded-full">
              SALE ENDS TODAY: COURSES FROM ₹399
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-udemyDark tracking-tighter leading-tight mb-6">
              Learn Without{" "}
              <span className="text-udemyPurple underline decoration-4 underline-offset-8">
                Limits
              </span>
            </h1>
            <p className="text-lg text-udemyGray mb-8 max-w-md leading-relaxed">
              Start, switch, or advance your career with comprehensive courses
              taught by industry veterans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="bg-udemyDark text-white px-8 py-4 font-bold hover:bg-gray-800 text-center transition-all"
              >
                Explore Courses
              </Link>
              <Link
                to="/join"
                className="border border-udemyDark text-udemyDark px-8 py-4 font-bold hover:bg-gray-50 text-center transition-all"
              >
                Join for Free
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
              alt="Student Learning"
              className="shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500 rounded-sm"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl hidden md:block">
              <p className="text-2xl font-bold text-udemyPurple">1,200+</p>
              <p className="text-xs text-udemyGray font-bold uppercase tracking-widest">
                Placements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC COURSE SLIDER */}
      <section className="max-w-[1340px] mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-udemyDark">
              What to learn next
            </h2>
            <p className="text-udemyGray">
              Top courses hand-picked for your tech career
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-udemyDark rounded-full hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-udemyDark rounded-full hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 no-scrollbar pb-8 scroll-smooth"
        >
          {featuredCourses.map((course) => (
            <div key={course.id} className="min-w-[280px] group cursor-pointer">
              <div className="aspect-video bg-gray-100 border border-udemyBorder overflow-hidden mb-2">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-[16px] text-udemyDark line-clamp-2 group-hover:text-udemyPurple leading-tight">
                {course.title}
              </h3>
              <p className="text-[12px] text-udemyGray mt-1">{course.author}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-orange-900 font-bold text-sm">
                  {course.rating}
                </span>
                <div className="flex text-orange-500">
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-udemyGray text-[12px]">
                  ({course.reviews})
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-lg text-udemyDark">
                  {course.price}
                </span>
                <span className="text-udemyGray line-through text-sm">
                  {course.oldPrice}
                </span>
              </div>
              {course.badge && (
                <span className="mt-2 inline-block bg-[#ecebfe] text-[#1e1e1c] text-[10px] font-bold px-2 py-0.5">
                  {course.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUST & STATS SECTION */}
      <section className="bg-udemyDark text-white py-20 px-6">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <PlayCircle className="w-12 h-12 text-udemyPurple mb-4" />
            <h4 className="text-xl font-bold mb-2">Expert-led Instruction</h4>
            <p className="text-gray-400 text-sm">
              Courses designed and taught by industry veterans like Siddhant
              Yadav.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-12 h-12 text-udemyPurple mb-4" />
            <h4 className="text-xl font-bold mb-2">Lifetime Access</h4>
            <p className="text-gray-400 text-sm">
              Learn at your own pace with lifetime access to courses on mobile
              and desktop.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-udemyPurple mb-4" />
            <h4 className="text-xl font-bold mb-2">Job Ready Skills</h4>
            <p className="text-gray-400 text-sm">
              Gain practical skills that are directly applicable to the current
              job market.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (FOR INSTRUCTORS) */}
      <section className="max-w-[1000px] mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500&auto=format&fit=crop"
          alt="Become an Instructor"
          className="w-full md:w-[400px] rounded-sm shadow-lg"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-udemyDark mb-4">
            Become an instructor
          </h2>
          <p className="text-lg text-udemyGray mb-8">
            Instructors from around the world teach millions of learners on SSY
            Academics. We provide the tools and platform to teach what you love.
          </p>
          <Link
            to="/join"
            className="bg-udemyDark text-white px-8 py-4 font-bold hover:bg-gray-800 transition-all"
          >
            Start teaching today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
