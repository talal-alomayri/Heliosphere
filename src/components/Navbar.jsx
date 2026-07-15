import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SuggestionsForm from "./SuggestionsForm";

/**
 * Global Navbar — rendered once in App.jsx, visible on every page.
 *
 * Behaviour:
 *   • On the home page ("/"):  nav buttons smooth-scroll to the named sections.
 *   • On any other page:       nav buttons navigate() to the dedicated route.
 *
 * No props needed — the component reads the current route from useLocation().
 */
export default function Navbar() {
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navButtons = [
    { label: "Solar System", id: "solar-system", route: "/SolarSystemCategories" },
    { label: "Black Hole",   id: "black-hole",   route: "/blackHoleInfoPage"      },
    { label: "Supernova",    id: "supernova",     route: "/supernovaInfoPage"      },
  ];

  const handleNavClick = ({ id, route }) => {
    if (isHome) {
      // Smooth-scroll to the section on the home page
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(route);
    }
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">

      {/* ── Faint baseline ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-0" />

      <div className="flex items-center justify-between px-6 py-3">

        {/* ── Left: Site Title ── */}
        <h1
          onClick={() => navigate("/")}
          className="relative z-10
                     text-3xl md:text-5xl font-bold text-white cursor-pointer
                     transition-all duration-300 hover:scale-105
                     border-b border-transparent hover:border-white
                     pb-[1px] -mb-[1px]"
          style={{ textShadow: "0 0 1px #fbbf24, 0 0 8px #fbbf24" }}
        >
          HELIOSPHERE
        </h1>

        {/* ── Right: Nav buttons — always visible ── */}
        <div className="flex items-center gap-3">
          {navButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleNavClick(btn)}
              className="relative z-10
                         px-4 py-1.5 text-lg md:text-2xl text-white
                         transition-all duration-300 hover:scale-105
                         border-b border-transparent hover:border-white
                         pb-[1px] -mb-[1px]"
              style={{ textShadow: "0 0 4px #fbbf24" }}
            >
              {btn.label}
            </button>
          ))}
          <button
            onClick={() => setShowSuggestions(true)}
            className="relative z-10
                       px-4 py-1.5 text-lg md:text-2xl text-white
                       transition-all duration-300 hover:scale-105
                       border-b border-transparent hover:border-white
                       pb-[1px] -mb-[1px]"
            style={{ textShadow: "0 0 4px #fbbf24" }}
          >
            Suggestions
          </button>
        </div>

      </div>
    </nav>
    {showSuggestions && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <SuggestionsForm onClose={() => setShowSuggestions(false)} />
      </div>
    )}
    </>
  );
}