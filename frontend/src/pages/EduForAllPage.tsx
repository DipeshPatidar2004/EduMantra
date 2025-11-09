import { useEffect, useMemo, useState, FC } from "react";
import { useNavigate } from "react-router-dom";

type Stat = { label: string; value: string };
type Feature = { icon: string; title: string; desc: string };
type Benefit = { icon: string; title: string; desc: string };

// ---------------------- CARDS ----------------------
const StatCard: FC<{ s: Stat }> = ({ s }) => (
  <div
    className="bg-white/10 border border-white/20 rounded-xl p-6 text-center backdrop-blur-sm transition-transform duration-300 shadow-lg"
    style={{ perspective: "600px", transformStyle: "preserve-3d" }}
    onMouseMove={(e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `perspective(600px)
        rotateX(${(-y / rect.height) * 15}deg)
        rotateY(${(x / rect.width) * 15}deg)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }}
  >
    <div className="text-4xl font-bold text-teal-300 mb-2">{s.value}</div>
    <div className="text-slate-300">{s.label}</div>
  </div>
);

const FeatureCard: FC<{ f: Feature }> = ({ f }) => {
  const [iconClicked, setIconClicked] = useState(false);

  return (
    <div
      className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-sm transition-transform duration-300 shadow-lg cursor-pointer"
      style={{ perspective: "600px", transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `perspective(600px)
          rotateX(${(-y / rect.height) * 15}deg)
          rotateY(${(x / rect.width) * 15}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "perspective(600px) rotateX(0deg) rotateY(0deg)";
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`text-6xl mb-4 text-teal-300 transition-all duration-300 ${
            iconClicked ? "scale-95" : "hover:scale-110 hover:rotate-6"
          }`}
          style={{
            textShadow: "0 0 15px rgba(94, 234, 212, 0.5)",
            filter: "drop-shadow(0 0 5px rgba(94, 234, 212, 0.3))",
            transform: iconClicked ? "scale(0.95) rotateY(180deg)" : undefined,
          }}
          onClick={() => {
            setIconClicked(true);
            setTimeout(() => setIconClicked(false), 300);
          }}
        >
          {f.icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-50 mb-2">{f.title}</h3>
        <p className="text-slate-300 text-sm">{f.desc}</p>
      </div>
    </div>
  );
};

const BenefitCard: FC<{ b: Benefit }> = ({ b }) => (
  <div
    className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-sm transition-transform duration-300 shadow-lg"
    style={{ perspective: "600px", transformStyle: "preserve-3d" }}
    onMouseMove={(e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `perspective(600px)
        rotateX(${(-y / rect.height) * 15}deg)
        rotateY(${(x / rect.width) * 15}deg)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg)";
    }}
  >
    <div className="text-4xl mb-4 text-teal-300">{b.icon}</div>
    <h3 className="text-xl font-semibold text-slate-50 mb-2">{b.title}</h3>
    <p className="text-slate-300">{b.desc}</p>
  </div>
);

const NavLink: FC<{ label: string; onClick?: () => void }> = ({
  label,
  onClick,
}) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
    }}
    className="text-slate-50 hover:text-teal-300 transition-colors duration-200"
  >
    {label}
  </a>
);

const InteractiveLogo: FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className="relative inline-block cursor-pointer select-none transition-transform duration-200 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      style={{
        transform: isClicked
          ? "scale(0.95)"
          : isHovered
          ? "scale(1.05)"
          : "scale(1)",
        filter: isHovered
          ? "drop-shadow(0 0 10px rgba(94, 234, 212, 0.5))"
          : "none",
      }}
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-sky-400 bg-clip-text text-transparent">
        EduMantra
      </span>
    </div>
  );
};

// ---------------------- MAIN PAGE ----------------------
export default function EduForAllPage() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [now, setNow] = useState(new Date());

  // ✅ POPUP STATE
  const [showDemoPopup, setShowDemoPopup] = useState(false);

  const stats: Stat[] = [
    { label: "Active Students", value: "500K+" },
    { label: "Learning Resources", value: "50K+" },
    { label: "Success Rate", value: "95%" },
    { label: "Languages Supported", value: "25+" },
  ];

  const features: Feature[] = [
    { icon: "🤖", title: "AI Personalization", desc: "Adaptive learning paths." },
    { icon: "📱", title: "Offline-First", desc: "Learn without internet." },
    { icon: "🌐", title: "Multilingual", desc: "Supports 25+ languages." },
    { icon: "👥", title: "Community Learning", desc: "Learn with peers." },
    { icon: "📊", title: "Smart Analytics", desc: "Track progress smartly." },
    { icon: "🎮", title: "Gamified Learning", desc: "Earn badges & prizes." },
  ];

  const benefits: Benefit[] = [
    { icon: "🏫", title: "Rural Students", desc: "Quality offline-first learning." },
    { icon: "🏙️", title: "Urban Students", desc: "Advanced premium tools." },
    { icon: "👨‍🏫", title: "Educators", desc: "Analytics dashboard." },
    { icon: "🏛️", title: "Institutions", desc: "Scalable for all sizes." },
  ];

  // ✅ Clock + Online detection
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const simulateProgress = () => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 10;
        if (next >= 100) {
          clearInterval(id);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">

      {/* ---------------- NAVBAR ---------------- */}
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <InteractiveLogo />

          <ul className="hidden md:flex items-center gap-8">
            <li><NavLink label="Home" onClick={() => navigate("/")} /></li>
            <li><NavLink label="Features" onClick={() => navigate("/features")} /></li>
            <li><NavLink label="Benefits" onClick={() => navigate("/benefits")} /></li>
            <li><NavLink label="Dashboard" onClick={() => navigate("/dashboard")} /></li>
          </ul>

          <button
            className="md:hidden text-slate-50 text-2xl z-10"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      <main className="pt-20">

        {/* ---------------- HERO ---------------- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-500/20 to-teal-600/20">
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-50 drop-shadow-lg">
              Education for All, Everywhere
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mt-4 mb-8">
              AI-powered personalized learning that works offline & online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              {/* ✅ Start Learning → Chatbot */}
              <button
                onClick={() => navigate("/chat")}
                className="px-8 py-3 rounded-full bg-teal-400 text-slate-900 font-semibold shadow-lg hover:bg-teal-300 hover:-translate-y-1 hover:scale-105 transition"
              >
                Start Learning Free
              </button>

              {/* ✅ Popup button */}
              <button
                onClick={() => setShowDemoPopup(true)}
                className="px-8 py-3 rounded-full border-2 border-teal-400 text-teal-300 font-semibold hover:bg-teal-400/20 transition hover:scale-105"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* ---------------- STATS ---------------- */}
        <section className="py-16 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => <StatCard key={i} s={s} />)}
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-50 mb-12">
              Revolutionary Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => <FeatureCard key={i} f={f} />)}
            </div>
          </div>
        </section>

        {/* ---------------- BENEFITS ---------------- */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-50 mb-12">
              Bridging the Education Gap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => <BenefitCard key={i} b={b} />)}
            </div>
          </div>
        </section>

        {/* ---------------- DASHBOARD DEMO ---------------- */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-50 mb-12">
              Experience the Platform
            </h2>

            <div className="bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-sm shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-50 mb-4">
                AI Dashboard Demo
              </h3>

              <div className="bg-slate-900/70 border border-white/10 rounded-lg p-6">

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-slate-50">Your Progress</span>
                  <span className="text-sm text-slate-400 font-mono">{now.toLocaleTimeString()}</span>
                </div>

                <div className="w-full h-4 bg-slate-700/70 rounded-full overflow-hidden shadow-inner mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-slate-300 text-sm text-right">
                  {progress < 100 ? `Syncing progress... ${progress}%` : "✅ Synced!"}
                </p>
              </div>

              <button
                onClick={simulateProgress}
                className="mt-4 px-6 py-2 rounded-full bg-gradient-to-br from-sky-500 to-teal-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Simulate Sync
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-slate-900/90 text-slate-400 text-center py-8 border-t border-white/10 backdrop-blur-lg mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2024 EduMantra. Empowering education for everyone, everywhere.</p>
        </div>
      </footer>

      {/* ✅ ---------------- POPUP MODAL ---------------- */}
      {showDemoPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 p-8 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold text-teal-300 mb-3">Demo Uploading 🚀</h2>
            <p className="text-slate-300 mb-6">Our demo video will be uploaded soon. Stay tuned!</p>

            <button
              onClick={() => setShowDemoPopup(false)}
              className="px-6 py-2 bg-teal-400 text-slate-900 rounded-full font-semibold hover:bg-teal-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
