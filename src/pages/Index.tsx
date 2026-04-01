import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Award, Smartphone, Map, DollarSign, Clock, Shield, Bus, Car, Camera } from "lucide-react";

import heroImg from "@/assets/hero-antigua.jpg";
import tourIsland from "@/assets/tour-island.jpg";
import tourBeach from "@/assets/tour-beach.jpg";
import tourHistorical from "@/assets/tour-historical.jpg";
import tourSunset from "@/assets/tour-sunset.jpg";
import fleetImg from "@/assets/fleet.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

import AntiguaSunIcon from "@/components/antiguan/AntiguaSunIcon";
import FlagVShape from "@/components/antiguan/FlagVShape";
import SectionDividerSun from "@/components/antiguan/SectionDividerSun";
import WaveDivider from "@/components/antiguan/WaveDivider";
import SunRating from "@/components/antiguan/SunRating";
import AntiguaFlagBadge from "@/components/antiguan/AntiguaFlagBadge";
import FlagStripe from "@/components/antiguan/FlagStripe";
import FadeIn from "@/components/FadeIn";

/* ── Counter ── */
const Counter = ({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(ease * end));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      {icon && <span className="text-2xl mb-1 block">{icon}</span>}
      <span className="text-4xl lg:text-5xl font-display font-bold text-ocean">
        {val.toLocaleString()}{suffix}
      </span>
      <p className="text-sm mt-1 text-charcoal/70 font-body">{label}</p>
    </div>
  );
};

/* ── Tour Card ── */
const tours = [
  { title: "Full Island Tour", img: tourIsland, price: "$85", duration: "6 Hours", aspect: "row-span-2" },
  { title: "Beach Hopper", img: tourBeach, price: "$65", duration: "4 Hours", aspect: "" },
  { title: "Historical Antigua", img: tourHistorical, price: "$75", duration: "5 Hours", aspect: "" },
  { title: "Sunset Cruise", img: tourSunset, price: "$95", duration: "3 Hours", aspect: "" },
];

