import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // toggle state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("elder");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      
      // Save user data in context
      login({ ...res.data.user, token: res.data.token, role: res.data.role });

      // Redirect
      navigate(res.data.role === "elder" ? "/elder" : "/relative");
    } catch (err) {
      alert("❌ Invalid credentials");
      console.error(err);
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url =
        role === "elder"
          ? "http://localhost:5000/api/auth/register/elder"
          : "http://localhost:5000/api/auth/register/relative";

      const res = await axios.post(url, { name, email, phone, password });
      
      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      
      // Save user data in context
      login({ ...res.data.elder || res.data.relative, token: res.data.token, role });
      
      alert("✅ Registration successful! Redirecting to dashboard...");
      console.log(res.data);
      
      // Redirect to dashboard
      navigate(role === "elder" ? "/elder" : "/relative");
    } catch (err) {
      alert("❌ Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Show Name + Phone only in Register */}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border mb-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full p-2 border mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="elder">Elder</option>
          <option value="relative">Relative</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle Button */}
        <button
          type="button"
          className="w-full text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}
