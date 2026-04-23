import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
  ShieldCheck,
  AlertTriangle,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ✅ Decode JWT
  const token = localStorage.getItem("token");
  let userName = "Student";
  let userEmail = "No email";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || "Student";
      userEmail = decoded.sub || "No email";
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const dailyUpdates = [
    {
      id: 1,
      time: "10:30 AM",
      title: "New Assignment",
      desc: "Spring Security JWT task is live.",
    },
    {
      id: 2,
      time: "02:00 PM",
      title: "Live Session",
      desc: "Doubt clearing starts at 4 PM.",
    },
  ];

  const pendingTasks = [
    { id: 1, task: "Axios Integration", deadline: "Today", status: "Pending" },
    {
      id: 2,
      task: "Schema Design",
      deadline: "Tomorrow",
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 antialiased">
      <Toaster position="top-center" />

      {/* --- MODAL: LOGOUT CONFIRMATION --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Sign Out?</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to log out? You will need to re-authenticate
              to access your curriculum.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 text-sm font-bold bg-slate-900 text-white hover:bg-red-600 transition-colors"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter">
            SSY <span className="text-indigo-400">ACADEMICS</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer hover:text-indigo-400 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-indigo-400 transition-colors"
          >
            <LogOut
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Logout
          </button>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-12 gap-8">
        {/* LEFT SECTION */}
        <div className="lg:col-span-8 space-y-8">
          {/* WELCOME BANNER */}
          <div className="bg-white border border-slate-200 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 bg-slate-900 flex items-center justify-center text-indigo-400 text-2xl font-black">
                {userName.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  Welcome, {userName}
                </h1>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mt-1">
                  <ShieldCheck size={14} className="text-indigo-500" />
                  Verified Student Dashboard
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Progress
              </span>
              <div className="text-2xl font-black text-indigo-600">65%</div>
            </div>
          </div>

          {/* CURRENT COURSE GRID */}
          <div className="bg-white border border-slate-200 overflow-hidden group">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center gap-2">
              <PlayCircle size={16} className="text-indigo-600" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                Active Curriculum
              </span>
            </div>

            <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-full md:w-64 aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                <PlayCircle className="text-white/20 absolute" size={80} />
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  alt="Course Cover"
                />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-black text-xl mb-2">
                    Full Stack Java Development
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Next Lesson: Spring Security Implementation
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
                    <div className="bg-slate-900 h-full w-[65%] transition-all duration-1000"></div>
                  </div>
                </div>

                <button className="bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-100">
                  RESUME SESSION <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ACTION TILES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardButton icon={<FileText />} label="Assignments" />
            <DashboardButton icon={<Calendar />} label="Schedule" />
            <DashboardButton icon={<MessageSquare />} label="Mentor" />
            <DashboardButton icon={<CheckSquare />} label="Results" />
          </div>
        </div>

        {/* RIGHT SECTION: UPDATES & TASKS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-slate-200 p-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Clock size={14} className="text-indigo-600" /> Timeline
            </h2>

            <div className="space-y-6">
              {dailyUpdates.map((u) => (
                <div
                  key={u.id}
                  className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-indigo-500 before:rounded-full after:absolute after:left-[3px] after:top-5 after:bottom-[-20px] after:w-[1px] after:bg-slate-100 last:after:hidden"
                >
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">
                    {u.time}
                  </span>
                  <h4 className="font-bold text-sm text-slate-800">
                    {u.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
            <h2 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <CheckSquare size={14} /> Critical Tasks
            </h2>

            <div className="space-y-3">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold group-hover:text-indigo-400 transition-colors">
                      {t.task}
                    </p>
                    <span className="text-[10px] font-black uppercase text-indigo-400">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                    Deadline: {t.deadline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardButton = ({ icon, label }) => (
  <button className="bg-white border border-slate-100 p-6 flex flex-col items-center gap-3 hover:border-slate-900 hover:shadow-xl transition-all duration-300 group">
    <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">
      {label}
    </span>
  </button>
);

export default StudentDashboard;
