import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  BookOpen,
  Plus,
  IndianRupee,
  Image,
  Trash2,
  Layers,
  Edit3,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const CourseManager = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to sync courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Prepare form for editing
  const handleEditClick = (course) => {
    setIsEditing(true);
    setSelectedId(course.id);
    setForm({
      title: course.title,
      price: course.price,
      imageUrl: course.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset Form
  const resetForm = () => {
    setIsEditing(false);
    setSelectedId(null);
    setForm({ title: "", price: "", imageUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price)
      return toast.error("Please fill required fields");

    setLoading(true);
    try {
      if (isEditing) {
        // 🔥 UPDATE CALL (PUT)
        await API.put(`/courses/${selectedId}`, form);
        toast.success("Course credentials updated");
      } else {
        // 🔥 CREATE CALL (POST)
        await API.post("/courses", form);
        toast.success("New course published");
      }
      resetForm();
      fetchCourses();
    } catch (err) {
      toast.error(isEditing ? "Update failed" : "Provisioning failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Archive this course? This will restrict new enrollments.")
    ) {
      try {
        await API.delete(`/courses/${id}`);
        toast.success("Course archived");
        fetchCourses();
      } catch (err) {
        toast.error("Action restricted");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded">
            <BookOpen className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Curriculum Architect
            </h2>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
              {isEditing
                ? "Modify Existing Asset"
                : "Manage Global Course Offerings"}
            </p>
          </div>
        </div>
        {isEditing && (
          <button
            onClick={resetForm}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={14} /> Cancel Edit
          </button>
        )}
      </div>

      {/* --- FORM SECTION --- */}
      <div
        className={`bg-white border p-8 shadow-sm transition-all duration-300 ${isEditing ? "border-indigo-500 ring-1 ring-indigo-500/10" : "border-slate-200"}`}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">
              Course Title
            </label>
            <div className="relative">
              <Layers
                className={`absolute left-3 top-3.5 ${isEditing ? "text-indigo-400" : "text-slate-300"}`}
                size={16}
              />
              <input
                className="w-full border border-slate-200 bg-slate-50 p-3 pl-10 text-sm focus:bg-white focus:border-slate-900 outline-none"
                placeholder="Course Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">
              Price (INR)
            </label>
            <div className="relative">
              <IndianRupee
                className={`absolute left-3 top-3.5 ${isEditing ? "text-indigo-400" : "text-slate-300"}`}
                size={16}
              />
              <input
                type="number"
                className="w-full border border-slate-200 bg-slate-50 p-3 pl-10 text-sm focus:bg-white focus:border-slate-900 outline-none"
                placeholder="4999"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400">
              Banner URL
            </label>
            <div className="relative">
              <Image
                className={`absolute left-3 top-3.5 ${isEditing ? "text-indigo-400" : "text-slate-300"}`}
                size={16}
              />
              <input
                className="w-full border border-slate-200 bg-slate-50 p-3 pl-10 text-sm focus:bg-white focus:border-slate-900 outline-none"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-3 pt-2">
            <button
              disabled={loading}
              className={`px-10 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg shadow-slate-200
                ${isEditing ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
            >
              {isEditing ? <Edit3 size={16} /> : <Plus size={16} />}
              {loading
                ? "Processing..."
                : isEditing
                  ? "Update Course"
                  : "Publish Course"}
            </button>
          </div>
        </form>
      </div>

      {/* --- GRID LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((c) => (
          <div
            key={c.id}
            className={`group bg-white border overflow-hidden transition-all ${selectedId === c.id ? "border-indigo-600 ring-1 ring-indigo-600/20" : "border-slate-200 hover:border-slate-400"}`}
          >
            <div className="h-32 bg-slate-100 relative">
              <img
                src={c.imageUrl || "https://via.placeholder.com/300"}
                alt=""
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEditClick(c)}
                  className="bg-white/90 p-2 text-slate-600 hover:text-indigo-600 shadow-sm backdrop-blur-sm"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-white/90 p-2 text-slate-600 hover:text-red-600 shadow-sm backdrop-blur-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <h4 className="font-black text-slate-900 text-sm truncate">
                {c.title}
              </h4>
              <p className="text-indigo-600 font-black mt-2 tracking-tight">
                ₹{c.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;
