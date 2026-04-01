import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import WaveDivider from "./antiguan/WaveDivider";
import AntiguaFlagBadge from "./antiguan/AntiguaFlagBadge";
import FlagVShape from "./antiguan/FlagVShape";

const Footer = () => {
  return (
    <footer className="relative bg-antigua-black text-antigua-white/80">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <WaveDivider fill="hsl(0 0% 4%)" />
      </div>

      {/* V-shape watermark */}
      <FlagVShape variant="outline" opacity={0.03} className="text-antigua-gold" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-accent text-antigua-gold text-xl block">DARYL'S</span>
              <span className="font-body text-[10px] tracking-[3px] text-antigua-white/60">
                EXTREME ISLAND TOURS
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-antigua-white/60">
              Your trusted partner for unforgettable island tours and reliable taxi services in Antigua & Barbuda.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-antigua-white/20 flex items-center justify-center hover:border-antigua-gold hover:text-antigua-gold transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-body font-semibold text-antigua-white mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Tours", "Taxi Services", "About", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-antigua-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-body font-semibold text-antigua-white mb-4 text-sm tracking-wider uppercase">
              Popular Tours
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Full Island Tour", "Beach Hopper", "Airport Transfer", "Custom Private Tour"].map(
                (item) => (
                  <li key={item}>
                    <Link to="/tours" className="hover:text-antigua-gold transition-colors">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-body font-semibold text-antigua-white mb-4 text-sm tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-antigua-gold flex-shrink-0" />
                <a href="tel:+12681234567" className="hover:text-antigua-gold transition-colors">
                  +1 (268) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-antigua-gold flex-shrink-0" />
                <a href="mailto:info@darylstours.com" className="hover:text-antigua-gold transition-colors">
                  info@darylstours.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-antigua-gold flex-shrink-0 mt-0.5" />
                <span>St. John's, Antigua & Barbuda</span>
              </li>
            </ul>
            <div className="mt-4">
              <AntiguaFlagBadge variant="full" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-antigua-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-antigua-white/40">
          <span>© {new Date().getFullYear()} Daryl's Extreme Island Tours. All rights reserved. 🇦🇬</span>
          <span>Website by NHD</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
