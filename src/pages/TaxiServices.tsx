import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Plane, MapPin, Clock, Smartphone, Users } from "lucide-react";

import taxiHero from "@/assets/taxi-hero.jpg";
import FlagVShape from "@/components/antiguan/FlagVShape";
import AntiguaFlagBadge from "@/components/antiguan/AntiguaFlagBadge";
import FlagStripe from "@/components/antiguan/FlagStripe";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
};

const services = [
  { icon: Plane, title: "Airport Transfers", desc: "V.C. Bird International ↔ anywhere on island. Fixed pricing with pickup sign service." },
  { icon: MapPin, title: "Point-to-Point", desc: "Any location to any location. On-demand or scheduled for your convenience." },
  { icon: Clock, title: "Hourly Hire", desc: "Book the taxi by the hour for shopping, errands, or custom exploration." },
];

const routes = [
  { from: "V.C. Bird Airport", to: "Jolly Harbour", vehicle: "Taxi", price: 35 },
  { from: "V.C. Bird Airport", to: "English Harbour", vehicle: "Taxi", price: 45 },
  { from: "V.C. Bird Airport", to: "St. John's", vehicle: "Taxi", price: 20 },
  { from: "V.C. Bird Airport", to: "Dickenson Bay", vehicle: "Taxi", price: 18 },
  { from: "V.C. Bird Airport", to: "Falmouth Harbour", vehicle: "Taxi", price: 42 },
  { from: "St. John's", to: "English Harbour", vehicle: "Taxi", price: 35 },
  { from: "Jolly Harbour", to: "St. John's", vehicle: "Taxi", price: 25 },
  { from: "Any Route", to: "Any Destination", vehicle: "Coaster Bus", price: 120 },
];

