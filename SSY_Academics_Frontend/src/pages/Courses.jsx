import React, { useState, useEffect } from "react";
import API from "../services/api";
import {
  Star,
  Search,
  X,
  ArrowRight,
  Loader2,
  BookOpen,
  TrendingUp,
} from "lucide-react";

// --- FULL CATALOG DATA ---
const CATALOG = [
  {
    id: 7,
    title: "Complete Java + Spring Boot",
    author: "Java Full Stack",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: 999,
  },
  {
    id: 8,
    title: "Frontend with React",
    author: "React Mastery",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    price: 799,
  },
  {
    id: 9,
    title: "Deep dive into Spring Boot",
    author: "Spring Boot Advanced",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    price: 1099,
  },
  {
    id: 10,
    title: "Backend APIs with Node.js",
    author: "Node.js API Dev",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    price: 699,
  },
  {
    id: 11,
    title: "Master SQL & DB design",
    author: "PostgreSQL Bootcamp",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    price: 599,
  },
  {
    id: 12,
    title: "Intro to AWS services",
    author: "AWS Cloud Basics",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    price: 899,
  },
  {
    id: 13,
    title: "Containerization & orchestration",
    author: "Docker & Kubernetes",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    price: 1199,
  },
  {
    id: 14,
    title: "Learn Python from scratch",
    author: "Python for Beginners",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    price: 499,
  },
  {
    id: 15,
    title: "DSA in Java",
    author: "Data Structures",
    imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    price: 799,
  },
  {
    id: 16,
    title: "Scalable system design",
    author: "System Design",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    price: 1299,
  },
  {
    id: 18,
    title: "NoSQL database mastery",
    author: "MongoDB Guide",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    price: 599,
  },
  {
    id: 19,
    title: "Modern API development",
    author: "GraphQL API",
    imageUrl: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
    price: 699,
  },
  {
    id: 20,
    title: "Advanced TypeScript",
    author: "TypeScript Pro",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    price: 799,
  },
  {
    id: 21,
    title: "Fullstack React framework",
    author: "Next.js Course",
    imageUrl: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085",
    price: 999,
  },
  {
    id: 22,
    title: "CI/CD pipelines",
    author: "DevOps Bootcamp",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    price: 1299,
  },
  {
    id: 23,
    title: "Linux commands & scripting",
    author: "Linux Fundamentals",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    price: 499,
  },
  {
    id: 24,
    title: "Ethical hacking basics",
    author: "Cyber Security",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    price: 899,
  },
  {
    id: 25,
    title: "Machine learning basics",
    author: "AI & ML Intro",
    imageUrl: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
    price: 1399,
  },
  {
    id: 26,
    title: "Neural networks",
    author: "Deep Learning",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    price: 1499,
  },
  {
    id: 27,
    title: "Mobile apps with Flutter",
    author: "Flutter Development",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    price: 799,
  },
  {
    id: 28,
    title: "Java/Kotlin apps",
    author: "Android Development",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    price: 899,
  },
  {
    id: 29,
    title: "iPhone app development",
    author: "iOS Swift",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    price: 999,
  },
  {
    id: 30,
    title: "Intro to blockchain",
    author: "Blockchain Basics",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    price: 1199,
  },
  {
    id: 32,
    title: "Design fundamentals",
    author: "UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    price: 599,
  },
  {
    id: 33,
    title: "UI design with Figma",
    author: "Figma Design",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c",
    price: 499,
  },
  {
    id: 34,
    title: "Version control mastery",
    author: "Git & GitHub",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb",
    price: 399,
  },
  {
    id: 36,
    title: "Crack tech interviews",
    author: "Interview Prep",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    price: 999,
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const res = await API.get("/courses");
        const apiData = res.data || [];
        const combined = [
          ...apiData,
          ...CATALOG.filter((c) => !apiData.find((a) => a.id === c.id)),
        ];
        setCourses(combined);
        setFilteredCourses(combined);
      } catch (err) {
        setCourses(CATALOG);
        setFilteredCourses(CATALOG);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const result = courses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredCourses(result);
  }, [search, courses]);

  return (
    <div className="bg-white min-h-screen font-sans text-[#2d2f31] antialiased">
      {/* 1. COMPACT COURSE HEADER */}
      <section className="py-12 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Courses <span className="text-[#a435f0]">Management</span>
            </h1>

            <p className="text-[#6a6f73] text-base leading-relaxed">
              Explore, create, and manage structured learning programs across
              Java, React, Spring Boot, and Full-Stack development tracks for
              students and batches.
            </p>
          </div>

          <div className="flex gap-6 pb-1">
            <div className="text-right">
              <p className="text-3xl font-bold">Active</p>
              <p className="text-[10px] font-bold text-[#6a6f73] uppercase tracking-widest">
                Course Modules
              </p>
            </div>

            <div className="w-[1px] bg-gray-200 h-10"></div>

            <div className="text-right">
              <p className="text-3xl font-bold">Live</p>
              <p className="text-[10px] font-bold text-[#6a6f73] uppercase tracking-widest">
                Learning System
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT SEARCH BAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full pl-12 pr-4 py-3 border border-[#2d2f31] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#2d2f31] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#6a6f73]">
            <span>{filteredCourses.length} results</span>
          </div>
        </div>
      </div>

      {/* 3. CATALOG GRID */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#a435f0]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="group cursor-pointer flex flex-col h-full">
    <div className="relative aspect-video mb-3 overflow-hidden border border-gray-100">
      <img
        src={`${course.imageUrl}?auto=format&fit=crop&w=600&q=80`}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        alt={course.title}
      />
    </div>

    <div className="flex flex-col flex-grow">
      <h3 className="font-bold text-[15px] leading-tight mb-1 line-clamp-2 group-hover:text-[#a435f0] transition-colors">
        {course.title}
      </h3>
      <p className="text-[#6a6f73] text-[12px] mb-1">
        {course.author || "SSY Academics"}
      </p>

      <div className="flex items-center gap-1 mb-1">
        <span className="text-[14px] font-bold text-[#b4690e]">4.8</span>
        <div className="flex gap-0.5 text-[#b4690e]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </div>
        <span className="text-[12px] text-[#6a6f73]">(2,450)</span>
      </div>

      <div className="mt-auto pt-1">
        <span className="text-base font-bold text-[#2d2f31]">
          {course.price === 0 ? "Free" : `₹${course.price}`}
        </span>
        {course.price > 0 && (
          <span className="ml-2 text-sm text-[#6a6f73] line-through font-normal">
            ₹3,499
          </span>
        )}
      </div>

      {course.price > 1000 && (
        <div className="mt-2 inline-flex items-center gap-1 bg-[#eceb98] text-[#3d3c0a] text-[10px] font-bold px-2 py-0.5 w-fit">
          Bestseller
        </div>
      )}
    </div>
  </div>
);

export default Courses;
