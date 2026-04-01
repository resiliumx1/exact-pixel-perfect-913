import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Tours", to: "/tours" },
  { label: "Taxi Services", to: "/taxi-services" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const solid = scrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-ocean/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-accent text-antigua-gold text-lg lg:text-xl tracking-wide">
              DARYL'S
            </span>
            <span className="font-body text-antigua-white text-[10px] lg:text-xs tracking-[3px] -mt-0.5">
              EXTREME ISLAND TOURS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm font-medium tracking-wide transition-colors relative group ${
                  location.pathname === link.to
                    ? "text-antigua-gold"
                    : "text-antigua-white/80 hover:text-antigua-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-antigua-gold transition-all duration-300 group-hover:w-full w-0" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/book"
            className="hidden lg:block font-accent text-sm gradient-gold-cta text-antigua-black px-6 py-2.5 rounded-lg hover:scale-[1.03] hover:brightness-110 transition-all duration-150 shadow-lg"
          >
            BOOK NOW
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-antigua-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-shadow/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.to}
                  className={`font-body text-2xl font-medium ${
                    location.pathname === link.to
                      ? "text-antigua-gold"
                      : "text-antigua-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
            >
              <Link
                to="/book"
                className="font-accent gradient-gold-cta text-antigua-black px-8 py-3 rounded-lg text-lg mt-4 inline-block"
              >
                BOOK NOW
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 flex flex-col items-center gap-2 text-antigua-white/60 text-sm"
            >
              <a href="https://wa.me/12681234567" className="text-whatsapp">
                📱 WhatsApp: +1 (268) 123-4567
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
