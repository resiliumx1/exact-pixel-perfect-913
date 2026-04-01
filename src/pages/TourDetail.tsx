import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Clock, Users, Check, Info, MapPin, Shield, Smartphone, ChevronLeft, ChevronRight, X } from "lucide-react";

import { toursData } from "@/data/tours";
import AntiguaSunIcon from "@/components/antiguan/AntiguaSunIcon";
import SunRating from "@/components/antiguan/SunRating";
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

const TourDetail = () => {
  const { slug } = useParams();
  const tour = toursData.find((t) => t.slug === slug);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!tour) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-sand">
        <div className="text-center px-4">
          <AntiguaSunIcon size={60} className="text-antigua-gold/30 mx-auto mb-4" />
          <h1 className="text-charcoal mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground font-body mb-4">This island adventure doesn't exist — yet! 🌊</p>
          <Link to="/tours" className="text-antigua-blue font-body font-semibold hover:underline">← Back to All Tours</Link>
        </div>
      </main>
    );
  }

  const related = toursData.filter((t) => t.slug !== slug).slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Hi Daryl! I'm interested in booking the ${tour.title}. Could you share availability?`
  );

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <img src={tour.image} alt={tour.title} className="absolute inset-0 w-full h-full object-cover" width={800} height={600} />
        <div className="absolute inset-0 bg-gradient-to-t from-antigua-black/80 via-antigua-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 pb-10">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span>
            <Link to="/tours" className="hover:text-antigua-white transition-colors">Tours</Link>
            <span className="mx-2">→</span>
            <span className="text-antigua-white/80">{tour.title}</span>
          </nav>
          <h1 className="text-antigua-white text-4xl lg:text-5xl">{tour.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-antigua-white/70 font-body text-sm">
            <span className="flex items-center gap-1"><Clock size={14} /> {tour.duration}</span>
            <span className="flex items-center gap-1"><Users size={14} /> Up to {tour.maxGuests} guests</span>
            <span className="flex items-center gap-1">
              <SunRating value={Math.round(tour.rating)} size={13} />
              <span className="ml-1">{tour.rating} ({tour.reviewCount} reviews)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="flex-1 lg:max-w-[65%]">
              {/* Description */}
              <FadeIn>
                <div className="mb-10">
                  <h2 className="text-2xl mb-4 text-foreground">About This Tour</h2>
                  <p className="text-muted-foreground font-body leading-relaxed">{tour.description}</p>
                </div>
              </FadeIn>

              {/* What's Included */}
              <FadeIn delay={0.1}>
                <div className="mb-10">
                  <h2 className="text-2xl mb-4 text-foreground">What's Included</h2>
                  <ul className="space-y-2.5">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-body text-muted-foreground">
                        <AntiguaSunIcon size={16} className="text-antigua-gold flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* What To Bring */}
              <FadeIn delay={0.15}>
                <div className="mb-10">
                  <h2 className="text-2xl mb-4 text-foreground">What To Bring</h2>
                  <ul className="space-y-2.5">
                    {tour.whatToBring.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-body text-muted-foreground">
                        <Info size={18} className="text-antigua-blue flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Itinerary */}
              <FadeIn delay={0.2}>
                <div className="mb-10">
                  <h2 className="text-2xl mb-6 text-foreground">Tour Itinerary</h2>
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-mist" />
                    <div className="space-y-6">
                      {tour.itinerary.map((step, i) => (
                        <div key={i} className="relative">
                          {/* Sun dot */}
                          <div className="absolute -left-8 top-0.5">
                            <AntiguaSunIcon size={22} className="text-antigua-gold" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-foreground font-body">{step.stop}</h3>
                            <p className="text-sm text-muted-foreground font-body mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Photo Gallery */}
              <FadeIn delay={0.25}>
                <div className="mb-10">
                  <h2 className="text-2xl mb-4 text-foreground">Photos</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {tour.galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setLightboxIdx(i)}
                        className="aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${tour.title} photo ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          width={400}
                          height={300}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Related Tours */}
              <FadeIn delay={0.3}>
                <div>
                  <h2 className="text-2xl mb-6 text-foreground">You Might Also Like</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        to={`/tours/${r.slug}`}
                        className="group rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            width={400}
                            height={225}
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-display text-foreground">{r.title}</h3>
                          <p className="text-xs text-muted-foreground font-body mt-1">From ${r.price} · {r.duration}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:w-[35%]">
              <div className="lg:sticky lg:top-28 space-y-4">
                {/* Booking Card */}
                <div className="bg-card rounded-xl border border-mist p-6 shadow-lg relative overflow-hidden">
                  {/* Red top border with sun notch */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-antigua-red" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                    <AntiguaSunIcon size={18} className="text-antigua-gold" />
                  </div>

                  <div className="text-center mb-5 mt-2">
                    <span className="text-antigua-gold font-display text-4xl font-bold">${tour.price}</span>
                    <span className="text-muted-foreground font-body text-sm ml-1">USD / person</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                      <Clock size={16} className="text-antigua-blue" />
                      <span>Duration: {tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                      <Users size={16} className="text-antigua-blue" />
                      <span>Max group: {tour.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                      <MapPin size={16} className="text-antigua-blue" />
                      <span>Hotel pickup included</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                      <Shield size={16} className="text-antigua-blue" />
                      <span>Difficulty: {tour.difficulty}</span>
                    </div>
                  </div>

                  <Link
                    to="/book"
                    className="block w-full text-center font-accent gradient-gold-cta text-antigua-black py-3.5 rounded-lg cta-glow-gold shadow-md text-sm mb-3"
                  >
                    BOOK THIS TOUR
                  </Link>

                  <a
                    href={`https://wa.me/12681234567?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-whatsapp text-antigua-white py-3 rounded-lg hover:scale-[1.02] transition-all font-body font-semibold text-sm"
                  >
                    <Smartphone size={16} />
                    WhatsApp to Inquire
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="bg-card rounded-xl border border-mist p-5">
                  <div className="space-y-3 text-xs font-body text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500" />
                      No payment required to book
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500" />
                      Free cancellation up to 24hrs
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500" />
                      Instant WhatsApp confirmation
                    </div>
                    <div className="flex items-center gap-2">
                      <SunRating value={Math.round(tour.rating)} size={12} />
                      <span className="ml-1">{tour.rating} rating from {tour.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[9998] bg-antigua-black/95 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 text-antigua-white/70 hover:text-antigua-white z-10" aria-label="Close lightbox">
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + tour.galleryImages.length) % tour.galleryImages.length); }}
            className="absolute left-4 text-antigua-white/70 hover:text-antigua-white z-10" aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % tour.galleryImages.length); }}
            className="absolute right-4 text-antigua-white/70 hover:text-antigua-white z-10" aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
          <img
            src={tour.galleryImages[lightboxIdx]}
            alt={`${tour.title} gallery ${lightboxIdx + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-mist px-4 py-3 flex items-center justify-between">
        <div>
          <span className="text-antigua-gold font-display text-xl font-bold">${tour.price}</span>
          <span className="text-muted-foreground font-body text-xs ml-1">/ person</span>
        </div>
        <Link
          to="/book"
          className="font-accent gradient-gold-cta text-antigua-black px-6 py-2.5 rounded-lg text-xs shadow-lg cta-glow-gold"
        >
          BOOK THIS TOUR
        </Link>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: tour.title,
            description: tour.description,
            touristType: tour.category,
            offers: {
              "@type": "Offer",
              price: tour.price.toFixed(2),
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </main>
  );
};

export default TourDetail;
