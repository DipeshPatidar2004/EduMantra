import { FC, useState } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🤖",
    title: "AI Personalization",
    desc: "Smart adaptation to each student's learning style.",
    details:
      "EduMantra’s AI evaluates student performance, behavior, pace, and difficulty levels to personalize learning recommendations in real time.",
  },
  {
    icon: "📱",
    title: "Offline First",
    desc: "Download lessons and continue learning offline.",
    details:
      "Students can download modules, quizzes, and videos offline. Once the device reconnects, all progress syncs automatically.",
  },
  {
    icon: "🌐",
    title: "Multilingual Support",
    desc: "Supports 25+ languages worldwide.",
    details:
      "EduMantra offers full multilingual learning experiences including narration, text translation, and localized content.",
  },
  {
    icon: "🎮",
    title: "Gamified Learning",
    desc: "Earn badges, complete challenges & stay engaged.",
    details:
      "Students gain badges, XP points, streaks, and achievement trophies to boost learning motivation.",
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "AI-powered dashboards for progress tracking.",
    details:
      "Track accuracy, speed, topic mastery, improvement rate, and receive AI-generated recommendations.",
  },
  {
    icon: "👥",
    title: "Community Learning",
    desc: "Collaborate with peers and mentors.",
    details:
      "Join group discussions, participate in challenges, and connect with mentors for better learning support.",
  },
];

const FeaturesPage: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-slate-50 mb-6">
        Platform Features
      </h1>
      <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
        Click on any feature to view its full details.
      </p>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className="bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg cursor-pointer hover:bg-white/20 transition-all"
          >
            <div className="text-6xl mb-4 text-teal-300">{f.icon}</div>
            <h2 className="text-xl font-semibold text-slate-50 mb-2">
              {f.title}
            </h2>
            <p className="text-slate-300">{f.desc}</p>

            {/* Expandable Section */}
            {openIndex === i && (
              <div className="mt-4 p-4 bg-slate-800/50 border border-white/10 rounded-lg transition-all">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {f.details}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Back Button */}
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

export default FeaturesPage;