const TaxiServices = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleQuote = () => {
    const msg = encodeURIComponent(
      `Hi Daryl! I need a taxi from ${pickup || "[Pickup]"} to ${dropoff || "[Destination]"} on ${date || "[Date]"} at ${time || "[Time]"} for ${passengers} passenger(s). How much would that cost?`
    );
    window.open(`https://wa.me/12681234567?text=${msg}`, "_blank");
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <FlagStripe />
        <img src={taxiHero} alt="Antigua taxi service at V.C. Bird Airport" className="absolute inset-0 w-full h-full object-cover" width={1920} height={600} />
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/70 via-shadow/40 to-shadow/60" />
        <div className="relative z-10 text-center px-4">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span>
            <span className="text-antigua-white/80">Taxi Services</span>
          </nav>
          <h1 className="text-antigua-white">Reliable Taxi & Transfer Services</h1>
          <p className="text-antigua-white/70 font-body mt-3 max-w-lg mx-auto">
            Airport transfers, point-to-point rides, and hourly hire — professional, punctual, and affordable.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 lg:py-20 bg-sand">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="bg-background rounded-xl p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-200">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-antigua-gold/15 border border-antigua-gold/30 flex items-center justify-center">
                    <s.icon className="text-antigua-gold" size={28} />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center mb-10 text-foreground">Fixed Route Pricing</h2>
          </FadeIn>
          {/* Desktop Table */}
          <FadeIn delay={0.1}>
            <div className="hidden md:block overflow-hidden rounded-xl border border-mist">
              <table className="w-full">
                <thead>
                  <tr className="bg-ocean text-antigua-white relative">
                    {/* V-shape pattern in header */}
                    <th colSpan={5} className="h-0 p-0 relative">
                      <FlagVShape variant="outline" opacity={0.08} className="text-antigua-white" />
                    </th>
                  </tr>
                  <tr className="bg-ocean text-antigua-white">
                    <th className="px-6 py-3 text-left text-sm font-body font-semibold">Route</th>
                    <th className="px-6 py-3 text-left text-sm font-body font-semibold">Destination</th>
                    <th className="px-6 py-3 text-left text-sm font-body font-semibold">Vehicle</th>
                    <th className="px-6 py-3 text-left text-sm font-body font-semibold">Price (USD)</th>
                    <th className="px-6 py-3 text-sm font-body font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-sand" : "bg-background"}>
                      <td className="px-6 py-3.5 text-sm font-body text-foreground">{r.from}</td>
                      <td className="px-6 py-3.5 text-sm font-body text-foreground">{r.to}</td>
                      <td className="px-6 py-3.5 text-sm font-body text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          {r.vehicle}
                          {r.vehicle === "Coaster Bus" && <AntiguaFlagBadge variant="compact" className="text-[9px] px-2 py-0.5" />}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm font-body font-semibold text-antigua-gold">${r.price}</td>
                      <td className="px-6 py-3.5 text-right">
                        <Link to="/book" className="text-xs font-body font-semibold text-antigua-blue hover:underline">Book →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {routes.map((r, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="bg-card rounded-xl border border-mist p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground">{r.from}</p>
                      <p className="text-xs text-muted-foreground font-body">→ {r.to}</p>
                    </div>
                    <span className="text-lg font-display font-bold text-antigua-gold">${r.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-body">{r.vehicle}</span>
                    <Link to="/book" className="text-xs font-body font-semibold text-antigua-blue">Book →</Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quote Form */}
      <section className="py-16 lg:py-20 bg-shadow">
        <div className="container mx-auto px-4 max-w-2xl">
          <FadeIn>
            <h2 className="text-antigua-white text-center mb-8">Get a Quick Quote</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-antigua-white/5 border border-antigua-white/10 rounded-xl p-6 lg:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-antigua-white/70 text-sm font-body mb-1">Pickup Location</label>
                  <input value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full bg-antigua-white/10 border border-antigua-white/20 rounded-lg px-4 py-2.5 text-antigua-white font-body text-sm placeholder:text-antigua-white/30 focus:outline-none focus:border-antigua-gold transition-colors" placeholder="e.g. V.C. Bird Airport" />
                </div>
                <div>
                  <label className="block text-antigua-white/70 text-sm font-body mb-1">Drop-off Location</label>
                  <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="w-full bg-antigua-white/10 border border-antigua-white/20 rounded-lg px-4 py-2.5 text-antigua-white font-body text-sm placeholder:text-antigua-white/30 focus:outline-none focus:border-antigua-gold transition-colors" placeholder="e.g. Jolly Harbour" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-antigua-white/70 text-sm font-body mb-1">Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-antigua-white/10 border border-antigua-white/20 rounded-lg px-4 py-2.5 text-antigua-white font-body text-sm focus:outline-none focus:border-antigua-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-antigua-white/70 text-sm font-body mb-1">Time</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-antigua-white/10 border border-antigua-white/20 rounded-lg px-4 py-2.5 text-antigua-white font-body text-sm focus:outline-none focus:border-antigua-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-antigua-white/70 text-sm font-body mb-1">Passengers</label>
                  <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full bg-antigua-white/10 border border-antigua-white/20 rounded-lg px-4 py-2.5 text-antigua-white font-body text-sm focus:outline-none focus:border-antigua-gold transition-colors">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="text-antigua-black">{n}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleQuote} className="w-full gradient-gold-cta text-antigua-black font-accent py-3 rounded-lg cta-glow-gold text-sm flex items-center justify-center gap-2">
                <Smartphone size={16} />
                GET QUOTE VIA WHATSAPP
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Antigua Taxi & Transfer Services",
            description: "Airport transfers, point-to-point rides, and hourly hire in Antigua & Barbuda. Professional, punctual, and affordable.",
            url: "https://exact-pixel-perfect-913.lovable.app/taxi-services",
            provider: {
              "@type": "LocalBusiness",
              name: "Daryl's Extreme Island Tours",
              telephone: "+12681234567",
            },
            areaServed: { "@type": "Country", name: "Antigua and Barbuda" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Taxi Routes",
              itemListElement: routes.map((r) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: `${r.from} → ${r.to}` },
                price: r.price.toString(),
                priceCurrency: "USD",
              })),
            },
          }),
        }}
      />
    </main>
  );
};

export default TaxiServices;
