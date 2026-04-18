// //src/pages/Notices.jsx
// import { useEffect, useState } from "react";
// import MainLayout from "../layouts/MainLayout";

// const initialNotices = [
//   {
//     id: 1,
//     title: "Semester Exam Time‑table Released",
//     body: "Check the exam portal for detailed schedule and seating plan.",
//     tag: "Academics",
//     timeAgo: "10 min ago",
//   },
//   {
//     id: 2,
//     title: "Holiday on 1st Jan – New Year",
//     body: "Campus will remain closed on 1st Jan. Classes resume from 2nd Jan.",
//     tag: "General",
//     timeAgo: "1 hr ago",
//   },
//   {
//     id: 3,
//     title: "Hostel Wi‑Fi Maintenance Tonight",
//     body: "Wi‑Fi will be unavailable from 11 PM to 1 AM due to maintenance.",
//     tag: "Hostel",
//     timeAgo: "3 hrs ago",
//   },
// ];

// const tagColors = {
//   Academics: "bg-blue-50 text-blue-600",
//   General: "bg-slate-100 text-slate-700",
//   Hostel: "bg-purple-50 text-purple-600",
//   Events: "bg-pink-50 text-pink-600",
// };

// const Notices = () => {
//   const [notices, setNotices] = useState(initialNotices);
//   const [showForm, setShowForm] = useState(false);
//   const [pendingNotice, setPendingNotice] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   // form fields
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [tag, setTag] = useState("General");

//   // filters
//   const [search, setSearch] = useState("");
//   const [activeTag, setActiveTag] = useState("All");

//   // page entry animation
//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 60);
//     return () => clearTimeout(t);
//   }, []);

//   // jab pendingNotice set hota hai, thodi delay se usko list me add karo
//   useEffect(() => {
//     if (!pendingNotice) return;
//     const t = setTimeout(() => {
//       setNotices((prev) => [pendingNotice, ...prev]);
//       setPendingNotice(null);
//     }, 350); // 350ms delay animation feel ke liye
//     return () => clearTimeout(t);
//   }, [pendingNotice]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     const newNotice = {
//       id: Date.now(),
//       title: title.trim(),
//       body:
//         body.trim() ||
//         "New notice has been posted. Kindly check details on the portal.",
//       tag,
//       timeAgo: "Just now",
//     };

//     setTitle("");
//     setBody("");
//     setTag("General");
//     setShowForm(false);
//     setPendingNotice(newNotice);
//   };

//   const filteredNotices = notices.filter((n) => {
//     const inText =
//       n.title.toLowerCase().includes(search.toLowerCase()) ||
//       n.body.toLowerCase().includes(search.toLowerCase());
//     const inTag = activeTag === "All" ? true : n.tag === activeTag;
//     return inText && inTag;
//   });

//   return (
//     <MainLayout>
//       <div
//         className={`
//           max-w-5xl mx-auto space-y-6
//           transition-all duration-700 ease-out
//           ${
//             mounted
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-4 scale-[0.98]"
//           }
//         `}
//       >
//         {/* Top glass card like dashboard header */}
//         <div className="rounded-[32px] bg-gradient-to-br from-slate-50 via-white to-sky-50 shadow-[0_30px_80px_rgba(15,23,42,0.10)] border border-slate-100/70 px-4 sm:px-6 md:px-8 py-6 md:py-7">
//           {/* Header */}
//           <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
//             <div>
//               <p className="text-xs font-semibold tracking-[0.22em] uppercase text-indigo-400">
//                 Campus Updates
//               </p>
//               <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
//                 Notice Board
//               </h1>
//               <p className="text-sm md:text-base text-slate-500 mt-1.5 max-w-xl">
//                 Live digital notices with categories, timestamps and quick
//                 filters for your campus.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <button
//                 type="button"
//                 className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-emerald-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.5)] hover:bg-emerald-600 hover:shadow-[0_16px_40px_rgba(16,185,129,0.6)] transition-all duration-300"
//               >
//                 🔔 Mark All Read
//               </button>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="
//                   px-4 py-2 rounded-full 
//                   bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 
//                   text-white text-xs md:text-sm font-semibold 
//                   shadow-[0_12px_32px_rgba(79,70,229,0.45)]
//                   hover:shadow-[0_16px_46px_rgba(79,70,229,0.65)]
//                   hover:translate-y-0.5 hover:scale-[1.02]
//                   transition-all duration-300
//                 "
//               >
//                 + New Notice
//               </button>
//             </div>
//           </header>

