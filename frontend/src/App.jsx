import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import EduForAllPage from "./pages/EduForAllPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeaturesPage from "./pages/FeaturesPage";
import BenefitsPage from "./pages/BenefitsPage";
import DashboardPage from "./pages/DashboardPage";
import FacultyDashboard from "./pages/FacultyDashboard";
import LiveFeedPage from "./pages/LiveFeedPage";
import ResourceBookingPage from "./pages/ResourceBookingPage";
import CampusCollaborationPage from "./pages/CampusCollaborationPage";
import CampusCalendarPage from "./pages/CampusCalendarPage";
import GamificationPage from "./pages/GamificationPage";
import BusRoutesPage from "./pages/BusRoutesPage";
import VerifyEmail from "./pages/VerifyEmail";




export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<EduForAllPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />

        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="faculty" />}>
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/live-feed" element={<LiveFeedPage />} />
          <Route path="/resource-booking" element={<ResourceBookingPage />} />
          <Route path="/collaboration" element={<CampusCollaborationPage />} />
          <Route path="/calendar" element={<CampusCalendarPage />} />
          <Route path="/gamification" element={<GamificationPage />} />
          <Route path="/bus-routes" element={<BusRoutesPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />


        </Route>
      </Route>
    </Routes>
  );
}