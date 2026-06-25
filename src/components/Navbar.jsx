import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed top-0 z-50 bg-transparent border-b border-white">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: Title */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl md:text-5xl font-bold text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            textShadow: "0 0 1px #fbbf24, 0 0 6px #fbbf24"
          }}
        >
          HELIOSPHERE
        </h1>

        {/* Right: Language Switcher */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] border-2 border-yellow-400 text-yellow-400 font-bold transition-all duration-300 hover:bg-[#3b82f6] hover:scale-105">
          AR/EN
        </button>
      </div>
    </nav>
  );
}