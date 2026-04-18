//src/pages/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CampusGallery from "../components/CampusGallery";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        {/* Hero */}
        <section className="py-10 md:py-14 relative overflow-hidden">
          {/* Bubble background */}
          <div className="hero-bubbles pointer-events-none absolute inset-0 -z-10" />

          <div className="max-w-5xl mx-auto text-center space-y-6 px-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/30">
              <span className="mr-2">✨</span> Your Campus, Connected
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 space-y-1">
              <span className="block">Welcome to</span>
              <span className="block bg-gradient-to-r from-sky-400 via-indigo-500 to-orange-400 bg-clip-text text-transparent">
                Campverse
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-300 text-sm md:text-base">
              All‑in‑one campus platform for lost items, notices, marketplace,
              feedback and complaint management. Connect, share and thrive
              together.
            </p>

            <div className="flex items-center justify-center gap-3 mt-2">
              <button
                onClick={() => navigate("/lost-found")}
                className="
                  px-6 py-3 rounded-full 
                  bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 
                  text-white text-sm font-semibold 
                  shadow-lg shadow-blue-400/40 
                  transition-all duration-300 ease-out 
                  hover:shadow-xl hover:shadow-blue-500/60 
                  hover:translate-y-0.5 hover:scale-[1.02]
                "
              >
                Get Started
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="
                  px-6 py-3 rounded-full 
                  border border-slate-200/70 
                  bg-white/70 backdrop-blur-xl 
                  text-sm font-semibold text-slate-700 
                  shadow-sm 
                  transition-all duration-300 ease-out 
                  hover:bg-white hover:border-slate-300 
                  hover:-translate-y-0.5 hover:shadow-md
                  dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-600
                  dark:hover:bg-slate-900 dark:hover:border-slate-500
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-10 px-4">
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            {[
              { icon: "👥", value: "5,000+", label: "Active Students" },
              { icon: "✅", value: "99.9%", label: "Uptime" },
              { icon: "⚡", value: "24/7", label: "Support" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="
                  rounded-2xl bg-white/90 dark:bg-slate-900/80 
                  shadow-sm border border-slate-100 dark:border-slate-700 
                  p-5 text-center
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg 
                  hover:border-indigo-100 dark:hover:border-indigo-500/60
                "
              >
                <div className="h-10 w-10 mx-auto rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-lg">
                  {stat.icon}
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="pb-14 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-indigo-50 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
                What We Offer
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                Core Modules
              </h2>
              <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300 text-xs md:text-sm">
                Comprehensive campus solutions designed to enhance your student
                experience and streamline campus life.
              </p>
            </div>

            {/* top row – 3 cards */}
            <div className="grid gap-4 lg:grid-cols-3">
              
              {/* Lost & Found */}
              <article className="bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-32">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1681487704787-1d79d9f7ed0f?w=600&auto=format&fit=crop&q=60"
                    alt="Lost and found"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 top-3 h-8 w-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow flex items-center justify-center text-sm">
                    🔍
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    Lost &amp; Found
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Report and search for lost items across campus.
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>✔ Report lost items instantly</li>
                    <li>✔ Search database of found items</li>
                    <li>✔ Photo upload and descriptions</li>
                    <li>✔ Real‑time notifications</li>
                  </ul>
                  <button
                    onClick={() => navigate("/lost-found")}
                    className="mt-3 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Browse Lost Items
                  </button>
                </div>
              </article>

              {/* Digital Notice Board */}
              <article className="bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-32">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1706191097489-8d15de09e3f5?w=600&auto=format&fit=crop&q=60"
                    alt="Digital notice board"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 top-3 h-8 w-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow flex items-center justify-center text-sm">
                    📌
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    Digital Notice Board
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Stay updated with announcements, events and exam schedules.
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>✔ Latest campus announcements</li>
                    <li>✔ Event notifications</li>
                    <li>✔ Academic updates</li>
                    <li>✔ Category‑wise filtering</li>
                  </ul>
                  <button
                    onClick={() => navigate("/notices")}
                    className="mt-3 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Notices
                  </button>
                </div>
              </article>

              {/* Campus Marketplace */}
              <article className="bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-32">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1664300897489-fd98eee64faf?w=600&auto=format&fit=crop&q=60"
                    alt="Campus marketplace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 top-3 h-8 w-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow flex items-center justify-center text-sm">
                    🛒
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    Campus Marketplace
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Buy and sell second‑hand items within your campus community.
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>✔ Textbooks &amp; supplies</li>
                    <li>✔ Electronics &amp; gadgets</li>
                    <li>✔ Safe campus transactions</li>
                    <li>✔ Student‑verified sellers</li>
                  </ul>
                  <button
                    onClick={() => navigate("/marketplace")}
                    className="mt-3 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Explore Marketplace
                  </button>
                </div>
              </article>
            </div>

            {/* second row – 2 cards */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Student Feedback */}
              <article className="bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-32">
                  <img
                    src="https://media.istockphoto.com/id/2179684475/photo/engaged-audience-raising-hands-during-business-conference-lecture.webp?w=600&auto=format&fit=crop&q=60"
                    alt="Student feedback system"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 top-3 h-8 w-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow flex items-center justify-center text-sm">
                    ⭐
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    Student Feedback System
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Collect ratings and suggestions with a modern feedback
                    dashboard.
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>✔ Category‑wise feedback</li>
                    <li>✔ Star rating &amp; anonymous mode</li>
                    <li>✔ Admin response &amp; status tags</li>
                  </ul>
                  <button
                    onClick={() => navigate("/feedback")}
                    className="mt-3 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Open Feedback
                  </button>
                </div>
              </article>

              {/* Campus Management */}
              <article className="bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-32">
                  <img
                    src="https://media.istockphoto.com/id/1630774197/photo/indian-college-students-on-campus-interacting-with-faculty.webp?w=600&auto=format&fit=crop&q=60"
                    alt="Campus management"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 top-3 h-8 w-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow flex items-center justify-center text-sm">
                    🏫
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    College Management
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Dashboard for attendance, timetable, fees and student
                    records.
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>✔ Student profiles &amp; course details</li>
                    <li>✔ Attendance &amp; timetable overview</li>
                    <li>✔ Role‑based access (admin, faculty, students)</li>
                  </ul>
                  <button
                    onClick={() => navigate("/college-management")}
                    className="mt-3 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Management Module
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <CampusGallery />
      </div>
    </MainLayout>
  );
};

export default Home;