//           {/* Small stats + filters row */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             {/* stats badges */}
//             <div className="flex flex-wrap gap-3">
//               <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 border border-slate-100 shadow-sm text-xs">
//                 <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[11px]">
//                   📄
//                 </span>
//                 <span className="font-semibold text-slate-700">
//                   {notices.length} total
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 border border-slate-100 shadow-sm text-xs">
//                 <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px]">
//                   🕒
//                 </span>
//                 <span className="text-slate-600">
//                   Latest: {notices[0]?.timeAgo || "-"}
//                 </span>
//               </div>
//             </div>

//             {/* search + tag pills */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative flex-1 min-w-[180px]">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
//                   🔍
//                 </span>
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search notice title or text..."
//                   className="w-full pl-8 pr-3 py-2 text-xs md:text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70 shadow-inner"
//                 />
//               </div>

//               <div className="flex flex-wrap gap-2 text-[11px]">
//                 {["All", "Academics", "General", "Hostel", "Events"].map(
//                   (t) => (
//                     <button
//                       key={t}
//                       type="button"
//                       onClick={() => setActiveTag(t)}
//                       className={`
//                         px-3 py-1.5 rounded-full font-semibold border text-xs
//                         transition-all duration-200
//                         ${
//                           activeTag === t
//                             ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-400/40"
//                             : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-100"
//                         }
//                       `}
//                     >
//                       {t}
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Notices list glass card */}
//         <section
//           className="
//             bg-white/95 rounded-3xl 
//             border border-slate-100 
//             shadow-[0_24px_60px_rgba(15,23,42,0.08)] divide-y
//           "
//         >
//           {filteredNotices.map((n, idx) => (
//             <article
//               key={n.id}
//               className={`
//                 px-5 py-4 flex items-start justify-between gap-3
//                 transition-all duration-300
//                 hover:bg-slate-50/60
//                 ${
//                   idx === 0 && n.timeAgo === "Just now"
//                     ? "animate-[noticePop_0.35s_ease-out]"
//                     : ""
//                 }
//               `}
//             >
//               <div className="flex-1">
//                 <h3 className="text-sm md:text-base font-semibold text-slate-900">
//                   {n.title}
//                 </h3>
//                 <p className="text-xs md:text-sm text-slate-600 mt-1">
//                   {n.body}
//                 </p>
//                 <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
//                   <span>⏱ {n.timeAgo}</span>
//                   <span className="h-1 w-1 rounded-full bg-slate-300" />
//                   <span className="text-emerald-500 font-semibold">
//                     Live •
//                   </span>
//                 </p>
//               </div>
//               <div className="flex flex-col items-end gap-2">
//                 <span
//                   className={`
//                     inline-flex items-center justify-center px-3 py-1 
//                     rounded-full text-xs font-medium
//                     ${tagColors[n.tag] || "bg-slate-100 text-slate-700"}
//                   `}
//                 >
//                   {n.tag}
//                 </span>
//                 <button
//                   type="button"
//                   className="text-[11px] text-sky-600 hover:text-sky-700 font-semibold"
//                 >
//                   Pin
//                 </button>
//               </div>
//             </article>
//           ))}

//           {filteredNotices.length === 0 && (
//             <div className="px-5 py-10 text-center text-xs text-slate-500">
//               No notices found for current filters. Try clearing search or
//               posting a new notice.
//             </div>
//           )}
//         </section>

//         {/* Slide‑in notice form (drawer style) */}
//         {showForm && (
//           <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-slate-900/40 backdrop-blur-sm">
//             <div
//               className="
//                 w-full md:max-w-lg 
//                 bg-white rounded-t-3xl md:rounded-3xl 
//                 shadow-2xl border border-slate-100 
//                 animate-[noticeFormIn_0.35s_ease-out]
//               "
//             >
//               <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
//                 <div>
//                   <h2 className="text-sm font-semibold text-slate-900">
//                     Post New Notice
//                   </h2>
//                   <p className="text-xs text-slate-500">
//                     Share important updates with all students.
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="px-5 py-4 space-y-3 text-sm"
//               >
//                 <div className="space-y-1">
//                   <label className="text-xs font-medium text-slate-600">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="e.g. Internal Assessment schedule updated"
//                     className="
//                       w-full px-3 py-2 rounded-xl 
//                       border border-slate-200 bg-slate-50
//                       focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white
//                     "
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-medium text-slate-600">
//                     Description
//                   </label>
//                   <textarea
//                     rows={3}
//                     value={body}
//                     onChange={(e) => setBody(e.target.value)}
//                     placeholder="Add brief details about this notice..."
//                     className="
//                       w-full px-3 py-2 rounded-xl 
//                       border border-slate-200 bg-slate-50
//                       focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white
//                       resize-none
//                     "
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-medium text-slate-600">
//                     Category
//                   </label>
//                   <select
//                     value={tag}
//                     onChange={(e) => setTag(e.target.value)}
//                     className="
//                       w-full px-3 py-2 rounded-xl 
//                       border border-slate-200 bg-slate-50
//                       focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white
//                     "
//                   >
//                     <option>Academics</option>
//                     <option>General</option>
//                     <option>Hostel</option>
//                     <option>Events</option>
//                   </select>
//                 </div>

