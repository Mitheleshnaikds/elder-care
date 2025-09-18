import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SOSProvider } from "./context/SOSContext";
import { RemindersProvider } from "./context/RemindersContext";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import EmergencyHistory from "./pages/EmergencyHistory";
import Health from "./pages/Health";
import Login from "./pages/Login";
import ElderDashboard from "./pages/ElderDashboard";
import RelativeDashboard from "./pages/RelativeDashboard";
import Alerts from "./pages/Alerts";
import Medication from "./pages/Medication";
import GeoFence from "./pages/GeoFence";
import Home from "./pages/Home";

// A wrapper for protecting routes (only logged-in users can access)
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Login />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Login />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <SOSProvider>
        <RemindersProvider>
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/geofence" element={<GeoFence />} />

          {/* Elder Dashboard */}
          <Route
            path="/elder"
            element={
              <ProtectedRoute allowedRoles={["elder"]}>
                <ElderDashboard />
              </ProtectedRoute>
            }
          />

          {/* Relative Dashboard */}
          <Route
            path="/relative"
            element={
              <ProtectedRoute allowedRoles={["relative"]}>
                <RelativeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Alerts Page */}
          <Route
            path="/alerts"
            element={
              <ProtectedRoute allowedRoles={["relative"]}>
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute allowedRoles={["relative","admin"]}>
                <EmergencyHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/health"
            element={
              <ProtectedRoute allowedRoles={["elder","relative"]}>
                <Health />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* Medication Page */}
          <Route
            path="/medication"
            element={
              <ProtectedRoute allowedRoles={["relative","elder"]}>
                <Medication />
              </ProtectedRoute>
            }
          />
        </Routes>
        </Router>
        </RemindersProvider>
      </SOSProvider>
    </AuthProvider>
  );
}
