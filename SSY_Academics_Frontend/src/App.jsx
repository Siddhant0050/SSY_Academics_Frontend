import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Placements from "./pages/Placements";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Join from "./pages/Join";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./pages/ProtectedRoute";

// 🔥 Layout Wrapper (to control Navbar/Footer)
const Layout = ({ children }) => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/student-dashboard" ||
    location.pathname === "/admin-dashboard";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />

          {/* 🔒 Student Dashboard */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute roleRequired="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🔒 Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roleRequired="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
