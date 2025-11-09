import { Routes, Route } from "react-router-dom";
import EduForAllPage from "./pages/EduForAllPage";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import BenefitsPage from "./pages/BenefitsPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EduForAllPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/benefits" element={<BenefitsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}
