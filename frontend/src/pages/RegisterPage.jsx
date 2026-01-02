<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000/api"; // backend base URL
=======
// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84

export default function RegisterPage() {
  const navigate = useNavigate();

<<<<<<< HEAD
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
=======
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
<<<<<<< HEAD
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        userType: role,
      };

      // Optional: future ke liye structure ready
      if (role === "student") payload.student = {};
      else if (role === "faculty") payload.faculty = {};
      else payload.admin = {};

      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE ==>", res.status, data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Registration failed");
      }

      setMessage("Registered successfully! Please login to continue.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
=======
    setLoading(true);

    try {
      // 1️⃣ Create Firebase user
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // 2️⃣ Set display name
      await updateProfile(cred.user, {
        displayName: name,
      });

      // 3️⃣ Store role in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      // 4️⃣ Redirect
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="max-w-md w-full bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create an Account
        </h1>
        <p className="text-center text-slate-400 mb-6">Join Campus Connect</p>

        {error && (
          <p className="mb-3 text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-3 text-sm text-teal-300 bg-teal-950/40 px-3 py-2 rounded-lg">
            {message}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
=======
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl text-white font-bold mb-4">
          Create an Account
        </h1>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
        />

        <input
          type="email"
<<<<<<< HEAD
          placeholder="University Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
=======
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
        />

        <input
          type="password"
          placeholder="Password"
<<<<<<< HEAD
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
        />

        <label className="block text-slate-300 mb-2">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 text-white border border-white/10 outline-none focus:border-teal-400"
=======
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <button
<<<<<<< HEAD
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-6 text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-teal-300 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
=======
          disabled={loading}
          className="w-full bg-teal-400 text-black py-3 rounded font-semibold"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
