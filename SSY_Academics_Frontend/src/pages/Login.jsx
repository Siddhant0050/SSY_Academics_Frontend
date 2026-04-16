import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { loginUser } from "../services/auth"; // Adjust path based on your folder structure
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ CORRECT PLACE FOR API + ROLE LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);

      console.log("Login Response:", response.data);

      // ✅ Save token
      const token = response?.data?.token;
      localStorage.setItem("token", token);

      // ✅ Get role safely
      let role =
        response?.data?.role ||
        response?.data?.user?.role ||
        response?.data?.userRole;

      if (!role) throw new Error("Role not found");

      // ✅ Remove ROLE_ prefix
      role = role.replace("ROLE_", "");

      localStorage.setItem("role", role);

      const decoded = jwtDecode(response.data.token);

      localStorage.setItem("name", decoded.name);
      localStorage.setItem("email", decoded.sub);

      // ✅ Redirect
      if (role === "STUDENT") {
        navigate("/student-dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-[1000px] w-full bg-white shadow-udemy flex overflow-hidden border border-udemyBorder">
        {/* Left Side: Brand/Image (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 bg-udemyDark p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              SSY <span className="text-udemyPurple">ACADEMICS</span>
            </h2>
            <p className="text-gray-400 text-lg">
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
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-udemyDark">
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
              <label className="text-xs font-bold uppercase text-udemyDark">
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
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-udemyDark rounded-none"
                />
                <span className="text-udemyGray">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                size="sm"
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
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-400 uppercase font-bold">
              Or
            </span>
          </div>

          <p className="text-center text-[12px] text-gray-500">
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
