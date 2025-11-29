// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      console.log("LOGIN RESPONSE =>", res.status, data);

      if (res.status === 403) {
        setError(data.error || "Please verify your email before logging in.");
        return;
      }

      if (!res.ok || !data.success) {
        setError(data.error || "Login failed");
        return;
      }

      const role = data.user.userType;

      // auth state save karo
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("userName", data.user.name || "");

      // navbar ko update batane ke liye custom event
      window.dispatchEvent(new Event("auth-changed"));

      // role ke hisab se redirect
      if (role === "student") navigate("/dashboard");
      else if (role === "faculty") navigate("/faculty-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR =>", err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Campus Connect Login
        </h1>

        <p className="text-center text-slate-400 mb-6">
          Login using verified account
        </p>

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="University Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-6 text-slate-400">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-teal-300 hover:underline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}