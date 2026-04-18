//src/components/CampusGallery.jsx
import { useEffect, useState } from "react";
const slides = [
  {
    id: 1,
    title: "University Library",
    subtitle: "State-of-the-art library with modern study spaces",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Student Courtyard",
    subtitle: "Collaborative outdoor space for group study & hangouts",
    image: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcHVzfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Lecture Hall",
    subtitle: "Interactive lectures with modern AV facilities",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CampusGallery = () => {
  const [active, setActive] = useState(1);

  // auto-change after 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev === slides.length ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActive((prev) => (prev === 1 ? slides.length : prev - 1));
  };

  const goNext = () => {
    setActive((prev) => (prev === slides.length ? 1 : prev + 1));
  };

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700">
            Campus Life Gallery
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Discover the vibrant campus life through stunning visuals of our
            university.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-3 gap-4">
          {slides.map((slide) => {
            const isActive = slide.id === active;
            return (
              <div
                key={slide.id}
                className={`
                  relative overflow-hidden rounded-3xl 
                  bg-white/20 backdrop-blur-xl 
                  border border-white/40 
                  shadow-[0_18px_45px_rgba(15,23,42,0.18)]
                  cursor-pointer group
                  transition-all duration-500 ease-out
                  ${isActive ? "scale-[1.02] shadow-[0_24px_60px_rgba(15,23,42,0.25)]" : "scale-95 opacity-80"}
                `}
                onClick={() => setActive(slide.id)}
              >
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`
                    w-full h-64 object-cover 
                    transition-transform duration-700 ease-out
                    group-hover:scale-110
                  `}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-100/90 mt-1">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Left/right arrows only on active */}
                {isActive && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      className="
                        absolute left-3 top-1/2 -translate-y-1/2
                        h-9 w-9 rounded-full 
                        bg-white/80 text-slate-700 
                        flex items-center justify-center text-sm
                        shadow-md hover:bg-white
                        transition-all duration-200
                      "
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="
                        absolute right-3 top-1/2 -translate-y-1/2
                        h-9 w-9 rounded-full 
                        bg-white/80 text-slate-700 
                        flex items-center justify-center text-sm
                        shadow-md hover:bg-white
                        transition-all duration-200
                      "
                    >
                      →
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats row under gallery */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 pt-4">
          {[
            { label: "Campus Events", value: "500+" },
            { label: "Happy Students", value: "1000+" },
            { label: "Campus Facilities", value: "50+" },
            { label: "Campus Access", value: "24/7" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="
                text-center py-4 rounded-2xl 
                bg-white/10 backdrop-blur-xl 
                border border-purple-100/70 
                shadow-sm shadow-purple-200/70
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-300
              "
            >
              <p className="text-2xl md:text-3xl font-bold text-purple-700">
                {stat.value}
              </p>
              <p className="text-xs text-slate-700 mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusGallery;
