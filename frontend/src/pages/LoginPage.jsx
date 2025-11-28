import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  /* ---------- LOGIN HANDLERS ---------- */
  const loginAsStudent = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "student");
    navigate("/dashboard");
  };

  const loginAsFaculty = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "faculty");
    navigate("/faculty-dashboard");
  };

  const loginAsAdmin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "admin");
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl backdrop-blur-lg">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Campus Connect Login
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Select your role to continue
        </p>

        {/* LOGIN BUTTONS */}
        <div className="flex flex-col gap-4">

          {/* STUDENT */}
          <button
            onClick={loginAsStudent}
            className="w-full py-3 rounded-xl bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition"
          >
            🎓 Login as Student
          </button>

          {/* FACULTY */}
          <button
            onClick={loginAsFaculty}
            className="w-full py-3 rounded-xl bg-indigo-400 text-slate-900 font-semibold hover:bg-indigo-300 transition"
          >
            👨‍🏫 Login as Faculty
          </button>

          {/* ADMIN */}
          <button
            onClick={loginAsAdmin}
            className="w-full py-3 rounded-xl bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition"
          >
            🏛 Login as Admin
          </button>
        </div>

        {/* BACK */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-teal-300 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
