import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import Particles from "./components/Particles";

// Pages
import Workspace from "./pages/Workspace";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoggedOut from "./pages/LoggedOut";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Particles />

      <div className="relative z-10">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logged-out" element={<LoggedOut />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workspace" element={<Workspace />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription-success" element={<SubscriptionSuccess />} />
            <Route
              path="admin"
              element={
                user?.role === "admin"
                  ? <AdminPanel />
                  : <Navigate to="/dashboard" replace />
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}