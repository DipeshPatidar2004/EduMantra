import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardPage: FC = () => {
  const [progress, setProgress] = useState(42);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6">
      {/* Title */}
      <h1 className="text-center text-4xl font-bold text-slate-50 mb-6">
        Student Dashboard
      </h1>
      <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
        Track your learning journey and progress insights.
      </p>

      {/* Dashboard Box */}
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between">
          <span className="text-slate-50 font-semibold">Progress Summary</span>
          <span className="text-slate-400 text-sm">{now.toLocaleTimeString()}</span>
        </div>

        <div className="mt-4 h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-teal-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-right text-slate-300 text-sm mt-2">
          {progress}% Completed
        </p>

        <button
          className="mt-6 px-6 py-2 rounded-full bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300"
          onClick={() => setProgress((p) => (p < 100 ? p + 10 : 100))}
        >
          Increase Progress
        </button>
      </div>

      {/* Back */}
      <div className="text-center mt-16">
        <Link
          to="/"
          className="px-6 py-2 bg-teal-400 text-slate-900 rounded-full font-semibold hover:bg-teal-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