const TourCard = ({ tour, i }: { tour: typeof tours[0]; i: number }) => (
  <FadeIn delay={i * 0.08} className={`group relative overflow-hidden rounded-xl ${tour.aspect}`}>
    <img
      src={tour.img}
      alt={tour.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      width={800}
      height={i === 0 ? 1000 : 600}
    />
    {/* Price badge */}
    <span className="absolute top-4 right-4 gradient-gold-cta text-antigua-black font-accent text-xs px-3 py-1 rounded-full">
      From {tour.price}
    </span>
    {/* Duration badge */}
    <span className="absolute bottom-4 left-4 bg-antigua-blue/90 text-antigua-white text-xs px-3 py-1 rounded-full font-body z-10">
      ⏱ {tour.duration}
    </span>
    {/* Flag badge */}
    <div className="absolute top-4 left-4 z-10">
      <AntiguaFlagBadge variant="compact" className="bg-antigua-black/60 backdrop-blur-sm border-antigua-gold/20" />
    </div>
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-antigua-black/80 via-antigua-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
      <div>
        <h3 className="text-antigua-white text-xl mb-2">{tour.title}</h3>
        <Link to="/tours" className="text-antigua-gold text-sm font-body font-semibold hover:underline">
          Explore Antigua ☀️ →
        </Link>
      </div>
    </div>
  </FadeIn>
);

/* ── Testimonials ── */
const testimonials = [
  { quote: "Daryl made our Antigua trip absolutely unforgettable. His knowledge of the island's hidden gems is unmatched!", name: "Sarah Thompson", country: "🇬🇧", tour: "Full Island Tour", stars: 5 },
  { quote: "Best tour experience we've ever had! Professional, punctual, and so much fun. Highly recommend to anyone visiting Antigua.", name: "James Mitchell", country: "🇺🇸", tour: "Beach Hopper", stars: 5 },
  { quote: "From airport pickup to the final goodbye, everything was perfect. Daryl is a true ambassador for Antigua.", name: "Marie Dubois", country: "🇨🇦", tour: "Sunset Cruise", stars: 5 },
  { quote: "Wir hatten eine fantastische Zeit! Daryl kennt jeden Winkel der Insel. Absolut empfehlenswert!", name: "Hans Weber", country: "🇩🇪", tour: "Historical Antigua", stars: 5 },
];

const features = [
  { icon: Map, title: "Local Expert", desc: "Born and raised in Antigua. Daryl knows every hidden beach, every local secret." },
  { icon: DollarSign, title: "Fair Pricing", desc: "Transparent pricing with no hidden fees. What you see is what you pay." },
  { icon: Clock, title: "Always On Time", desc: "Airport pickups, tour starts — we're there before you are." },
  { icon: Shield, title: "Safe & Licensed", desc: "Fully licensed, insured, and professionally maintained vehicles." },
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Index = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[testimonialIdx];

  return (
    <main>
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <FlagStripe />
        <img
          src={heroImg}
          alt="Aerial view of Antigua coastline"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/80 via-shadow/40 to-transparent" />

        {/* V-shape overlay */}
        <FlagVShape variant="gradient" opacity={0.08} />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <FadeIn>
            <span className="inline-flex items-center gap-2 font-body font-semibold text-antigua-gold text-xs tracking-[3px] mb-6">
              <svg viewBox="0 0 20 12" width="20" height="12" aria-hidden="true">
                <rect width="20" height="4" y="0" fill="#CE1126" />
                <rect width="20" height="4" y="4" fill="#0A0A0A" />
                <rect width="20" height="4" y="8" fill="#0072C6" />
              </svg>
              ANTIGUA'S PREMIER TOUR EXPERIENCE
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="text-hero text-antigua-white mb-6">
              <span className="block">Discover Antigua</span>
              <span className="block gradient-sunset bg-clip-text text-transparent">Like Never Before</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-antigua-white/80 text-lg lg:text-xl max-w-2xl mx-auto mb-8 font-body">
              Private tours, island excursions & reliable taxi transfers — experience the real Antigua with Daryl.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tours"
                className="font-accent gradient-gold-cta text-antigua-black px-8 py-3.5 rounded-lg cta-glow-gold shadow-xl text-sm"
              >
                EXPLORE TOURS
              </Link>
              <Link
                to="/taxi-services"
                className="font-body font-semibold border-2 border-antigua-white text-antigua-white px-8 py-3.5 rounded-lg cta-glow-outline text-sm"
              >
                BOOK A TAXI
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center text-antigua-white/50 animate-bounce-slow">
          <span className="text-xs font-body mb-1">Scroll to explore</span>
          <ChevronDown size={20} />
        </div>

        {/* Trust strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-antigua-white/10 backdrop-blur-2xl border-t border-antigua-white/10">
          <div className="container mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 lg:gap-12 text-antigua-white text-sm font-body">
            <span className="flex items-center gap-2"><AntiguaSunIcon size={14} className="text-antigua-gold" /> 500+ Happy Tourists</span>
            <span className="flex items-center gap-2"><Award size={14} className="text-antigua-gold" /> TripAdvisor Rated</span>
            <span className="flex items-center gap-2"><Smartphone size={14} className="text-antigua-gold" /> 24/7 WhatsApp Support</span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: WELCOME ─── */}
      <section className="bg-sand py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <FadeIn>
            <SectionDividerSun className="mb-6" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <span className="font-body font-semibold text-antigua-blue text-xs tracking-[4px] uppercase">
              Welcome To Antigua
            </span>
          </FadeIn>
          <FadeIn delay={0.16}>
            <h2 className="mt-4 mb-6 text-charcoal">More Than Just A Ride — It's An Experience</h2>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="text-charcoal/70 leading-relaxed max-w-[680px] mx-auto mb-12 font-body">
              For over 15 years, Daryl has been sharing the beauty, culture, and hidden treasures of Antigua with visitors from around the world. Whether it's a breathtaking beach you've never heard of or the story behind a 300-year-old fort, every tour is personal, authentic, and unforgettable.
            </p>
          </FadeIn>
          <div className="grid grid-cols-3 gap-6 lg:gap-12">
            <Counter end={15} suffix="+" label="Years Experience" icon="🌴" />
            <Counter end={2000} suffix="+" label="Tours Completed" icon="🗺️" />
            <Counter end={500} suffix="+" label="5-Star Reviews" icon="☀️" />
          </div>
        </div>
      </section>

      {/* Wave transition */}
      <WaveDivider fill="hsl(var(--background))" className="-mt-1 bg-sand" />

      {/* ─── SECTION 3: FEATURED TOURS ─── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center mb-12 lg:mb-16 text-charcoal">Our Signature Experiences</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[250px] lg:auto-rows-[280px]">
            {tours.map((tour, i) => (
              <TourCard key={tour.title} tour={tour} i={i} />
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="text-center mt-10">
              <Link to="/tours" className="text-antigua-blue font-body font-semibold hover:text-ocean transition-colors">
                View All Tours →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SECTION 4: FLEET ─── */}
      <section className="bg-shadow py-20 lg:py-28 relative overflow-hidden">
        {/* Sun watermark */}
        <div className="absolute bottom-8 right-8 pointer-events-none opacity-[0.03]">
          <AntiguaSunIcon size={400} className="text-antigua-gold" />
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <FadeIn>
              <span className="font-body font-semibold text-antigua-gold text-xs tracking-[4px] uppercase">Our Fleet</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-antigua-white mt-3 mb-8">Travel In Comfort & Style</h2>
            </FadeIn>

            {/* Coaster Bus */}
            <FadeIn delay={0.16}>
              <div className="mb-6 p-5 rounded-xl border border-antigua-white/10 bg-antigua-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Bus className="text-antigua-gold" size={24} />
                  <div>
                    <h3 className="text-antigua-white text-lg">Coaster Bus</h3>
                    <span className="text-antigua-white/50 text-sm font-body">Up to 30 Passengers</span>
                  </div>
                </div>
                <p className="text-antigua-white/60 text-sm font-body mb-3">
                  Perfect for group tours, wedding transfers, and corporate events.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["A/C", "Sound System", "Comfortable Seating", "Luggage Space"].map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full border-l-2 border-antigua-gold/50 border border-antigua-white/20 text-antigua-white/70 font-body">{f}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Private Taxi */}
            <FadeIn delay={0.24}>
              <div className="mb-8 p-5 rounded-xl border border-antigua-white/10 bg-antigua-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Car className="text-antigua-gold" size={24} />
                  <div>
                    <h3 className="text-antigua-white text-lg">Private Taxi</h3>
                    <span className="text-antigua-white/50 text-sm font-body">Up to 4 Passengers</span>
                  </div>
                </div>
                <p className="text-antigua-white/60 text-sm font-body mb-3">
                  Airport transfers, point-to-point, hourly hire.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["A/C", "Wi-Fi Available", "Clean & Professional"].map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full border-l-2 border-antigua-gold/50 border border-antigua-white/20 text-antigua-white/70 font-body">{f}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.32}>
              <Link to="/book" className="font-accent gradient-gold-cta text-antigua-black px-8 py-3 rounded-lg cta-glow-gold shadow-lg text-sm inline-block">
                GET A QUOTE
              </Link>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="hidden lg:block">
            <div className="relative">
              <img
                src={fleetImg}
                alt="Daryl's tour fleet - comfortable coaster bus"
                className="rounded-2xl shadow-2xl w-full object-cover"
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave transition */}
      <WaveDivider fill="hsl(var(--tropical-sand))" className="bg-shadow" />

      {/* ─── SECTION 5: WHY CHOOSE US ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center mb-12 lg:mb-16 text-charcoal">Why Tourists Choose Daryl</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="bg-background rounded-xl p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-200 relative overflow-hidden">
                  {/* V-shape container for icon */}
                  <div className="w-16 h-16 mx-auto mb-4 relative flex items-center justify-center">
                    <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full text-antigua-gold/15" aria-hidden="true">
                      <path d="M32 0 L64 64 L0 64 Z" fill="currentColor" />
                    </svg>
                    <f.icon className="text-antigua-gold relative z-10" size={26} />
                  </div>
                  <h3 className="text-lg mb-2 text-charcoal">{f.title}</h3>
                  <p className="text-sm text-charcoal/60 font-body">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: TESTIMONIALS ─── */}
      <section className="gradient-ocean py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative quote */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-antigua-gold/10 text-[200px] font-display leading-none select-none pointer-events-none">
          "
        </div>

        {/* V-shape watermark */}
        <FlagVShape variant="outline" opacity={0.04} className="text-antigua-gold" />

        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6">
                <SunRating value={t.stars} size={18} />
              </div>
              <blockquote className="font-display italic text-antigua-white text-xl lg:text-2xl leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <p className="text-antigua-white font-body font-semibold">{t.name} {t.country}</p>
              <p className="text-antigua-white/50 text-sm font-body">{t.tour}</p>
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-antigua-gold w-6" : "bg-antigua-white/30"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: GALLERY PREVIEW ─── */}
      <section className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {galleryImages.map((img, i) => (
            <Link
              key={i}
              to="/gallery"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={img}
                alt={`Antigua gallery image ${i + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                loading="lazy"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-antigua-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="text-antigua-white" size={24} />
              </div>
            </Link>
          ))}
        </div>
        {/* Rotated text */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <span className="font-body font-bold text-antigua-gold text-xs tracking-[4px] writing-mode-vertical"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
            FOLLOW THE ADVENTURE
          </span>
        </div>
      </section>

      {/* ─── SECTION 8: BOOKING CTA ─── */}
      <section className="relative bg-antigua-red py-20 lg:py-24 overflow-hidden">
        {/* V-shape pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="vshape" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 L20 20 L0 20 Z" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#vshape)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="text-antigua-white mb-4">Ready For Your Antigua Adventure?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-antigua-white/80 font-body mb-8 text-lg">
              Book your tour or taxi in under 2 minutes. We respond within 1 hour.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/book"
                className="font-accent gradient-gold-cta text-antigua-black px-10 py-4 rounded-lg cta-glow-gold shadow-xl text-sm"
              >
                BOOK A TOUR
              </Link>
              <AntiguaSunIcon size={20} className="text-antigua-gold hidden sm:block" />
              <a
                href={`https://wa.me/12681234567?text=${encodeURIComponent("Hi Daryl! I just visited your website and I'd love to book a tour. 🌴")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-semibold bg-whatsapp text-antigua-white px-10 py-4 rounded-lg hover:scale-[1.03] transition-all shadow-xl text-sm flex items-center justify-center gap-2"
              >
                <Smartphone size={18} />
                WHATSAPP US NOW
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-antigua-white/60 text-sm font-body">
              ✓ No payment required to book &nbsp; ✓ Free cancellation up to 24hrs &nbsp; ✓ Instant WhatsApp confirmation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://exact-pixel-perfect-913.lovable.app/#business",
            name: "Daryl's Extreme Island Tours",
            description: "Private tours, island excursions & reliable taxi transfers in Antigua & Barbuda. Over 15 years of experience sharing the beauty of Antigua.",
            url: "https://exact-pixel-perfect-913.lovable.app",
            telephone: "+12681234567",
            email: "info@darylstours.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "St. John's",
              addressCountry: "AG",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 17.12,
              longitude: -61.85,
            },
            image: "https://exact-pixel-perfect-913.lovable.app/og-image.jpg",
            priceRange: "$18 - $120",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: "500",
              bestRating: "5",
            },
            sameAs: [
              "https://instagram.com/darylsextremetours",
              "https://facebook.com/darylsextremetours",
              "https://tripadvisor.com/darylsextremetours",
            ],
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "06:00", closes: "22:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "07:00", closes: "20:00" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Tours & Taxi Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Full Island Tour", description: "6-hour guided tour of Antigua's highlights" }, price: "85", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Beach Hopper", description: "4-hour tour visiting Antigua's best beaches" }, price: "65", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Historical Antigua", description: "5-hour heritage and history tour" }, price: "75", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Sunset Cruise", description: "3-hour sunset experience on the water" }, price: "95", priceCurrency: "USD" },
              ],
            },
          }),
        }}
      />
    </main>
  );
};

export default Index;
