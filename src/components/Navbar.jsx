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
    /*
     * <nav> is now position:relative with NO border-b.
     * A thin absolute div acts as the persistent faint baseline.
     * Interactive elements overlay it with a bright white border on hover.
     */
    <nav className="w-full fixed top-0 z-50 bg-transparent relative">

      {/* ── Faint baseline — sits at the very bottom of the nav bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-0" />

      <div className="flex items-center justify-between px-6 py-3">

        {/* ── Left: Site Title ──────────────────────────────────────── */}
        {/*
          relative z-10     → sits above the baseline div so the hover border
                               covers (masks) the faint line beneath it.
          border-b           → space for the border is always reserved — no jump.
          border-transparent → invisible at rest.
          hover:border-white → bright white snaps in on hover, overlaying baseline.
          pb-[1px] -mb-[1px] → pulls the element's bottom edge flush with the
                               nav's bottom so the border overlaps the baseline.
        */}
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

        {/* ── Right: Scroll-nav buttons (home page only) ────────────── */}
        {onNavClick && (
          <div className="flex items-center gap-3">
            {navButtons.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => onNavClick(id)}
                // Same overlay technique — bright segment lights up the baseline
                className="relative z-10
                           px-4 py-1.5 text-lg md:text-2xl text-white
                           transition-all duration-300 hover:scale-105
                           border-b border-transparent hover:border-white
                           pb-[1px] -mb-[1px]"
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