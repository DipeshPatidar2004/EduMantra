import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";


// pages
import EduForAllPage from "./pages/EduForAllPage";
import FeaturesPage from "./pages/FeaturesPage";
import BenefitsPage from "./pages/BenefitsPage";
import DashboardPage from "./pages/DashboardPage";
import ChatBotPage from "./pages/ChatBotPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EduForAllPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatBotPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
