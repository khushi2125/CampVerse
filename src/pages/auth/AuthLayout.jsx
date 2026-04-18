//src/pages/auth/AuthLayout.jsx
import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
      {/* Left gradient panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-between p-10">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center text-xl">
              🎓
            </div>
            <span className="text-xl font-bold tracking-tight">
              Campverse
            </span>
          </Link>

          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
              Smart Campus Portal
            </p>
            <h2 className="text-3xl font-bold leading-snug">
              One account for all your{" "}
              <span className="text-sky-100">campus essentials.</span>
            </h2>
            <ul className="space-y-2 text-sm text-sky-50/90">
              <li>• Track attendance, notices &amp; lost items</li>
              <li>• Buy &amp; sell second‑hand books and supplies</li>
              <li>• Share feedback and raise complaints in seconds</li>
            </ul>
          </div>

          <p className="text-[10px] text-sky-100/80">
            © {new Date().getFullYear()} Campverse · Campus life, simplified.
          </p>
        </div>
      </div>

      {/* Right form panel (updated white theme + animation) */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div
          className="
            w-full max-w-md
            opacity-0 translate-y-4
            animate-[authFadeIn_0.45s_ease-out_forwards_0.12s]
          "
        >
          {/* Mobile logo */}
          <div className="mb-6 lg:hidden flex items-center justify-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xl">
                🎓
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Campverse
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {/* Card (white) */}
          <div
            className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              rounded-2xl px-5 py-6 sm:px-6 sm:py-7 
              shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
            "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
