import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  LogOut,
  PlayCircle,
  FileText,
  MessageSquare,
  Bell,
  Clock,
  ArrowRight,
} from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
 const userName = localStorage.getItem("name") || "Student";
const userEmail = localStorage.getItem("email") || "No email";
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const dailyUpdates = [
    {
      id: 1,
      time: "10:30 AM",
      title: "New Assignment Uploaded",
      desc: "Spring Security JWT implementation task is now live.",
      type: "task",
    },
    {
      id: 2,
      time: "02:00 PM",
      title: "Live Session Link",
      desc: "Doubt clearing session starting in 30 minutes on Zoom.",
      type: "live",
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      task: "Complete Axios Integration",
      deadline: "Today",
      status: "Pending",
    },
    {
      id: 2,
      task: "Database Schema Design",
      deadline: "Tomorrow",
      status: "In Progress",
    },
    {
      id: 3,
      task: "React Hooks Quiz",
      deadline: "19 April",
      status: "Not Started",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans text-udemyDark">
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-udemyDark text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-8">
          <span className="text-xl font-black uppercase tracking-tighter">
            SSY <span className="text-udemyPurple">Academics</span>
          </span>
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            <button className="hover:text-white transition-colors">
              My Courses
            </button>
            <button className="hover:text-white transition-colors">
              Resources
            </button>
            <button className="hover:text-white transition-colors">
              Placements
            </button>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-udemyPurple rounded-full border-2 border-udemyDark"></span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-bold transition-all border border-white/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto w-full p-6 grid lg:grid-cols-12 gap-6">
        {/* --- LEFT COLUMN: WELCOME & CURRENT COURSE (8 COLS) --- */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Card */}
          <header className="bg-white border border-gray-100 p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-black mb-2">
                Welcome back!
              </h1>

              <p className="text-udemyGray max-w-md">{userEmail}</p>
              <p className="text-udemyGray max-w-md">
                You have completed{" "}
                <span className="font-bold text-udemyDark">65%</span> of your
                current track. You're on schedule to graduate in June.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-5">
              <BookOpen size={200} />
            </div>
          </header>

          {/* Current Course Card */}
          <section className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
                <PlayCircle size={18} className="text-udemyPurple" /> Currently
                Enrolled
              </h2>
              <span className="text-[10px] font-black bg-purple-50 text-udemyPurple px-2 py-1">
                BATCH: JAVA-FS-APR26
              </span>
            </div>

            <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-48 h-32 bg-gray-900 flex items-center justify-center relative group cursor-pointer">
                <PlayCircle
                  className="text-white opacity-50 group-hover:scale-110 transition-transform"
                  size={40}
                />
              </div>
              <div className="flex-grow space-y-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Full Stack Java Development with React
                  </h3>
                  <p className="text-sm text-udemyGray">
                    Module 4: Advanced Spring Security & JWT
                  </p>
                </div>
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Course Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2">
                    <div className="bg-udemyPurple h-full w-[65%]"></div>
                  </div>
                </div>
                <button className="bg-udemyDark text-white px-6 py-3 text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
                  Continue Learning <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Useful Buttons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardButton icon={<FileText />} label="Assignments" />
            <DashboardButton icon={<Calendar />} label="Schedule" />
            <DashboardButton icon={<MessageSquare />} label="Ask Mentor" />
            <DashboardButton icon={<CheckSquare />} label="Certificates" />
          </div>
        </div>

        {/* --- RIGHT COLUMN: UPDATES & TASKS (4 COLS) --- */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Updates Section */}
          <section className="bg-white border border-gray-100 shadow-sm">
            <div className="p-5 border-b border-gray-50 flex items-center gap-2">
              <Clock size={18} className="text-udemyPurple" />
              <h2 className="font-bold uppercase text-xs tracking-widest">
                Daily Updates
              </h2>
            </div>
            <div className="p-5 space-y-6">
              {dailyUpdates.map((update) => (
                <div
                  key={update.id}
                  className="border-l-2 border-udemyPurple pl-4 space-y-1"
                >
                  <span className="text-[10px] font-black text-gray-400">
                    {update.time}
                  </span>
                  <h4 className="text-sm font-bold">{update.title}</h4>
                  <p className="text-xs text-udemyGray leading-relaxed">
                    {update.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tasks Section */}
          <section className="bg-white border border-gray-100 shadow-sm">
            <div className="p-5 border-b border-gray-50 flex items-center gap-2">
              <CheckSquare size={18} className="text-udemyPurple" />
              <h2 className="font-bold uppercase text-xs tracking-widest">
                To-Do List
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {pendingTasks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div>
                    <h4 className="text-xs font-bold group-hover:text-udemyPurple transition-colors">
                      {item.task}
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      Due: {item.deadline}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-black px-2 py-1 rounded-full ${
                      item.status === "Pending"
                        ? "bg-orange-50 text-orange-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-gray-300 text-xs font-bold text-gray-400 hover:border-udemyPurple hover:text-udemyPurple transition-all mt-2">
                + View All Tasks
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* --- SHARED HELPER COMPONENTS --- */

const DashboardButton = ({ icon, label }) => (
  <button className="bg-white border border-gray-100 p-4 flex flex-col items-center gap-3 hover:border-udemyPurple hover:shadow-md transition-all group">
    <div className="text-gray-400 group-hover:text-udemyPurple transition-colors">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 group-hover:text-udemyDark">
      {label}
    </span>
  </button>
);

export default StudentDashboard;
