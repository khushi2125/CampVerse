//src/pages/Dashboard.jsx
import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-slate-600 text-sm">
              Quick overview of attendance, classes and upcoming events.
            </p>
          </div>
          <button className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700">
            Download Report
          </button>
        </header>

        <section className="grid md:grid-cols-4 gap-4">
          {[
            { label: "Present Today", value: "842", color: "bg-blue-50" },
            { label: "Absent Today", value: "37", color: "bg-rose-50" },
            { label: "Active Courses", value: "64", color: "bg-emerald-50" },
            { label: "New Notices", value: "5", color: "bg-amber-50" },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`${card.color} rounded-xl p-4 border border-slate-100`}
            >
              <p className="text-xs text-slate-500">{card.label}</p>
              <p className="text-2xl font-semibold mt-1">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
            <h2 className="text-sm font-semibold mb-3">Today&apos;s Classes</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>DBMS – CSE 3rd Year</span>
                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs">
                  09:00 AM
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Operating Systems – CSE 2nd Year</span>
                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
                  11:00 AM
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Physics – BSc 1st Year</span>
                <span className="px-2 py-1 rounded-full bg-violet-50 text-violet-700 text-xs">
                  02:00 PM
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
            <h2 className="text-sm font-semibold mb-3">Upcoming Events</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Tech Fest 2025</span>
                <span className="text-xs text-slate-500">28 Dec</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Internal Exams</span>
                <span className="text-xs text-slate-500">02 Jan</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Placement Drive</span>
                <span className="text-xs text-slate-500">15 Jan</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
