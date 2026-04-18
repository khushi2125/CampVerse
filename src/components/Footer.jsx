//src/components/Footer.jsx
import { NavLink } from "react-router-dom";

const linkClass =
  "text-xs text-slate-300 hover:text-white transition-colors duration-200";
const activeClass = "text-white font-semibold";

const Footer = () => {
  return (
    <footer className="mt-12 bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Campverse</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your comprehensive campus platform connecting students,
              services and community. Making campus life easier, one click
              at a time.
            </p>
            <div className="flex items-center gap-3 text-lg mt-3">
              <button className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <span>𝕏</span>
              </button>
              <button className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <span>📸</span>
              </button>
              <button className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <span>in</span>
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <NavLink
                to="/lost-found"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Lost &amp; Found
              </NavLink>
              <NavLink
                to="/notices"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Notice Board
              </NavLink>
              <NavLink
                to="/marketplace"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Marketplace
              </NavLink>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Feedback
              </NavLink>
              <NavLink
                to="/college-management"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                College Management
              </NavLink>
            </div>
          </div>

          {/* Stay connected */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">
              Stay Connected
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center">
                  ✉
                </span>
                <span>support@campverse.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center">
                  ☎
                </span>
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-slate-900 flex items-center justify-center">
                  📍
                </span>
                <span>Campus Administration Building</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
          <p>© 2024 Campverse. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span
              className="
                h-2 w-2 rounded-full bg-emerald-400
                animate-[pulseDot_1.4s_ease-in-out_infinite]
              "
            />
            <span>System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
