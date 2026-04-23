import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { loginUser } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);
      
      // ✅ Save token
      const token = response?.data?.token;
      if (!token) throw new Error("Token not received from server");
      
      localStorage.setItem("token", token);

      // ✅ Get and Clean Role
      let role = response?.data?.role || response?.data?.user?.role || response?.data?.userRole;
      if (!role) throw new Error("User role not found");
      
      role = role.replace("ROLE_", "").toUpperCase();
      localStorage.setItem("role", role);

      // ✅ Decode JWT for user details
      const decoded = jwtDecode(token);
      localStorage.setItem("name", decoded.name || "User");
      localStorage.setItem("email", decoded.sub);

      // ✅ Notification
      toast.success(`Welcome back, ${decoded.name || 'Student'}!`, {
        style: {
          borderRadius: '0px',
          background: '#1c1d1f',
          color: '#fff',
        },
      });

      // ✅ Controlled Redirect
      setTimeout(() => {
        if (role === "STUDENT") {
          navigate("/student-dashboard");
        } else if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 p-6">
      <Toaster position="top-center" />
      
      <div className="max-w-[1000px] w-full bg-white shadow-udemy flex overflow-hidden border border-udemyBorder">
        
        {/* Left Side: Brand/Image */}
        <div className="hidden lg:flex w-1/2 bg-udemyDark p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              SSY <span className="text-udemyPurple">ACADEMICS</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Login to continue your learning journey and access your
              personalized dashboard.
            </p>
          </div>

          <div className="z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-udemyPurple"></div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                Trusted by 1000+ Students
              </p>
            </div>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-udemyPurple/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-udemyDark mb-2">
              Welcome Back
            </h1>
            <p className="text-udemyGray text-sm">
              Don't have an account?{" "}
              <Link
                to="/join"
                className="text-udemyPurple font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-udemyDark tracking-tight">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full border border-udemyDark p-3 pl-11 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-udemyDark tracking-tight">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-udemyDark p-3 pl-11 pr-11 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-udemyDark"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-udemyDark rounded-none accent-udemyPurple"
                />
                <span className="text-udemyGray">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-udemyPurple font-bold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-udemyDark text-white font-bold py-4 hover:bg-gray-800 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-gray-400"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Log In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <hr className="border-gray-200" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-400 uppercase font-bold tracking-widest">
              Or
            </span>
          </div>

          <p className="text-center text-[11px] text-gray-500 leading-relaxed">
            By logging in, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Use</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;