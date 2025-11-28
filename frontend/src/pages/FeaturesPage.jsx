import { useState } from "react";
import { Link } from "react-router-dom";

/* ---------------- FEATURES DATA ---------------- */
const features = [
  {
    icon: "👤",
    title: "Role-Based Profiles",
    desc: "Different access for students, faculty, and administrators.",
    details:
      "Each user gets a personalized dashboard based on their role. Students see schedules and attendance, faculty manage classes and attendance, and admins control announcements and resources.",
  },
  {
    icon: "✅",
    title: "Proxy-Free Attendance",
    desc: "Secure and fraud-proof attendance system.",
    details:
      "Attendance is marked using QR codes, geo-fencing, or device verification to eliminate proxy attendance and ensure authenticity.",
  },
  {
    icon: "🔔",
    title: "Real-Time Notifications",
    desc: "Instant alerts for important campus updates.",
    details:
      "Students and faculty receive real-time notifications for events, exam schedules, deadlines, announcements, and emergency alerts.",
  },
  {
    icon: "📅",
    title: "Integrated Campus Calendar",
    desc: "All schedules in one smart calendar.",
    details:
      "A centralized calendar for classes, exams, assignments, and extracurricular activities with reminder alerts and syncing support.",
  },
  {
    icon: "🚌",
    title: "Smart Bus Route Tracking",
    desc: "Know your campus bus routes and timings.",
    details:
      "Students can view bus routes, pickup points, schedules, and simulated live tracking for smooth and stress-free commuting.",
  },
  {
    icon: "📚",
    title: "Resource Booking System",
    desc: "Reserve campus resources easily.",
    details:
      "Book library books, laboratories, seminar halls, or study rooms based on real-time availability to optimize campus resources.",
  },
  {
    icon: "💬",
    title: "Campus Collaboration",
    desc: "Connect beyond classrooms.",
    details:
      "Students and faculty can engage through discussion forums, group chats, project groups, and hackathon team formation.",
  },
  {
    icon: "📰",
    title: "Campus Live Feed",
    desc: "Stay updated with campus life.",
    details:
      "A social-style live feed where student clubs, departments, and individuals post announcements, achievements, and event highlights.",
  },
  {
    icon: "🏆",
    title: "Gamified Engagement",
    desc: "Motivation through rewards.",
    details:
      "Earn badges and points for attendance, participation, collaboration, and event involvement to encourage engagement.",
  },
];

/* ---------------- COMPONENT ---------------- */
const FeaturesPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-slate-50 mb-6">
        Campus Connect – Features
      </h1>

      <p className="text-center text-slate-400 max-w-3xl mx-auto mb-12">
        Campus Connect brings students, faculty, and administrators together on
        one platform by breaking information silos and improving communication,
        accessibility, and productivity.
      </p>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className="bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg cursor-pointer hover:bg-white/20 transition-all"
          >
            <div className="text-6xl mb-4">{f.icon}</div>
            <h2 className="text-xl font-semibold text-slate-50 mb-2">
              {f.title}
            </h2>
            <p className="text-slate-300">{f.desc}</p>

            {/* Expandable Section */}
            {openIndex === i && (
              <div className="mt-4 p-4 bg-slate-800/60 border border-white/10 rounded-lg">
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
          className="px-6 py-2 bg-teal-400 text-slate-900 rounded-full font-semibold hover:bg-teal-300 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FeaturesPage;
