import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Check,
} from "lucide-react";
import { registerUser } from "../services/auth";

const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      await registerUser(formData);
      // Registration successful, redirect to login
      navigate("/login", {
        state: { message: "Account created successfully! Please log in." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Try a different email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-[1000px] w-full bg-white shadow-udemy flex overflow-hidden border border-udemyBorder">
        {/* Left Side: Branding & Perks */}
        <div className="hidden lg:flex w-1/2 bg-udemyDark p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">
              SSY <span className="text-udemyPurple">ACADEMICS</span>
            </h2>
            <h3 className="text-xl font-semibold mb-8">
              Start your professional transformation today.
            </h3>

            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <div className="bg-ssySuccess rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 text-sm">
                  Access to 50+ Industry-Grade Projects
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-ssySuccess rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 text-sm">
                  Priority Placement Support
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-ssySuccess rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 text-sm">
                  Expert Mentorship from Siddhant Yadav
                </span>
              </li>
            </ul>
          </div>

          <div className="z-10 mt-auto">
            <p className="text-xs text-gray-500 uppercase tracking-widest border-t border-gray-700 pt-6">
              Level up your skill set
            </p>
          </div>

          {/* Decorative Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-udemyPurple/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-udemyDark mb-2">
              Create Your Account
            </h1>
            <p className="text-udemyGray text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-udemyPurple font-bold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-udemyDark">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-udemyDark p-3 pl-11 text-sm focus:outline-none focus:ring-1 focus:ring-udemyPurple transition-all"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
                  placeholder="At least 8 characters"
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

            <div className="py-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 border-udemyDark rounded-none checked:bg-udemyDark"
                />
                <span className="text-[12px] text-udemyGray leading-tight">
                  I want to receive occasional emails with course
                  recommendations and career tips.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-udemyDark text-white font-bold py-4 hover:bg-gray-800 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-gray-400"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Register <UserPlus className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-gray-500 leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="underline font-medium cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="underline font-medium cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
