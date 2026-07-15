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
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false); // Close menu on click
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

        {/* ── Right: Desktop Nav buttons ── */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* ── Mobile Hamburger Icon ── */}
        <button 
          className="md:hidden relative z-10 text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>
    </nav>

    {/* ── Mobile Menu Overlay ── */}
    {menuOpen && (
      <div className="fixed inset-0 z-[45] bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden">
        {navButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleNavClick(btn)}
            className="text-3xl font-bold text-white transition-all hover:text-amber-400"
            style={{ textShadow: "0 0 4px #fbbf24" }}
          >
            {btn.label}
          </button>
        ))}
        <button
          onClick={() => {
            setShowSuggestions(true);
            setMenuOpen(false);
          }}
          className="text-3xl font-bold text-amber-400 border border-amber-400 rounded-lg px-6 py-2 mt-4 hover:bg-amber-400 hover:text-black transition-colors"
        >
          Suggestions
        </button>
      </div>
    )}
    {showSuggestions && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <SuggestionsForm onClose={() => setShowSuggestions(false)} />
      </div>
    )}
    </>
  );
}