import { FC, useState } from "react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: "🏫",
    title: "For Rural Students",
    desc: "Education without internet barriers.",
    details:
      "EduMantra enables rural learners to download full chapters, videos, and quizzes for offline access. Progress automatically syncs to the cloud when the device reconnects.",
  },
  {
    icon: "🏙️",
    title: "For Urban Students",
    desc: "Premium tools at affordable pricing.",
    details:
      "Students in cities gain access to AI tutors, real-time collaboration rooms, practice sets, performance analytics, and competitive gamified learning.",
  },
  {
    icon: "👨‍🏫",
    title: "For Educators",
    desc: "Powerful teaching & tracking dashboard.",
    details:
      "Teachers receive automated progress reports, weak-topic detection, recommended assignments, student performance heatmaps, and parent communication tools.",
  },
  {
    icon: "🏛️",
    title: "For Institutions",
    desc: "Scalable digital learning infrastructure.",
    details:
      "Schools and colleges can integrate EduMantra with their systems, assign materials, track attendance, and monitor performance at an institution-wide level.",
  },
];

const BenefitsPage: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-slate-50 mb-6">
        Benefits for Everyone
      </h1>
      <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
        Explore how EduMantra empowers students, teachers, and institutions.
      </p>

      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className="bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg cursor-pointer hover:bg-white/20 transition-all"
          >
            <div className="text-5xl mb-4 text-teal-300">{b.icon}</div>
            <h2 className="text-xl font-semibold text-slate-50 mb-2">
              {b.title}
            </h2>
            <p className="text-slate-300">{b.desc}</p>

            {/* Expanded content */}
            {openIndex === i && (
              <div className="mt-4 p-4 bg-slate-800/50 border border-white/10 rounded-lg transition-all">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {b.details}
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

export default BenefitsPage;
