import React from "react";
import { 
  Trophy, 
  Users, 
  Building2, 
  CheckCircle, 
  ArrowUpRight, 
  TrendingUp, 
  Briefcase,   // ✅ FIXED
  BadgeCheck 
} from "lucide-react";

const Placements = () => {
  const stats = [
    { label: "Highest Package", value: "24 LPA", icon: <Trophy className="w-5 h-5" /> },
    { label: "Students Placed", value: "1,200+", icon: <Users className="w-5 h-5" /> },
    { label: "Hiring Partners", value: "150+", icon: <Building2 className="w-5 h-5" /> },
    { label: "Avg. Hike", value: "120%", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const students = [
    { name: "Rahul Sharma", company: "TECH MAHINDRA", package: "8.5 LPA", role: "Java Developer", track: "Full Stack Java" },
    { name: "Anjali Deshmukh", company: "ACCENTURE", package: "12.0 LPA", role: "React Engineer", track: "Frontend Specialist" },
    { name: "Amit Verma", company: "TCS", package: "6.8 LPA", role: "System Engineer", track: "Java & SQL" },
    { name: "Sneha Patil", company: "INFOSYS", package: "9.2 LPA", role: "Full Stack Developer", track: "MERN Stack" },
    { name: "Vikram Singh", company: "COGNIZANT", package: "7.5 LPA", role: "Backend Developer", track: "Spring Boot" },
    { name: "Rohan Kulkarni", company: "WIPRO", package: "6.5 LPA", role: "Software Engineer", track: "Java Developer" },
    { name: "Siddhesh Mane", company: "CAPGEMINI", package: "7.0 LPA", role: "Analyst", track: "Full Stack" },
    { name: "Pooja Gupta", company: "LTI MINDTREE", package: "10.5 LPA", role: "Cloud Developer", track: "Java Cloud" },
    { name: "Kunal Joshi", company: "NAGARRO", package: "14.0 LPA", role: "SDE-1", track: "React & Spring Boot" },
  ];

  return (
    <div className="bg-white text-udemyDark">
      {/* 1. Minimalist Header */}
      <section className="py-20 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Placement <span className="text-udemyPurple">Report 2026</span>
            </h1>
            <p className="text-udemyGray text-lg leading-relaxed">
              Verifiable career outcomes from our most recent graduating batches. 
              Focused on Java, React, and Full-Stack ecosystems.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="text-right">
                <p className="text-2xl font-bold">96%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Placement Rate</p>
             </div>
             <div className="w-[2px] bg-gray-200 h-10"></div>
             <div className="text-right">
                <p className="text-2xl font-bold">150+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hiring Firms</p>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Grid */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-6 border border-gray-100 shadow-sm">
              <div className="text-udemyPurple">{stat.icon}</div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Data Table Style Placements */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Alumni Success Logs</h2>
            <span className="text-xs font-medium text-gray-400">Updates Daily • Verified</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, i) => (
              <div key={i} className="border border-gray-100 p-6 hover:border-udemyPurple hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-udemyPurple group-hover:bg-udemyPurple group-hover:text-white transition-colors">
                    <BadgeCheck size={20} />
                  </div>
                  <span className="text-ssySuccess font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                    {student.package}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-1">{student.name}</h3>
                <p className="text-xs text-udemyGray uppercase font-bold tracking-tight mb-4">
                  {student.role}
                </p>
                
                <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                  <span className="text-[11px] font-black text-udemyDark">
                    {student.company}
                  </span>
                  <span className="text-[10px] text-gray-400 italic">
                    {student.track}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Verified Hiring Partners */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em] mb-12">
            Top Recruiting Networks
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center opacity-40 grayscale">
            {["TCS", "Accenture", "Wipro", "Infosys", "Cognizant", "Tech M"].map((brand) => (
              <span key={brand} className="text-lg font-black tracking-tighter hover:opacity-100 transition-opacity cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimal CTA */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <div className="bg-udemyDark p-12 text-center text-white flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">Join the Next Batch</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Our placement-ready courses include 1-on-1 resume reviews and direct referral access to 150+ partners.
          </p>
          <button className="bg-white text-udemyDark px-10 py-4 font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
            View Curriculum <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Placements;