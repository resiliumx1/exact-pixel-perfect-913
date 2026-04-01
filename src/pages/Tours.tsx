import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Star, Clock, Users } from "lucide-react";

import toursHero from "@/assets/tours-hero.jpg";
import { toursData, categories } from "@/data/tours";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
};

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-500/90",
  Moderate: "bg-amber-500/90",
  Adventure: "bg-antigua-red/90",
};

const Tours = () => {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? toursData : toursData.filter((t) => t.category === active);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img src={toursHero} alt="Antigua coastline aerial view" className="absolute inset-0 w-full h-full object-cover" width={1920} height={600} />
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/70 via-shadow/40 to-shadow/60" />
        <div className="relative z-10 text-center px-4">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span>
            <span className="text-antigua-white/80">Tours</span>
          </nav>
          <h1 className="text-antigua-white">Explore Antigua Your Way</h1>
          <p className="text-antigua-white/70 font-body mt-3 max-w-lg mx-auto">
            Choose from our handpicked selection of island tours — each one designed to show you the real Antigua.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-mist">
        <div className="container mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
                  active === cat.value
                    ? "gradient-gold-cta text-antigua-black shadow-md"
                    : "border border-mist text-slate hover:border-antigua-blue hover:text-antigua-blue"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tour Grid */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <p className="text-center text-slate font-body py-20">No tours found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tour, i) => (
                <FadeIn key={tour.slug} delay={i * 0.06}>
                  <Link
                    to={`/tours/${tour.slug}`}
                    className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-antigua-black/60 via-transparent to-transparent" />
                      {/* Badges */}
                      <span className="absolute top-3 right-3 gradient-gold-cta text-antigua-black font-accent text-[11px] px-3 py-1 rounded-full shadow">
                        From ${tour.price}
                      </span>
                      <span className={`absolute bottom-3 left-3 ${difficultyColor[tour.difficulty]} text-antigua-white text-[11px] px-2.5 py-0.5 rounded-full font-body font-medium`}>
                        {tour.difficulty}
                      </span>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-antigua-black/30 backdrop-blur-[2px]">
                        <span className="gradient-gold-cta text-antigua-black font-accent text-xs px-6 py-2.5 rounded-lg shadow-lg">
                          VIEW DETAILS
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg mb-1.5 text-foreground">{tour.title}</h3>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 line-clamp-2">
                        {tour.shortDescription}
                      </p>
                      <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-antigua-blue">
                            <Clock size={13} /> {tour.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={13} /> Up to {tour.maxGuests}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Star size={13} className="text-antigua-gold fill-antigua-gold" />
                          {tour.rating} ({tour.reviewCount})
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Tours;
