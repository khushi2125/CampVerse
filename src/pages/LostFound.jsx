//src/pages/LostFound.jsx
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../components/api/client";

const LostFound = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/lostfound/');
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = items.filter((it) => {
    const matchText =
      it.title.toLowerCase().includes(query.toLowerCase()) ||
      (it.description || "").toLowerCase().includes(query.toLowerCase()) ||
      (it.location || "").toLowerCase().includes(query.toLowerCase());

    const matchStatus =
      statusFilter === "All" ? true : it.status === statusFilter;

    return matchText && matchStatus;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem = {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      contact_info: formData.get("email"),
      status: "Lost",
      date: new Date().toISOString().split('T')[0],
    };
    if (!newItem.title) return;
    try {
      await api.post('/api/lostfound/', newItem);
      fetchItems();
      e.currentTarget.reset();
    } catch (err) {
      console.error("Error posting item:", err);
    }
  };

  const handleContact = (item) => {
    if (item.contact_info) {
      window.location.href = `mailto:${item.contact_info}`;
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this lost/found item?")) return;
    try {
      await api.delete(`/api/lostfound/${itemId}/`);
      setItems((prev) => prev.filter((it) => it.id !== itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className={`
          transition-all duration-700 ease-out
          ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 scale-[0.99] blur-[1px]"
          }
        `}
      >
        <div className="rounded-[32px] bg-gradient-to-br from-slate-50 via-white to-sky-50 shadow-[0_30px_80px_rgba(15,23,42,0.12)] border border-slate-100/70 px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-indigo-400">
                Campus Utility
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Lost &amp; Found
              </h1>
              <p className="text-sm md:text-base text-slate-500 mt-2 max-w-xl">
                Report lost items, browse found belongings, and help keep your
                campus connected.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: "Total Listings",
                value: items.length,
                color: "from-violet-500 to-indigo-500",
                icon: "📦",
              },
              {
                label: "Lost Items",
                value: items.filter((i) => i.status === "Lost").length,
                color: "from-rose-500 to-orange-500",
                icon: "❓",
              },
              {
                label: "Found Items",
                value: items.filter((i) => i.status === "Found").length,
                color: "from-emerald-500 to-sky-500",
                icon: "📍",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl bg-white/90 border border-slate-100 shadow-[0_18px_40px_rgba(15,23,42,0.06)] px-4 py-4 flex items-center gap-3"
              >
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center text-lg text-white bg-gradient-to-br ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-6 items-start">
            <section className="bg-white/95 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-5 md:p-6 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-sm font-semibold text-slate-900">+ Report Item</p>
                  <p className="text-xs text-slate-500">Create a new lost or found listing</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-violet-50 text-violet-600">Instant</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Item Title</label>
                  <input name="title" type="text" placeholder="e.g., Blue Notebook" className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Description</label>
                  <textarea name="description" rows={3} placeholder="Describe the item..." className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Location</label>
                  <input name="location" type="text" placeholder="Where was it lost/found?" className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Contact Email</label>
                  <input name="email" type="email" placeholder="your.email@college.edu" className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60" required />
                </div>
                <button type="submit" className="w-full mt-2 py-2.5 rounded-2xl bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 text-white text-sm font-semibold shadow-[0_16px_40px_rgba(79,70,229,0.45)] hover:shadow-[0_22px_55px_rgba(79,70,229,0.65)] transition-all">
                  Post Item
                </button>
              </form>
            </section>

            <section className="bg-white/95 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-5 md:p-6 space-y-4">
              <div className="flex flex-col md:flex-row items-stretch gap-3 mb-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input type="text" placeholder="Search by item, place, or description..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/60">
                  <option value="All">All</option>
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {filtered.map((it) => (
                  <article key={it.id} className="bg-white rounded-2xl border border-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.04)] px-4 py-4 md:px-5 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] hover:border-indigo-100">
                    <div className="space-y-1">
                      <h3 className="text-sm md:text-base font-semibold text-slate-900">{it.title}</h3>
                      <p className="text-xs md:text-sm text-slate-600">{it.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1">📍 {it.location}</span>
                        <span className="flex items-center gap-1">📅 {it.date}</span>
                      </div>
                    </div>
                    <div className="flex items-end md:items-center gap-3 md:flex-col">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-semibold ${it.status === "Lost" ? "bg-gradient-to-r from-rose-500/10 to-rose-500/25 text-rose-700" : "bg-gradient-to-r from-emerald-500/10 to-emerald-500/25 text-emerald-700"}`}>
                        {it.status}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => handleContact(it)} className="px-4 py-2 rounded-xl border border-slate-200 text-xs md:text-sm font-medium text-slate-700 bg-slate-50/80 hover:bg-slate-100 transition-all">
                          Contact
                        </button>
                        <button onClick={() => handleDelete(it.id)} className="px-4 py-2 rounded-xl border border-rose-200 text-xs md:text-sm font-medium text-rose-600 bg-rose-50/70 hover:bg-rose-100 transition-all">
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                {filtered.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-6">No items match your search yet.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LostFound;
