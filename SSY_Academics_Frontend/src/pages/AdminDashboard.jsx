import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  UserPlus,
  LogOut,
  Bell,
  ChevronRight,
  AlertTriangle, // Added for the logout warning
  ShieldAlert,    // Added for visual impact
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Manager Components
import TrainerManager from "../components/TrainerManager";
import CourseManager from "../components/CourseManager";
import BatchManager from "../components/BatchManager";
import StudentManager from "../components/StudentManager";
import DashboardHome from "../components/DashboardHome";

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal State
  const navigate = useNavigate();

  // Actual Logout Logic
  const performLogout = () => {
    localStorage.clear();
    toast.success("Admin Session Ended");
    navigate("/login");
  };

  const renderTab = () => {
    switch (tab) {
      case "trainers": return <TrainerManager />;
      case "courses": return <CourseManager />;
      case "batches": return <BatchManager />;
      case "students": return <StudentManager />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 flex flex-col">
      <Toaster position="top-right" />

      {/* --- MODAL: LOGOUT CONFIRMATION --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white border-t-4 border-slate-900 max-w-sm w-full p-8 shadow-2xl animate-in zoom-in duration-200 rounded-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-sm">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900">
                  Exit System?
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Security Protocol: Admin_Exit
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
              You are about to terminate the Administrator session. Any unsaved administrative changes in the management panels will be lost.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-3 text-[10px] font-black tracking-widest border border-slate-200 hover:bg-slate-50 transition-all uppercase rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={performLogout}
                className="px-4 py-3 text-[10px] font-black tracking-widest bg-slate-900 text-white hover:bg-red-600 transition-all uppercase shadow-lg shadow-red-100 rounded-sm"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter uppercase">
            SSY <span className="text-indigo-400">Academics</span>
          </span>
          <span className="ml-2 px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-widest border border-indigo-500/30 uppercase">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-1 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
          </button>
          
          <button
            onClick={() => setShowLogoutModal(true)} // Triggers Modal
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-16 h-[calc(100vh-64px)]">
          <nav className="flex-1 p-4 space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">
              Management Console
            </p>
            
            <SidebarBtn current={tab} setTab={setTab} label="dashboard" icon={<LayoutDashboard size={18} />} />
            <SidebarBtn current={tab} setTab={setTab} label="trainers" icon={<Users size={18} />} />
            <SidebarBtn current={tab} setTab={setTab} label="courses" icon={<BookOpen size={18} />} />
            <SidebarBtn current={tab} setTab={setTab} label="batches" icon={<Layers size={18} />} />
            <SidebarBtn current={tab} setTab={setTab} label="students" icon={<UserPlus size={18} />} />
          </nav>
          
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-100 rounded-sm">
              <div className="w-8 h-8 bg-slate-900 text-indigo-400 rounded-sm flex items-center justify-center font-black text-xs">
                SYS
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-black truncate uppercase tracking-tighter">Root Administrator</p>
                <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Active</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- CONTENT AREA --- */}
        <main className="flex-1 p-8 bg-slate-50/30">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {renderTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarBtn = ({ icon, label, setTab, current }) => {
  const isActive = current === label;

  return (
    <button
      onClick={() => setTab(label)}
      className={`
        flex items-center justify-between w-full px-4 py-3.5 rounded-sm transition-all duration-200 group
        ${isActive 
          ? "bg-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.02]" 
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}
      `}
    >
      <div className="flex items-center gap-3">
        <span className={`${isActive ? "text-indigo-400" : "text-slate-300 group-hover:text-indigo-500"}`}>
          {icon}
        </span>
        <span className="text-[11px] font-black uppercase tracking-widest">
          {label}
        </span>
      </div>
      {isActive && <ChevronRight size={14} className="text-indigo-400" />}
    </button>
  );
};

export default AdminDashboard;