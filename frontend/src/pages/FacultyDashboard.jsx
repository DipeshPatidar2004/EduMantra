const FacultyDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 px-8 py-14">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-14">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
          Faculty Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Manage classes, attendance, announcements, and student engagement
          from one unified workspace.
        </p>
      </div>

      {/* DASHBOARD GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          icon="📅"
          title="Class Schedule"
          desc="View today's lectures, labs, and academic calendar."
          color="from-sky-500 to-blue-600"
        />

        <Card
          icon="✅"
          title="Proxy-Free Attendance"
          desc="Mark attendance using QR / geo-verification."
          color="from-emerald-500 to-teal-600"
        />

        <Card
          icon="📢"
          title="Announcements"
          desc="Post announcements visible to students instantly."
          color="from-rose-500 to-pink-600"
        />

        <Card
          icon="📊"
          title="Student Performance"
          desc="Track attendance trends and engagement levels."
          color="from-indigo-500 to-purple-600"
        />

        <Card
          icon="💬"
          title="Discussions & Queries"
          desc="Answer student doubts and interact via forums."
          color="from-amber-500 to-orange-600"
        />

        <Card
          icon="📰"
          title="Campus Live Feed"
          desc="Post updates about classes, events, or activities."
          color="from-cyan-500 to-sky-600"
        />
      </div>
    </div>
  );
};

/* ---------- CARD COMPONENT ---------- */
const Card = ({ icon, title, desc, color }) => (
  <div className="group relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

    {/* ICON BADGE */}
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${color} mb-5 shadow-md`}
    >
      {icon}
    </div>

    <h2 className="text-xl font-semibold text-white mb-2">
      {title}
    </h2>

    <p className="text-slate-300 text-sm leading-relaxed">
      {desc}
    </p>

    {/* HOVER GLOW */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
      style={{
        boxShadow: "0 0 40px rgba(94,234,212,0.08)"
      }}
    />
  </div>
);

export default FacultyDashboard;