//                 <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
//                   <span>Notice will appear at the top with &quot;Just now&quot; label.</span>
//                   <span>⌛ Auto‑fade to normal after some time (backend).</span>
//                 </div>

//                 <div className="flex items-center justify-end gap-2 pt-2">
//                   <button
//                     type="button"
//                     onClick={() => setShowForm(false)}
//                     className="
//                       px-4 py-2 rounded-xl 
//                       border border-slate-200 bg-white text-xs font-medium text-slate-600
//                       hover:bg-slate-50
//                     "
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="
//                       px-4 py-2 rounded-xl 
//                       bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 
//                       text-xs font-semibold text-white
//                       shadow-sm shadow-indigo-300/70
//                       hover:shadow-md hover:shadow-indigo-400/80
//                       transition-all duration-200
//                     "
//                   >
//                     Post Notice
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default Notices;


// src/pages/Notices.jsx
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../components/api/client";

const tagColors = {
  Academics: "bg-blue-50 text-blue-600",
  General: "bg-slate-100 text-slate-700",
  Hostel: "bg-purple-50 text-purple-600",
  Events: "bg-pink-50 text-pink-600",
};

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [pendingNotice, setPendingNotice] = useState(null);
  const [mounted, setMounted] = useState(false);

  // form fields
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");

  // filters
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  // page entry animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // backend se notices fetch karo
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // Django notices app me tum list endpoint banaoge, maine example "/api/notices/active/" rakha tha.[file:2]
        const res = await api.get("/api/notices/active/");
        // Assume backend response array of objects: { id, title, body/text, category/tag, created_at/timeAgo ... }[file:2]
        const apiNotices = res.data.map((n) => ({
          id: n.id,
          title: n.title,
          body: n.description || n.body || "",
          tag: n.category || n.tag || "General",
          timeAgo: n.time_ago || "Just now",
        }));
        setNotices(apiNotices);
      } catch (err) {
        console.error("Error fetching notices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // pendingNotice ko thodi delay se list me inject karo
  useEffect(() => {
    if (!pendingNotice) return;
    const t = setTimeout(() => {
      setNotices((prev) => [pendingNotice, ...prev]);
      setPendingNotice(null);
    }, 350);
    return () => clearTimeout(t);
  }, [pendingNotice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const payload = {
        title: title.trim(),
        description:
          body.trim() ||
          "New notice has been posted. Kindly check details on the portal.",
        category: tag,
        is_pinned: false,
        is_active: true,
      };

      const res = await api.post("/api/notices/", payload);
      const newNotice = {
        id: res.data.id,
        title: res.data.title,
        body: res.data.description || res.data.body || "",
        tag: res.data.category || res.data.tag || "General",
        timeAgo: "Just now",
      };

      setTitle("");
      setBody("");
      setTag("General");
      setShowForm(false);
      setPendingNotice(newNotice);
    } catch (err) {
      console.error("Error creating notice", err);
      alert("Failed to post notice. Please try again.");
    }
  };

  const filteredNotices = notices.filter((n) => {
    const inText =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.body.toLowerCase().includes(search.toLowerCase());
    const inTag = activeTag === "All" ? true : n.tag === activeTag;
    return inText && inTag;
  });

  return (
    <MainLayout>
      {loading ? (
        <div className="max-w-5xl mx-auto py-10 text-center text-sm text-slate-600">
          Loading notices...
        </div>
      ) : (
        <div
          className={`
            max-w-5xl mx-auto space-y-6
            transition-all duration-700 ease-out
            ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 scale-[0.98]"
            }
          `}
        >
          {/* Top glass card like dashboard header */}
          <div className="rounded-[32px] bg-gradient-to-br from-slate-50 via-white to-sky-50 shadow-[0_30px_80px_rgba(15,23,42,0.10)] border border-slate-100/70 px-4 sm:px-6 md:px-8 py-6 md:py-7">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-indigo-400">
                  Campus Updates
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Notice Board
                </h1>
                <p className="text-sm md:text-base text-slate-500 mt-1.5 max-w-xl">
                  Live digital notices with categories, timestamps and quick
                  filters for your campus.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-emerald-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.5)] hover:bg-emerald-600 hover:shadow-[0_16px_40px_rgba(16,185,129,0.6)] transition-all duration-300"
                >
                  🔔 Mark All Read
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="
                    px-4 py-2 rounded-full 
                    bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 
                    text-white text-xs md:text-sm font-semibold 
                    shadow-[0_12px_32px_rgba(79,70,229,0.45)]
                    hover:shadow-[0_16px_46px_rgba(79,70,229,0.65)]
                    hover:translate-y-0.5 hover:scale-[1.02]
                    transition-all duration-300
                  "
                >
                  + New Notice
                </button>
              </div>
            </header>

            {/* Small stats + filters row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* stats badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 border border-slate-100 shadow-sm text-xs">
                  <span className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[11px]">
                    📄
                  </span>
                  <span className="font-semibold text-slate-700">
                    {notices.length} total
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 border border-slate-100 shadow-sm text-xs">
                  <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px]">
                    🕒
                  </span>
                  <span className="text-slate-600">
                    Latest: {notices[0]?.timeAgo || "-"}
                  </span>
                </div>
              </div>

              {/* search + tag pills */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 min-w-[180px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    🔍
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search notice title or text..."
                    className="w-full pl-8 pr-3 py-2 text-xs md:text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70 shadow-inner"
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  {["All", "Academics", "General", "Hostel", "Events"].map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setActiveTag(t)}
                        className={`
                          px-3 py-1.5 rounded-full font-semibold border text-xs
                          transition-all duration-200
                          ${
                            activeTag === t
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-400/40"
                              : "bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }
                        `}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notices list glass card */}
          <section
            className="
              bg-white/95 rounded-3xl 
              border border-slate-100 
              shadow-[0_24px_60px_rgba(15,23,42,0.08)] divide-y
            "
          >
            {filteredNotices.map((n, idx) => (
              <article
                key={n.id}
                className={`
                  px-5 py-4 flex items-start justify-between gap-3
                  transition-all duration-300
                  hover:bg-slate-50/60
                  ${
                    idx === 0 && n.timeAgo === "Just now"
                      ? "animate-[noticePop_0.35s_ease-out]"
                      : ""
                  }
                `}
              >
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold text-slate-900">
                    {n.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    {n.body}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>⏱ {n.timeAgo}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-emerald-500 font-semibold">
                      Live •
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`
                      inline-flex items-center justify-center px-3 py-1 
                      rounded-full text-xs font-medium
                      ${tagColors[n.tag] || "bg-slate-100 text-slate-700"}
                    `}
                  >
                    {n.tag}
                  </span>
                  <button
                    type="button"
                    className="text-[11px] text-sky-600 hover:text-sky-700 font-semibold"
                  >
                    Pin
                  </button>
                </div>
              </article>
            ))}

            {filteredNotices.length === 0 && (
              <div className="px-5 py-10 text-center text-xs text-slate-500">
                No notices found for current filters. Try clearing search or
                posting a new notice.
              </div>
            )}
          </section>

          {/* Slide‑in notice form (drawer style) */}
          {showForm && (
            <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-slate-900/40 backdrop-blur-sm">
              <div
                className="
                  w-full md:max-w-lg 
                  bg-white rounded-t-3xl md:rounded-3xl 
                  shadow-2xl border border-slate-100 
                  animate-[noticeFormIn_0.35s_ease-out]
                "
              >
                <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Post New Notice
                    </h2>
                    <p className="text-xs text-slate-500">
                      Share important updates with all students.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="px-5 py-4 space-y-3 text-sm"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Internal Assessment schedule updated"
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white
                      "
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Add brief details about this notice..."
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white
                        resize-none
                      "
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Category
                    </label>
                    <select
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white
                      "
                    >
                      <option>Academics</option>
                      <option>General</option>
                      <option>Hostel</option>
                      <option>Events</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                    <span>
                      Notice will appear at the top with &quot;Just now&quot;
                      label.
                    </span>
                    <span>⌛ Auto‑fade to normal after some time (backend).</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="
                        px-4 py-2 rounded-xl 
                        border border-slate-200 bg-white text-xs font-medium text-slate-600
                        hover:bg-slate-50
                      "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="
                        px-4 py-2 rounded-xl 
                        bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 
                        text-xs font-semibold text-white
                        shadow-sm shadow-indigo-300/70
                        hover:shadow-md hover:shadow-indigo-400/80
                        transition-all duration-200
                      "
                    >
                      Post Notice
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default Notices;
