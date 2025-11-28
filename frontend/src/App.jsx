import { Routes, Route } from "react-router-dom";

/* COMPONENTS */
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

/* PAGES */
import EduForAllPage from "./pages/EduForAllPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeaturesPage from "./pages/FeaturesPage";
import BenefitsPage from "./pages/BenefitsPage";
import DashboardPage from "./pages/DashboardPage"; // Student
import FacultyDashboard from "./pages/FacultyDashboard";
// import AdminDashboard from "./pages/AdminDashboard"; // Optional (future)

export default function App() {
  return (
    <Routes>
      {/* ---------- PUBLIC + LAYOUT ---------- */}
      <Route element={<Layout />}>
        {/* Public pages */}
        <Route path="/" element={<EduForAllPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />

        {/* ---------- STUDENT PROTECTED ---------- */}
        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* ---------- FACULTY PROTECTED ---------- */}
        <Route element={<ProtectedRoute allowedRole="faculty" />}>
          <Route
            path="/faculty-dashboard"
            element={<FacultyDashboard />}
          />
        </Route>

        {/* ---------- ADMIN (OPTIONAL, READY) ---------- */}
        {/*
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
        </Route>
        */}
      </Route>
    </Routes>
  );
}
