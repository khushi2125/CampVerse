// //src/components/Navbar.jsx
// import { NavLink, Link } from "react-router-dom";

// const Navbar = () => {
//   const base =
//     "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
//   const active = "text-slate-900";

//   return (
//     <nav className="bg-white/80 backdrop-blur border-b border-slate-100 sticky top-0 z-30">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
//         {/* Logo */}
//         <NavLink to="/" className="flex items-center gap-2">
//           <span className="text-xl font-extrabold bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-400 bg-clip-text text-transparent">
//             Campverse
//           </span>
//         </NavLink>

//         {/* Links */}
//         <div className="hidden md:flex items-center gap-6">
//         <NavLink
//             to="/college-management"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             College Management
//           </NavLink>
//           <NavLink
//             to="/lost-found"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Lost &amp; Found
//           </NavLink>
//           <NavLink
//             to="/notices"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Notice Board
//           </NavLink>
//           <NavLink
//             to="/marketplace"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Marketplace
//           </NavLink>
//           <NavLink
//             to="/feedback"
//             className={({ isActive }) => `${base} ${isActive ? active : ""}`}
//           >
//             Feedback
//           </NavLink>
          
//         </div>

//         {/* Right buttons */}
//         <div className="flex items-center gap-3">
//           <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs">
//             🔔
//           </button>
//           <button className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs">
//             🔍
//           </button>

//           {/* Login */}
//           <Link
//             to="/login"
//             className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx - Only Search + Bell Active
import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import api from "./api/client";

const Navbar = () => {
  // const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const isLoggedIn = !!localStorage.getItem("campverse_token");
  
  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/notices/");
      if (response.data && Array.isArray(response.data)) {
        // Get latest 5 notices as notifications
        const latestNotices = response.data.slice(0, 5).map(notice => ({
          id: notice.id,
          title: notice.title,
          description: notice.description?.substring(0, 50) + "..." || "",
          category: notice.category,
          timeAgo: notice.time_ago,
          isPinned: notice.is_pinned
        }));
        setNotifications(latestNotices);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Fallback to demo data if API fails
      setNotifications([
        { id: 1, title: "Welcome to Campverse", description: "Explore all features...", category: "General", timeAgo: "Just now" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout/");
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("campverse_token");
    localStorage.removeItem("campverse_user");
    navigate("/login");
  };

  const base = "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
  const active = "text-slate-900";

  // const handleSearch = async (e) => {};

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-30 dark:bg-slate-900/90 dark:border-slate-600">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold bg-gradient-to-r from-sky-500 via-indigo-500 to-orange-400 bg-clip-text text-transparent">
            Campverse
          </span>
        </NavLink>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/college-management"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            College Management
          </NavLink>
          <NavLink
            to="/lost-found"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Lost & Found
          </NavLink>
          <NavLink
            to="/notices"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Notice Board
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/feedback"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Feedback
          </NavLink>
        </div>

        {/* Right buttons - ACTIVE */}
        <div className="flex items-center gap-3 relative">
          {/* Bell Icon - ACTIVE */}
          <div className="relative group">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:scale-110 hover:transition-all duration-300 cursor-pointer relative"
              title={`Notifications (${notifications.length} new)`}
            >
              🔔
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notifications.length > 9 ? '9+' : notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-lg py-3 px-4 z-50 dark:bg-slate-900/95 dark:border-slate-700 dark:text-slate-200 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-sm">Notifications</h4>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    ✕
                  </button>
                </div>
                
                {loading ? (
                  <div className="text-center py-4 text-xs text-slate-500">
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="text-xs p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                        onClick={() => {
                          navigate('/notices');
                          setShowNotifications(false);
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-medium text-slate-700 dark:text-slate-200">
                              {notification.title}
                            </div>
                            <div className="text-slate-500 dark:text-slate-400 mt-1">
                              {notification.description}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-[10px] font-medium">
                                {notification.category}
                              </span>
                              <span className="text-slate-400 dark:text-slate-500">
                                {notification.timeAgo}
                              </span>
                            </div>
                          </div>
                          {notification.isPinned && (
                            <span className="text-amber-500" title="Pinned">📌</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {notifications.length > 0 && (
                  <button
                    onClick={() => {
                      navigate('/notices');
                      setShowNotifications(false);
                    }}
                    className="w-full mt-3 py-2 text-xs text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    View all notifications
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Search Icon - REMOVED */}

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold shadow-sm hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
