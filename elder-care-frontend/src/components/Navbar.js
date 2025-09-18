import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-extrabold  text-lg tracking-tight">ElderCare</h1>
        <div className="flex items-center gap-2">
        {user ? (
          <>
            {/* Elder Links */}
            {user.role === "elder" && (
              <NavLink to="/elder" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>Dashboard</NavLink>
            )}

            {/* Relative Links */}
            {user.role === "relative" && (
              <>
                <NavLink to="/relative" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>Dashboard</NavLink>
                <NavLink to="/alerts" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>Alerts</NavLink>
                <NavLink to="/history" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>History</NavLink>
                <NavLink to="/health" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>Health</NavLink>
                <NavLink to="/medication" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>Medication</NavLink>
                <NavLink to="/geofence" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>GeoFence</NavLink>

              </>
            )}
            {/* Admin Links */}
            {user.role === "admin" && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? "font-semibold underline" : "opacity-90 hover:opacity-100"}>Admin</NavLink>
            )}

            {/* Logout Button */}
            <button onClick={logout} className="ml-2 px-3 py-1.5 rounded-2xl bg-white/20 text-white shadow-sm hover:bg-white/30">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="px-3 py-1.5 rounded-2xl bg-white/20 text-white shadow-sm hover:bg-white/30">
            Login
          </NavLink>
        )}
        </div>
      </div>
    </nav>
  );
}
