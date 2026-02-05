import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicPage from "@/pages/PublicPage";
import PublicLayout from "@/components/layout/PublicLayout";

import AdminLogin from "@/pages/admin/AdminLogin";
import ProtectedRoute from "./components/middleware/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import Skills from "./pages/admin/Skills";
import Projects from "./pages/admin/Projects";
import Experiences from "./pages/admin/Experiences";
import Profile from "./pages/admin/Profile";

export default function App() {
  return (
   
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicPage />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
 
  );
}
