import React, { useEffect, useState } from "react";
import API from "../services/api";
import { 
  Users, BookOpen, Layers, UserSquare2, 
  LayoutDashboard, RefreshCcw, TrendingUp, PieChart as PieIcon
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from "recharts";

const DashboardHome = () => {
  const [stats, setStats] = useState({ students: 0, courses: 0, batches: 0, trainers: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // MOCK DATA FOR CHARTS (Replace with real API data if available)
  const areaData = [
    { month: "Jan", enrollments: 45 },
    { month: "Feb", enrollments: 52 },
    { month: "Mar", enrollments: 48 },
    { month: "Apr", enrollments: 70 },
    { month: "May", enrollments: 61 },
    { month: "Jun", enrollments: 85 },
  ];

  const pieData = [
    { name: "Technical", value: 400 },
    { name: "Management", value: 300 },
    { name: "Design", value: 200 },
    { name: "Soft Skills", value: 100 },
  ];

  const COLORS = ["#0f172a", "#6366f1", "#94a3b8", "#cbd5e1"];

  const fetchStats = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setRefreshing(true);
    try {
      const [usersRes, coursesRes, batchesRes, trainersRes] = await Promise.all([
        API.get("/users"), API.get("/courses"), API.get("/batches"), API.get("/trainers")
      ]);
      const studentsOnly = usersRes.data.filter((u) => u.role === "ROLE_STUDENT");
      setStats({
        students: studentsOnly.length,
        courses: coursesRes.data?.length || 0,
        batches: batchesRes.data?.length || 0,
        trainers: trainersRes.data?.length || 0,
      });
    } catch (err) { console.error("Database sync error"); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => fetchStats(true), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10 bg-slate-50/30 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-8 gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-slate-900 rounded-sm">
            <LayoutDashboard className="text-indigo-400" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-slate-900 leading-none">Command Center</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 italic">SSY Academics • Real-time Analytical Oversight</p>
          </div>
        </div>
        <button onClick={() => fetchStats()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
          <RefreshCcw size={14} className={refreshing ? "animate-spin" : ""} /> Sync Database
        </button>
      </div>

      {/* --- TOP METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard icon={<Users size={18}/>} label="Total Students" value={stats.students} trend="+12%" />
        <MetricCard icon={<BookOpen size={18}/>} label="Course Assets" value={stats.courses} trend="Steady" />
        <MetricCard icon={<Layers size={18}/>} label="Active Batches" value={stats.batches} trend="+4" />
        <MetricCard icon={<UserSquare2 size={18}/>} label="Faculty" value={stats.trainers} trend="Optimal" />
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AREA CHART: ENROLLMENT TREND */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-500" /> Enrollment Velocity
            </h3>
            <span className="text-[9px] bg-slate-100 px-2 py-1 font-bold rounded-sm">H1 2026</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <Tooltip contentStyle={{borderRadius: '0px', border: '2px solid #0f172a', fontSize: '10px', fontWeight: '900'}} />
                <Area type="monotone" dataKey="enrollments" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEnroll)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART: DISTRIBUTION */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
              <PieIcon size={16} className="text-indigo-500" /> Resource Split
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="rect" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-sm group hover:border-slate-900 transition-all shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 text-slate-900 rounded-sm group-hover:bg-slate-900 group-hover:text-indigo-400 transition-colors">
        {icon}
      </div>
      <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{trend}</span>
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mt-1">{value.toString().padStart(2, '0')}</h2>
  </div>
);

export default DashboardHome;