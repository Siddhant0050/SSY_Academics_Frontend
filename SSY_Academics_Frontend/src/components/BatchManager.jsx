import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Layers,
  Plus,
  User,
  BookOpen,
  Trash2,
  Calendar,
  Users,
  Edit3,
  X,
  Save,
  CheckCircle2,
  PieChart,
  Activity,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const BatchManager = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    batchName: "",
    capacity: "",
    startDate: "",
    endDate: "",
    status: "UPCOMING",
    courseId: "",
    trainerId: "",
  });

  const fetchAll = async () => {
    try {
      const res = await Promise.allSettled([
        API.get("/batches"),
        API.get("/courses"),
        API.get("/trainers"),
      ]);
      if (res[0].status === "fulfilled") setData(res[0].value.data || []);
      if (res[1].status === "fulfilled") setCourses(res[1].value.data || []);
      if (res[2].status === "fulfilled") setTrainers(res[2].value.data || []);
    } catch (err) {
      toast.error("Systems out of sync");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = {
    total: data.length,
    active: data.filter((b) => b.status === "ACTIVE").length,
    upcoming: data.filter((b) => b.status === "UPCOMING").length,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.batchName || !form.courseId || !form.trainerId)
      return toast.error("Required fields missing");

    setLoading(true);
    try {
      const payload = {
        ...form,
        courseId: Number(form.courseId),
        trainerId: Number(form.trainerId),
        capacity: Number(form.capacity) || 0,
      };

      if (editId) {
        await API.put(`/batches/${editId}`, payload);
        toast.success("Batch updated");
      } else {
        await API.post("/batches", payload);
        toast.success("Batch created");
      }
      resetForm();
      fetchAll();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEditRequest = (batch) => {
    setEditId(batch.id);
    setForm({ ...batch });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      batchName: "",
      capacity: "",
      startDate: "",
      endDate: "",
      status: "UPCOMING",
      courseId: "",
      trainerId: "",
    });
  };

  const deleteBatch = async (id) => {
    if (window.confirm("Permanent delete?")) {
      try {
        await API.delete(`/batches/${id}`);
        toast.success("Removed");
        fetchAll();
      } catch {
        toast.error("Failed");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Batch Registry
          </h1>
          <p className="text-slate-500 font-medium italic">
            SSY Academics • Management Console
          </p>
        </div>

        {/* QUICK STATS RIBBON */}
        <div className="flex items-center gap-6 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm">
          <div className="px-4 py-2 border-r border-slate-100 text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
              Total Batches
            </p>
            <p className="text-xl font-bold text-slate-800">{stats.total}</p>
          </div>
          <div className="px-4 py-2 border-r border-slate-100 text-center">
            <p className="text-[9px] font-black text-emerald-400 uppercase mb-1">
              Live Now
            </p>
            <p className="text-xl font-bold text-emerald-600">{stats.active}</p>
          </div>
          <div className="px-4 py-2 text-center">
            <p className="text-[9px] font-black text-indigo-400 uppercase mb-1">
              Upcoming
            </p>
            <p className="text-xl font-bold text-indigo-600">
              {stats.upcoming}
            </p>
          </div>
        </div>
      </div>

      {/* PROFESSIONAL FORM */}
      <section
        className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${editId ? "border-indigo-400 ring-4 ring-indigo-50" : "border-slate-200"}`}
      >
        <div className="px-8 py-4 bg-slate-50/50 border-b flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center gap-2">
            {editId ? (
              <Edit3 size={14} className="text-indigo-600" />
            ) : (
              <Plus size={14} className="text-indigo-600" />
            )}
            {editId ? "Modify Existing Batch" : "Configure New Batch"}
          </h2>
          {editId && (
            <button
              onClick={resetForm}
              className="text-xs font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-all flex items-center gap-1"
            >
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Batch Identity Name
              </label>
              <input
                value={form.batchName}
                onChange={(e) =>
                  setForm({ ...form, batchName: e.target.value })
                }
                className="w-full text-lg border-b-2 border-slate-100 focus:border-indigo-500 transition-all outline-none py-1 placeholder:text-slate-200 bg-transparent"
                placeholder="e.g. Fullstack Engineering Immersion"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Current Lifecycle
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border-b-2 border-slate-100 focus:border-indigo-500 transition-all outline-none py-1.5 text-sm bg-transparent"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Assigned Course
              </label>
              <select
                value={form.courseId}
                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                className="w-full border border-slate-100 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none bg-slate-50/30"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Faculty Head
              </label>
              <select
                value={form.trainerId}
                onChange={(e) =>
                  setForm({ ...form, trainerId: e.target.value })
                }
                className="w-full border border-slate-100 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none bg-slate-50/30"
              >
                <option value="">Select Trainer</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Commencement
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full border border-slate-100 rounded-lg p-2.5 text-sm outline-none bg-slate-50/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                Completion
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full border border-slate-100 rounded-lg p-2.5 text-sm outline-none bg-slate-50/30"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-6 border-t border-slate-50">
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <Users size={18} className="text-slate-400" />
            </div>

            <button
              disabled={loading}
              className={`px-12 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-3 ${editId ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-900 hover:bg-black text-white"}`}
            >
              {loading
                ? "Processing..."
                : editId
                  ? "Update Registry"
                  : "Initialize Batch"}
              {editId ? <Save size={18} /> : <Plus size={18} />}
            </button>
          </div>
        </form>
      </section>

      {/* DATA GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
          >
            <div className="flex justify-between mb-6">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  b.status === "ACTIVE"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : "bg-slate-50 text-slate-400 border-slate-100"
                }`}
              >
                {b.status}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditRequest(b)}
                  className="p-2 text-slate-400 hover:text-indigo-600"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => deleteBatch(b.id)}
                  className="p-2 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-6 truncate">
              {b.batchName}
            </h3>

            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                  <Calendar size={14} className="text-indigo-400" />
                  {b.startDate || "—"}
                </div>
                <div className="text-[10px] font-bold text-slate-300 uppercase">
                  Syllabus
                </div>
              </div>
              <p className="text-sm font-bold text-slate-700 truncate">
                {courses.find((c) => c.id === b.courseId)?.title ||
                  "General Program"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchManager;
