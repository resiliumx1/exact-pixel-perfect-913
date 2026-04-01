import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import AntiguaSunIcon from "@/components/antiguan/AntiguaSunIcon";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-ocean relative overflow-hidden">
      {/* Horizon line */}
      <div className="absolute bottom-[35%] left-0 right-0 h-px bg-antigua-gold/30" />
      {/* Water */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-antigua-blue/40 to-ocean/80" />

      <div className="text-center relative z-10">
        {/* Setting sun */}
        <div className="mb-6 flex justify-center animate-sun-set">
          <AntiguaSunIcon size={80} className="text-antigua-gold" pulsing />
        </div>
        <h1 className="mb-3 text-antigua-white font-display text-5xl">404</h1>
        <p className="mb-2 text-xl text-antigua-white/80 font-body">
          You've sailed off the map! 🌊
        </p>
        <p className="mb-8 text-antigua-white/50 font-body text-sm">
          This page doesn't exist — but the adventure continues.
        </p>
        <Link
          to="/"
          className="gradient-gold-cta text-antigua-black font-accent px-8 py-3 rounded-lg hover:scale-[1.03] hover:brightness-110 transition-all shadow-lg text-sm inline-block"
        >
          BACK TO SHORE →
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
