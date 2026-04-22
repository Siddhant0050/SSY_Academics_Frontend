import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  GraduationCap,
  Mail,
  Search,
  UserCheck,
  Shield,
  Fingerprint,
  Plus,
  Trash2,
  Edit3,
  X,
  Save,
  UserPlus,
  CheckCircle,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollmentMap, setEnrollmentMap] = useState({});

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_STUDENT",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, batchRes] = await Promise.all([
        API.get("/users"),
        API.get("/batches"),
      ]);
      const studentOnly = userRes.data.filter(
        (user) => user.role === "ROLE_STUDENT",
      );
      setStudents(studentOnly);
      setBatches(batchRes.data);
    } catch (err) {
      toast.error("Database sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/users/${editId}`, form);
        toast.success("Profile Updated");
      } else {
        await API.post("/auth/signup", form);
        toast.success("Student Registered");
      }
      resetForm();
      fetchData();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Delete student record permanently?")) {
      try {
        await API.delete(`/users/${id}`);
        toast.success("Record Purged");
        fetchData();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEditRequest = (student) => {
    setEditId(student.id);
    setForm({ name: student.name, email: student.email, role: "ROLE_STUDENT" });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setEditId(null);
    setIsFormOpen(false);
    setForm({ name: "", email: "", password: "", role: "ROLE_STUDENT" });
  };

  const handleEnroll = async (userId) => {
    const batchId = enrollmentMap[userId];
    if (!batchId) return toast.error("Select Batch First");
    try {
      await API.post("/enrollments", { userId, batchId: Number(batchId) });
      toast.success("Enrollment Confirmed");
    } catch (err) {
      toast.error(err.response?.data || "Enrollment failed");
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 text-slate-800">
      {/* --- PAGE HEADER (SSY THEME) --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-8 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 rounded-sm">
            <GraduationCap className="text-indigo-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
              Student Registry
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              SSY Academics • Comprehensive Intelligence Control
            </p>
          </div>
        </div>

        {/* QUICK STATS RIBBON */}
        <div className="flex items-center gap-2">
          <div className="px-6 py-2 bg-slate-50 border border-slate-100 rounded-sm flex flex-col items-center min-w-[120px]">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
              Total Students
            </span>
            <span className="text-xl font-black text-slate-900 leading-none mt-1">
              {students.length}
            </span>
          </div>
          <div className="px-6 py-2 bg-slate-900 rounded-sm flex flex-col items-center min-w-[120px]">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">
              Active Batches
            </span>
            <span className="text-xl font-black text-white leading-none mt-1">
              {batches.length}
            </span>
          </div>
        </div>
      </div>

      {/* --- SEARCH & ACTIONS BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-100 rounded-sm shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="FILTER BY NAME, EMAIL, OR ID..."
            className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[10px] font-black tracking-wider w-full focus:bg-white focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="w-full md:w-auto bg-slate-900 text-white px-8 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
        >
          <UserPlus size={16} className="text-indigo-400" /> Register Candidate
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* --- FORM PANEL --- */}
        {isFormOpen && (
          <div className="lg:col-span-4 animate-in slide-in-from-left duration-300">
            <div className="bg-white border-2 border-slate-900 p-0 rounded-sm sticky top-6 overflow-hidden">
              <div className="px-6 py-4 bg-slate-900 flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                  {editId ? (
                    <Edit3 size={14} className="text-indigo-400" />
                  ) : (
                    <Plus size={14} className="text-indigo-400" />
                  )}
                  {editId ? "Update Record" : "New Enrollment"}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    Full Legal Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-b-2 border-slate-100 p-2 text-sm font-bold outline-none focus:border-slate-900 bg-slate-50/50 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    Institutional Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border-b-2 border-slate-100 p-2 text-sm font-bold outline-none focus:border-slate-900 bg-slate-50/50 transition-all"
                  />
                </div>
                {!editId && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      Access Password
                    </label>
                    <input
                      required
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full border-b-2 border-slate-100 p-2 text-sm font-bold outline-none focus:border-slate-900 bg-slate-50/50 transition-all"
                    />
                  </div>
                )}
                <button className="w-full bg-slate-900 text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] mt-4 flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors shadow-xl">
                  {editId ? <Save size={16} /> : <CheckCircle size={16} />}
                  {editId ? "Commit Changes" : "Finalize Registration"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- DATA TABLE --- */}
        <div
          className={`${isFormOpen ? "lg:col-span-8" : "lg:col-span-12"} transition-all duration-500`}
        >
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-6 py-4 border-r border-slate-800">
                    Student Identity
                  </th>
                  <th className="px-6 py-4 border-r border-slate-800">
                    Batch Assignment
                  </th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-all group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 uppercase tracking-tight text-sm group-hover:text-indigo-600 transition-colors">
                          {student.name}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                            <Mail size={10} className="text-indigo-400" />{" "}
                            {student.email.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-300 font-mono italic">
                            #{student.id.toString().padStart(4, "0")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <select
                          className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter focus:border-slate-900 outline-none w-full max-w-[200px] transition-all"
                          onChange={(e) =>
                            setEnrollmentMap({
                              ...enrollmentMap,
                              [student.id]: e.target.value,
                            })
                          }
                        >
                          <option value="">-- SELECT BATCH --</option>
                          {batches.map((batch) => (
                            <option key={batch.id} value={batch.id}>
                              {batch.batchName.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleEnroll(student.id)}
                          className="bg-slate-100 text-slate-900 px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95 border border-slate-200"
                        >
                          Enroll
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEditRequest(student)}
                          title="Edit Record"
                          className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded-sm hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          title="Delete Record"
                          className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-sm hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStudents.length === 0 && (
              <div className="py-20 text-center bg-slate-50/50 border-t border-slate-100">
                <Shield size={40} className="mx-auto mb-4 text-slate-200" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                  No Matching Records Found
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER STATUS */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          Database Live & Synced
        </p>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            Current Session
          </span>
          <span className="text-xs font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-sm border border-indigo-100">
            2026_ADMN
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
