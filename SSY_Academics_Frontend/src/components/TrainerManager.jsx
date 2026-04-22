import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Users,
  UserPlus,
  Mail,
  Briefcase,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

const TrainerManager = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", expertise: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrainers = async () => {
    try {
      const res = await API.get("/trainers");
      setData(res.data);
    } catch (err) {
      toast.error("Security: Failed to fetch trainer roster");
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email)
      return toast.error("Required fields missing");

    setLoading(true);
    try {
      if (editId) {
        await API.put(`/trainers/${editId}`, form);
        toast.success("Trainer credentials updated");
      } else {
        await API.post("/trainers", form);
        toast.success("New instructor provisioned");
      }
      resetForm();
      fetchTrainers();
    } catch (err) {
      toast.error("Operation failed: Database rejected entry");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Purge trainer record? This action is logged.")) {
      try {
        await API.delete(`/trainers/${id}`);
        toast.success("Record purged successfully");
        fetchTrainers();
      } catch (err) {
        toast.error("Action denied: Trainer assigned to active batches");
      }
    }
  };

  const handleEdit = (trainer) => {
    setEditId(trainer.id);
    setForm({
      name: trainer.name,
      email: trainer.email,
      expertise: trainer.expertise,
    });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", expertise: "" });
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- PAGE HEADER --- */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="p-3 bg-slate-900 rounded-sm">
          <Users className="text-indigo-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tighter">
            Trainer Management
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            System Faculty & Academic Staff
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- PROVISIONING FORM (3 Cols) --- */}
        <div className="lg:col-span-4">
          <div
            className={`bg-white border p-6 sticky top-24 transition-all duration-300 ${editId ? "border-indigo-500 ring-4 ring-indigo-500/5" : "border-slate-200 shadow-sm"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {editId ? "Modify Credentials" : "Provision Instructor"}
              </h3>
              {editId && (
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500">
                  Full Name
                </label>
                <div className="relative">
                  <Users
                    className="absolute left-3 top-3 text-slate-300"
                    size={16}
                  />
                  <input
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 pl-10 text-sm outline-none focus:bg-white focus:border-slate-900 transition-all"
                    placeholder="Instructor Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500">
                  Professional Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-slate-300"
                    size={16}
                  />
                  <input
                    type="email"
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 pl-10 text-sm outline-none focus:bg-white focus:border-slate-900 transition-all"
                    placeholder="name@ssyacademics.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500">
                  expertise
                </label>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-3 text-slate-300"
                    size={16}
                  />
                  <input
                    className="w-full border border-slate-200 bg-slate-50 p-2.5 pl-10 text-sm outline-none focus:bg-white focus:border-slate-900 transition-all"
                    placeholder="e.g. Java Full Stack"
                    value={form.expertise}
                    onChange={(e) =>
                      setForm({ ...form, expertise: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                  ${editId ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-900 text-white hover:bg-slate-800"}`}
              >
                {editId ? <CheckCircle2 size={16} /> : <UserPlus size={16} />}
                {loading
                  ? "Processing..."
                  : editId
                    ? "Confirm Update"
                    : "Add to Faculty"}
              </button>
            </form>
          </div>
        </div>

        {/* --- ROSTER TABLE (8 Cols) --- */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Trainer Details
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Expertise
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((t) => (
                  <tr
                    key={t.id}
                    className={`group hover:bg-slate-50/50 transition-colors ${editId === t.id ? "bg-indigo-50/30" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">
                          {t.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {t.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-tighter">
                        {t.expertise || "General Faculty"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(t)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded border border-transparent hover:border-slate-200 shadow-sm transition-all"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded border border-transparent hover:border-slate-200 shadow-sm transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-12 text-center text-slate-400 text-xs italic"
                    >
                      No instructors currently provisioned in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerManager;
