import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* ✅ NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2
            className="text-2xl font-bold text-teal-300 cursor-pointer"
            onClick={() => navigate("/")}
          >
            EduMantra
          </h2>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/features")}>Features</button>
            <button onClick={() => navigate("/benefits")}>Benefits</button>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/chat")}>Chat</button>

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 border border-teal-400 text-teal-300 rounded-full"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-1.5 bg-teal-400 text-slate-900 rounded-full font-semibold"
            >
              Register
            </button>
          </div>
        </nav>
      </header>

      {/* ✅ PAGE CONTENT GOES HERE */}
      <main className="pt-24">
        <Outlet />
      </main>
    </div>
  );
}
