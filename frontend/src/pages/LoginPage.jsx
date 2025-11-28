import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType: role }), // backend format
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE =>", data);

      if (!data.success) {
        throw new Error(data.error || "Login failed");
      }

      // Save session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", data.user.userType);
      localStorage.setItem("userId", data.user._id);

      // Redirect by role
      if (data.user.userType === "student") navigate("/dashboard");
      else if (data.user.userType === "faculty") navigate("/faculty-dashboard");
      else navigate("/admin-dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Campus Connect Login
        </h1>
        <p className="text-center text-slate-400 mb-7">
          Login using registered credentials
        </p>

        {error && (
          <p className="mb-3 text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 text-white border border-white/10 focus:border-teal-400"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 text-white border border-white/10 focus:border-teal-400"
        />

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 text-white border border-white/10 focus:border-teal-400"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>

        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-6 text-slate-400">
          <button onClick={() => navigate("/register")} className="text-teal-300 hover:underline">
            Create Account
          </button>
        </div>

        <div className="text-center mt-3">
          <button onClick={() => navigate("/")} className="text-gray-300 hover:text-teal-400 transition">
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
