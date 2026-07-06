import { useNavigate } from "react-router-dom";

/**
 * Navbar
 *
 * Props:
 *   onNavClick (optional) — called with a section id string when the user clicks
 *                           one of the three scroll-nav buttons. When not provided
 *                           the buttons are hidden so interior pages are unaffected.
 */
export default function Navbar({ onNavClick }) {
  const navigate = useNavigate();

  const navButtons = [
    { label: "Solar System", id: "solar-system" },
    { label: "Black Hole",   id: "black-hole"   },
    { label: "Supernova",    id: "supernova"     },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 bg-transparent">
      <div className="flex items-center justify-between px-6 py-3">

        {/* ── Left: Site Title ──────────────────────────────────────── */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl md:text-4xl font-bold text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-105"
          style={{ textShadow: "0 0 1px #fbbf24, 0 0 8px #fbbf24" }}
        >
          HELIOSPHERE
        </h1>

        {/* ── Right: Scroll-nav buttons (home page only) ────────────── */}
        {onNavClick && (
          <div className="flex items-center gap-3">
            {navButtons.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => onNavClick(id)}
                className="px-4 py-1.5 text-sm md:text-base font-bold text-yellow-300 border border-yellow-400/50 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:bg-yellow-400/20 hover:text-yellow-200 hover:border-yellow-300 hover:scale-105"
                style={{ textShadow: "0 0 4px #fbbf24" }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}