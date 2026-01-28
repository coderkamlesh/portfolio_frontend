import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicPage from "@/pages/PublicPage";
import AdminLogin from "@/pages/admin/AdminLogin";
import ProtectedRoute from "./components/middleware/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import MainLayout from "./components/layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more nested routes here later */}
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* <Route path="projects" element={<Projects />} /> */}
          {/* <Route path="skills" element={<Skills />} /> */}
          {/* <Route path="messages" element={<Messages />} /> */}
          {/* <Route path="blog" element={<Blog />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}