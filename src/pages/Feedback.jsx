//src/pages/Feedback.jsx
import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../components/api/client";

const categories = [
  "Academic Services",
  "Library Services",
  "Hostel Facilities",
  "Cafeteria/Food",
  "Sports Facilities",
  "Administrative Services",
];

const initialFeedback = [
  {
    id: 1,
    category: "Library Services",
    text: "The new study pods are excellent! Really helps with concentration.",
    rating: 5,
    status: "Acknowledged",
    user: "Student_CS21",
    timeAgo: "2 days ago",
  },
  {
    id: 2,
    category: "Cafeteria/Food",
    text: "Could use more vegetarian options during dinner time.",
    rating: 3,
    status: "Under Review",
    user: "Anonymous",
    timeAgo: "1 week ago",
  },
  {
    id: 3,
    category: "Sports Facilities",
    text: "The new gymnasium equipment is fantastic. Great addition!",
    rating: 5,
    status: "Implemented",
    user: "SportsFan_2023",
    timeAgo: "3 days ago",
  },
];

const statusColors = {
  Acknowledged: "bg-slate-100 text-slate-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Implemented: "bg-emerald-100 text-emerald-700",
};

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Academic Services");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // carousel
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch feedback from backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/feedback/");
        const mapped = res.data.map((f) => ({
          id: f.id,
          category: mapTypeToCategory(f.target_name),
          text: f.comment || "",
          rating: f.rating,
          status: "Acknowledged",
          user: f.anonymous ? "Anonymous" : (f.user || "User"),
          timeAgo: f.time_ago || "Just now",
        }));
        setFeedbackList(mapped);
      } catch (err) {
        console.error("Error fetching feedback", err);
        // Fallback to initial feedback if API fails
        setFeedbackList(initialFeedback);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // auto slide recent feedback
  useEffect(() => {
    if (!feedbackList.length) return;
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbackList.length);
    }, 4500);
    return () => clearInterval(t);
  }, [feedbackList.length]);

  // Category -> backend feedback_type map
  const mapCategoryToType = (cat) => {
    if (cat === "Academic Services" || cat === "Library Services") return "course";
    if (cat === "Sports Facilities") return "sports";
    if (cat === "Hostel Facilities") return "hostel";
    if (cat === "Cafeteria/Food") return "cafeteria";
    if (cat === "Administrative Services") return "admin";
    return "course";
  };

  const mapTypeToCategory = (t) => {
    if (!t) return "Academic Services";
    const type = t.toLowerCase();
    if (type === "course") return "Academic Services";
    if (type === "teacher") return "Academic Services";
    if (type === "hostel") return "Hostel Facilities";
    if (type === "cafeteria") return "Cafeteria/Food";
    if (type === "sports") return "Sports Facilities";
    if (type === "admin") return "Administrative Services";
    return "Academic Services";
  };

  const stats = useMemo(() => {
    const total = feedbackList.length;
    const avg =
      total === 0
        ? 0
        : (
            feedbackList.reduce((sum, f) => sum + f.rating, 0) / total
          ).toFixed(1);
    const implementationRate = Math.round(
      (feedbackList.filter((f) => f.status === "Implemented").length / total) *
        100 || 0
    );
    return { total, avg, implementationRate, active: 892 };
  }, [feedbackList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || rating === 0) return;
    setSubmitting(true);

    const feedback_type = mapCategoryToType(activeCategory);
    const payload = {
      feedback_type,
      target_name: activeCategory,
      rating,
      comment: text.trim(),
      anonymous,
    };

    try {
      const res = await api.post("/api/feedback/", payload);
      const f = res.data;
      const newFb = {
        id: f.id,
        category: mapTypeToCategory(f.target_name),
        text: f.comment || "",
        rating: f.rating,
        status: "Under Review",
        user: f.anonymous ? "Anonymous" : (f.user || "You"),
        timeAgo: "Just now",
      };
      setFeedbackList((prev) => [newFb, ...prev]);
      setText("");
      setRating(0);
      setHoverRating(0);
      setAnonymous(false);
      setActiveIndex(0);
    } catch (err) {
      console.error("Error submitting feedback", err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeFeedback = feedbackList[activeIndex];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Student Feedback System
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            Your voice matters! Share your thoughts and suggestions to help us
            improve campus life and services.
          </p>
        </section>

        {/* Stats */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
            <span className="text-2xl">💬</span>
            <p className="text-xl font-semibold">{stats.total}</p>
            <p className="text-xs text-slate-500">Total Feedback</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
            <span className="text-2xl">⭐</span>
            <p className="text-xl font-semibold">{stats.avg}</p>
            <p className="text-xs text-slate-500">Avg Rating</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
            <span className="text-2xl text-amber-500">📈</span>
            <p className="text-xl font-semibold">{stats.implementationRate}%</p>
            <p className="text-xs text-slate-500">Implementation Rate</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
            <span className="text-2xl text-purple-500">👥</span>
            <p className="text-xl font-semibold">{stats.active}</p>
            <p className="text-xs text-slate-500">Active Participants</p>
          </div>
        </section>

        {/* Two columns */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          {/* Submit feedback */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Submit Your Feedback
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Help us improve by sharing your experience and suggestions.
              </p>
            </div>

            {/* Category pills */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">Category</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-3 py-2 rounded-xl text-xs font-medium
                      border transition-all duration-200
                      ${
                        activeCategory === cat
                          ? "bg-sky-50 border-sky-400 text-sky-700"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating stars */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">Rating</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = hoverRating || rating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="text-2xl"
                    >
                      <span
                        className={
                          active >= star ? "text-amber-400" : "text-slate-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textarea */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-600">
                  Your Feedback
                </p>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or concerns..."
                  className="
                    w-full px-3 py-2 text-sm rounded-2xl 
                    border border-slate-200 bg-slate-50 
                    focus:outline-none focus:ring-2 focus:ring-sky-500/80 focus:bg-white
                    resize-none
                  "
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <input
                  id="anon"
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="anon">Submit anonymously</label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full py-2.5 rounded-full 
                  bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                  text-sm font-semibold text-white
                  shadow-[0_18px_45px_rgba(37,99,235,0.45)]
                  hover:shadow-[0_22px_60px_rgba(79,70,229,0.6)]
                  hover:translate-y-0.5
                  transition-all duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>

          {/* Recent feedback carousel */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Feedback
            </h2>

            {activeFeedback ? (
              <div
                key={activeFeedback.id}
                className="
                  bg-white rounded-3xl shadow-sm border border-slate-100 
                  p-5 space-y-3 
                  animate-[feedbackSlide_0.45s_ease-out]
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700">
                    {activeFeedback.category}
                  </span>
                  <span
                    className={`
                      px-3 py-1 rounded-full text-[11px] font-semibold
                      ${statusColors[activeFeedback.status] || "bg-slate-100 text-slate-700"}
                    `}
                  >
                    {activeFeedback.status}
                  </span>
                </div>

                <p className="text-sm text-slate-700 mt-1">
                  &quot;{activeFeedback.text}&quot;
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          activeFeedback.rating > idx
                            ? "text-amber-400"
                            : "text-slate-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="mx-1">·</span>
                  <span>{activeFeedback.timeAgo}</span>
                  <span className="mx-1">·</span>
                  <span className="font-medium">
                    {activeFeedback.user}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No feedback yet. Be the first to submit!
              </p>
            )}

            {/* small dots indicator */}
            <div className="flex items-center gap-1.5 mt-1">
              {feedbackList.map((fb, idx) => (
                <button
                  key={fb.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`
                    h-1.5 rounded-full transition-all duration-200
                    ${
                      idx === activeIndex
                        ? "w-5 bg-slate-800"
                        : "w-2.5 bg-slate-300"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Feedback;


// src/pages/Feedback.jsx
// import { useEffect, useMemo, useState } from "react";
// import MainLayout from "../layouts/MainLayout";
// import { api } from "../api/client"; // <- ensure this file exists as discussed

// const categories = [
//   "Academic Services",
//   "Library Services",
//   "Hostel Facilities",
//   "Cafeteria/Food",
//   "Sports Facilities",
//   "Administrative Services",
// ];

// // Backend status ke liye UI colors
// const statusColors = {
//   Acknowledged: "bg-slate-100 text-slate-700",
//   "Under Review": "bg-amber-100 text-amber-700",
//   Implemented: "bg-emerald-100 text-emerald-700",
// };

// const Feedback = () => {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("Academic Services");
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [text, setText] = useState("");
//   const [anonymous, setAnonymous] = useState(false);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loadingList, setLoadingList] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Initial load – saare feedbacks fetch
//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         setLoadingList(true);
//         const res = await api.get("feedback/feedbacks/");
//         // res.data = [{id, user, anonymous, feedbacktype, targetname, rating, comment, createdat}]
//         const mapped = res.data.map((f) => ({
//           id: f.id,
//           category: mapTypeToCategory(f.feedbacktype),
//           text: f.comment || "",
//           rating: f.rating,
//           status: "Acknowledged", // backend me field nahi, UI ke liye placeholder
//           user: f.anonymous ? "Anonymous" : f.user || "User",
//           timeAgo: formatTimeAgo(f.createdat),
//         }));
//         setFeedbackList(mapped);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load feedback");
//       } finally {
//         setLoadingList(false);
//       }
//     };

//     fetchFeedback();
//   }, []);

//   // Auto carousel
//   useEffect(() => {
//     if (!feedbackList.length) return;
//     const t = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % feedbackList.length);
//     }, 4500);
//     return () => clearInterval(t);
//   }, [feedbackList.length]);

//   const stats = useMemo(() => {
//     const total = feedbackList.length;
//     const avg =
//       total === 0
//         ? 0
//         : (
//             feedbackList.reduce((sum, f) => sum + (f.rating || 0), 0) /
//             total
//           ).toFixed(1);
//     const implementationRate = Math.round(
//       ((feedbackList.filter((f) => f.status === "Implemented").length /
//         total) *
//         100) || 0
//     );
//     return { total, avg, implementationRate, active: 892 };
//   }, [feedbackList]);

//   // Category -> backend feedbacktype map
//   const mapCategoryToType = (cat) => {
//     if (cat === "Academic Services" || cat === "Library Services") return "course";
//     if (cat === "Sports Facilities") return "course";
//     if (cat === "Hostel Facilities") return "hostel";
//     if (cat === "Cafeteria/Food") return "hostel";
//     return "course";
//   };

//   const mapTypeToCategory = (t) => {
//     if (!t) return "Academic Services";
//     const type = t.toLowerCase();
//     if (type === "course") return "Academic Services";
//     if (type === "teacher") return "Academic Services";
//     if (type === "hostel") return "Hostel Facilities";
//     return "Academic Services";
//   };

//   // createdat -> "x days ago"
//   const formatTimeAgo = (iso) => {
//     if (!iso) return "Just now";
//     const created = new Date(iso);
//     const diffMs = Date.now() - created.getTime();
//     const diffMin = Math.floor(diffMs / 60000);
//     if (diffMin < 1) return "Just now";
//     if (diffMin < 60) return `${diffMin} min ago`;
//     const diffH = Math.floor(diffMin / 60);
//     if (diffH < 24) return `${diffH} hours ago`;
//     const diffD = Math.floor(diffH / 24);
//     if (diffD === 1) return "1 day ago";
//     return `${diffD} days ago`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim() || rating === 0) return;
//     setSubmitting(true);

//     const feedbacktype = mapCategoryToType(activeCategory); // course/teacher/hostel
//     const payload = {
//       feedbacktype,          // required
//       targetname: activeCategory, // UI category ko hi target bana diya
//       rating,
//       comment: text.trim(),
//       anonymous,
//     };

//     try {
//       const res = await api.post("feedback/feedbacks/", payload);
//       const f = res.data;
//       const newFb = {
//         id: f.id,
//         category: mapTypeToCategory(f.feedbacktype),
//         text: f.comment || "",
//         rating: f.rating,
//         status: "Under Review",
//         user: f.anonymous ? "Anonymous" : f.user || "You",
//         timeAgo: "Just now",
//       };
//       setFeedbackList((prev) => [newFb, ...prev]);
//       setText("");
//       setRating(0);
//       setHoverRating(0);
//       setAnonymous(false);
//       setActiveIndex(0);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit feedback");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const activeFeedback = feedbackList[activeIndex];

//   return (
//     <MainLayout>
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <section className="text-center space-y-3">
//           <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
//             Student Feedback System
//           </h1>
//           <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
//             Your voice matters! Share your thoughts and suggestions to help us
//             improve campus life and services.
//           </p>
//         </section>

//         {/* Stats */}
//         <section className="grid gap-4 md:grid-cols-4">
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
//             <span className="text-2xl">💬</span>
//             <p className="text-xl font-semibold">{stats.total}</p>
//             <p className="text-xs text-slate-500">Total Feedback</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
//             <span className="text-2xl">⭐</span>
//             <p className="text-xl font-semibold">{stats.avg}</p>
//             <p className="text-xs text-slate-500">Avg Rating</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
//             <span className="text-2xl text-amber-500">📈</span>
//             <p className="text-xl font-semibold">{stats.implementationRate}%</p>
//             <p className="text-xs text-slate-500">Implementation Rate</p>
//           </div>
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col items-center gap-2">
//             <span className="text-2xl text-purple-500">👥</span>
//             <p className="text-xl font-semibold">{stats.active}</p>
//             <p className="text-xs text-slate-500">Active Participants</p>
//           </div>
//         </section>

//         {/* Two columns */}
//         <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
//           {/* Submit feedback */}
//           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 space-y-4">
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Submit Your Feedback
//               </h2>
//               <p className="text-xs text-slate-500 mt-1">
//                 Help us improve by sharing your experience and suggestions.
//               </p>
//             </div>

//             {/* Category pills */}
//             <div className="space-y-2">
//               <p className="text-xs font-medium text-slate-600">Category</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     type="button"
//                     onClick={() => setActiveCategory(cat)}
//                     className={`
//                       px-3 py-2 rounded-xl text-xs font-medium
//                       border transition-all duration-200
//                       ${
//                         activeCategory === cat
//                           ? "bg-sky-50 border-sky-400 text-sky-700"
//                           : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
//                       }
//                     `}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Rating stars */}
//             <div className="space-y-2">
//               <p className="text-xs font-medium text-slate-600">Rating</p>
//               <div className="flex items-center gap-2">
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   const active = hoverRating || rating;
//                   return (
//                     <button
//                       key={star}
//                       type="button"
//                       onMouseEnter={() => setHoverRating(star)}
//                       onMouseLeave={() => setHoverRating(0)}
//                       onClick={() => setRating(star)}
//                       className="text-2xl"
//                     >
//                       <span
//                         className={
//                           active >= star ? "text-amber-400" : "text-slate-300"
//                         }
//                       >
//                         ★
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Textarea */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <p className="text-xs font-medium text-slate-600">
//                   Your Feedback
//                 </p>
//                 <textarea
//                   rows={4}
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   placeholder="Share your thoughts, suggestions, or concerns..."
//                   className="
//                     w-full px-3 py-2 text-sm rounded-2xl 
//                     border border-slate-200 bg-slate-50 
//                     focus:outline-none focus:ring-2 focus:ring-sky-500/80 focus:bg-white
//                     resize-none
//                   "
//                 />
//               </div>

//               <div className="flex items-center gap-2 text-xs text-slate-500">
//                 <input
//                   id="anon"
//                   type="checkbox"
//                   checked={anonymous}
//                   onChange={(e) => setAnonymous(e.target.checked)}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor="anon">Submit anonymously</label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="
//                   w-full py-2.5 rounded-full 
//                   bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
//                   text-sm font-semibold text-white
//                   shadow-[0_18px_45px_rgba(37,99,235,0.45)]
//                   hover:shadow-[0_22px_60px_rgba(79,70,229,0.6)]
//                   hover:translate-y-0.5
//                   transition-all duration-300
//                   disabled:opacity-60 disabled:cursor-not-allowed
//                 "
//               >
//                 {submitting ? "Submitting..." : "Submit Feedback"}
//               </button>
//             </form>
//           </div>

//           {/* Recent feedback carousel */}
//           <div className="space-y-3">
//             <h2 className="text-lg font-semibold text-slate-900">
//               Recent Feedback
//             </h2>

//             {loadingList ? (
//               <p className="text-xs text-slate-500">Loading feedback...</p>
//             ) : activeFeedback ? (
//               <div
//                 key={activeFeedback.id}
//                 className="
//                   bg-white rounded-3xl shadow-sm border border-slate-100 
//                   p-5 space-y-3 
//                   animate-[feedbackSlide_0.45s_ease-out]
//                 "
//               >
//                 <div className="flex items-center justify-between gap-3">
//                   <span className="px-3 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700">
//                     {activeFeedback.category}
//                   </span>
//                   <span
//                     className={`
//                       px-3 py-1 rounded-full text-[11px] font-semibold
//                       ${
//                         statusColors[activeFeedback.status] ||
//                         "bg-slate-100 text-slate-700"
//                       }
//                     `}
//                   >
//                     {activeFeedback.status}
//                   </span>
//                 </div>

//                 <p className="text-sm text-slate-700 mt-1">
//                   &quot;{activeFeedback.text}&quot;
//                 </p>

//                 <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
//                   <div className="flex items-center gap-0.5">
//                     {Array.from({ length: 5 }).map((_, idx) => (
//                       <span
//                         key={idx}
//                         className={
//                           activeFeedback.rating > idx
//                             ? "text-amber-400"
//                             : "text-slate-300"
//                         }
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="mx-1">·</span>
//                   <span>{activeFeedback.timeAgo}</span>
//                   <span className="mx-1">·</span>
//                   <span className="font-medium">{activeFeedback.user}</span>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-xs text-slate-500">
//                 No feedback yet. Be the first to submit!
//               </p>
//             )}

//             {/* Dots indicator */}
//             <div className="flex items-center gap-1.5 mt-1">
//               {feedbackList.map((fb, idx) => (
//                 <button
//                   key={fb.id}
//                   onClick={() => setActiveIndex(idx)}
//                   className={`
//                     h-1.5 rounded-full transition-all duration-200
//                     ${
//                       idx === activeIndex
//                         ? "w-5 bg-slate-800"
//                         : "w-2.5 bg-slate-300"
//                     }
//                   `}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </MainLayout>
//   );
// };

// export default Feedback;
