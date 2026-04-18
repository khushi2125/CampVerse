//src/pages/Marketplace.jsx
import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../components/api/client";

const categories = ["All", "Electronics", "Books", "Furniture", "Sports", "Clothing"];

const initialItems = [
  {
    id: 1,
    title: 'MacBook Pro 13" M1',
    category: "Electronics",
    condition: "Like New",
    price: 85000,
    oldPrice: 129900,
    seller: "Arjun Sharma",
    location: "Room 305, Block A",
    posted: "2 hours ago",
    rating: 4.8,
    tags: ["Laptop", "Apple", "Programming"],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Engineering Textbooks Bundle",
    category: "Books",
    condition: "Good",
    price: 3500,
    oldPrice: 8000,
    seller: "Priya Patel",
    location: "Hostel B, Room 211",
    posted: "1 day ago",
    rating: 4.9,
    tags: ["Textbooks", "Engineering", "Mechanical"],
    image: "https://images.unsplash.com/photo-1725869973689-425c74f79a48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGV4dGJvb2slMjBidW5kbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Gaming Chair",
    category: "Furniture",
    condition: "Good",
    price: 12000,
    oldPrice: 18000,
    seller: "Rohit Mehta",
    location: "Off‑campus Apartment",
    posted: "3 days ago",
    rating: 4.6,
    tags: ["Gaming", "Chair", "Furniture"],
    image: "https://images.unsplash.com/photo-1598550468793-d6306cd481c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbWluZyUyMGNoYWlyfGVufDB8fDB8fHww",
  },
];

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [highlightId, setHighlightId] = useState(null);

  // Sell form fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Electronics");
  const [formCondition, setFormCondition] = useState("Good");
  const [formPrice, setFormPrice] = useState("");
  const [formSeller, setFormSeller] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formImage, setFormImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/api/marketplace/");
        const apiItems = res.data.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category || "Electronics",
          condition: item.condition || "Good",
          price: item.price,
          oldPrice: item.old_price,
          seller: item.seller_name || "Anonymous Seller",
          sellerEmail: item.seller_email || "",
          location: item.location || "Campus",
          posted: item.posted || "Just now",
          rating: 4.5,
          tags: item.tags ? (typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()) : item.tags) : [],
          image: item.image || "/images/market-placeholder.jpg",
        }));
        setItems(apiItems);
      } catch (err) {
        console.error("Error fetching marketplace items", err);
        // Fallback to initial items if API fails
        setItems(initialItems);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!highlightId) return;
    const t = setTimeout(() => setHighlightId(null), 600);
    return () => clearTimeout(t);
  }, [highlightId]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchCat = activeCategory === "All" || it.category === activeCategory;
      const q = query.toLowerCase();
      const matchText =
        it.title.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q) ||
        it.seller.toLowerCase().includes(q) ||
        it.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [items, activeCategory, query]);

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPrice) return;

    try {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('title', formTitle.trim());
      formData.append('description', "Excellent option for campus use. Perfect for students.");
      formData.append('category', formCategory);
      formData.append('condition', formCondition);
      formData.append('price', Number(formPrice));
      formData.append('old_price', null);
      formData.append('location', formLocation || "Campus");
      if (formImage) {
        formData.append('image', formImage);
      }
      formData.append('tags', formTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean).join(", "));

      const res = await api.post("/api/marketplace/", formData);
      const newItem = {
        id: res.data.id,
        title: res.data.title,
        category: res.data.category || "Electronics",
        condition: res.data.condition || "Good",
        price: res.data.price,
        oldPrice: res.data.old_price,
        seller: res.data.seller_name || formSeller || "Anonymous Seller",
        sellerEmail: res.data.seller_email || "",
        location: res.data.location || "Campus",
        posted: "Just now",
        rating: 4.5,
        tags: res.data.tags ? (typeof res.data.tags === 'string' ? res.data.tags.split(',').map(t => t.trim()) : res.data.tags) : [],
        image: res.data.image || "/images/market-placeholder.jpg",
      };

      setItems((prev) => [newItem, ...prev]);
      setHighlightId(newItem.id);
      setShowForm(false);

      setFormTitle("");
      setFormPrice("");
      setFormSeller("");
      setFormLocation("");
      setFormTags("");
      setFormCategory("Electronics");
      setFormCondition("Good");
      setFormImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error creating marketplace item", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = err.response?.data 
        ? JSON.stringify(err.response.data)
        : "Failed to post item. Please try again.";
      alert(`Error: ${errorMsg}`);
    }
  };

  return (
    <MainLayout>
      {loading ? (
        <div className="max-w-6xl mx-auto py-10 text-center text-sm text-slate-600">
          Loading marketplace items...
        </div>
      ) : (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Campus Marketplace
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Your campus OLX – Buy and sell second‑hand items within your student community safely and easily.
          </p>
        </header>

        {/* Search + controls */}
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, books, electronics..."
              className="
                w-full pl-9 pr-3 py-2.5 rounded-full 
                border border-slate-200 bg-white
                text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500/70
              "
            />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="
              px-4 py-2.5 rounded-full 
              bg-emerald-500 text-white text-sm font-semibold
              shadow-sm shadow-emerald-300/60
              hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-400/80
              transition-all duration-200
            "
          >
            + Sell Item
          </button>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 border border-slate-200 bg-slate-50 rounded-full px-2 py-1 text-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex-1 md:flex-none px-4 py-1.5 rounded-full font-medium
                transition-all duration-200
                ${
                  activeCategory === cat
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className={`
                bg-white rounded-3xl border border-slate-100 
                shadow-sm overflow-hidden flex flex-col
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/90
                ${
                  highlightId === item.id
                    ? "ring-2 ring-emerald-400 animate-[noticePop_0.4s_ease-out]"
                    : ""
                }
              `}
            >
              {/* Image area */}
              <div className="relative h-44 bg-slate-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    <div className="text-center text-slate-400">
                      <span className="text-4xl">📷</span>
                      <p className="text-xs mt-2 font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
                <span className="absolute left-3 top-3 px-3 py-1 rounded-full text-[11px] bg-slate-900/70 text-white">
                  {item.category}
                </span>
                {item.condition && (
                  <span
                    className="
                      absolute right-3 top-3 px-3 py-1 rounded-full text-[11px] font-semibold 
                      bg-emerald-500 text-white
                    "
                  >
                    {item.condition}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                    Excellent option for campus use. Perfect for students.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-emerald-600">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.oldPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold">Seller:</span> {item.seller}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold">Location:</span> {item.location}
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="font-semibold">Posted:</span> {item.posted}
                  </p>
                </div>

                {/* Tags */}
                {item.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent(`Buy: ${item.title}`);
                      const body = encodeURIComponent(`Hi, I would like to buy your ${item.title} for ₹${item.price}. Please let me know the next steps.`);
                      window.location.href = `mailto:${item.sellerEmail}?subject=${subject}&body=${body}`;
                    }}
                    className="
                      w-full px-3 py-2 rounded-full 
                      bg-blue-600 text-white text-xs font-semibold 
                      hover:bg-blue-700
                    "
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="text-xs text-slate-500">No items found. Try another search.</p>
        )}

        {/* Sell Item modal */}
        {showForm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 animate-[noticeFormIn_0.35s_ease-out]">
              <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Sell an Item
                  </h2>
                  <p className="text-xs text-slate-500">
                    Add item details to list it on Campus Marketplace.
                  </p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSellSubmit} className="px-5 py-4 space-y-3 text-sm">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Item title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Scientific Calculator, Bicycle"
                    className="
                      w-full px-3 py-2 rounded-xl 
                      border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                    "
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Item Image
                  </label>
                  <div className="flex items-center gap-3">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-lg border border-slate-200"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormImage(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="
                        flex-1 px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        text-xs
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/80
                      "
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                      "
                    >
                      {categories
                        .filter((c) => c !== "All")
                        .map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Condition
                    </label>
                    <select
                      value={formCondition}
                      onChange={(e) => setFormCondition(e.target.value)}
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                      "
                    >
                      <option>Like New</option>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="
                      w-full px-3 py-2 rounded-xl 
                      border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                    "
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Seller name
                    </label>
                    <input
                      type="text"
                      value={formSeller}
                      onChange={(e) => setFormSeller(e.target.value)}
                      placeholder="Your name"
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                      "
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Hostel C, Room 108"
                      className="
                        w-full px-3 py-2 rounded-xl 
                        border border-slate-200 bg-slate-50
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                      "
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="e.g. Laptop, Apple, 256GB"
                    className="
                      w-full px-3 py-2 rounded-xl 
                      border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:bg-white
                    "
                  />
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
                      bg-emerald-500 text-xs font-semibold text-white
                      shadow-sm shadow-emerald-300/70
                      hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-400/80
                      transition-all duration-200
                    "
                  >
                    Post Item
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

export default Marketplace;
