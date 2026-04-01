import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import tourIsland from "@/assets/tour-island.jpg";
import tourBeach from "@/assets/tour-beach.jpg";
import tourHistorical from "@/assets/tour-historical.jpg";
import tourSunset from "@/assets/tour-sunset.jpg";
import fleetImg from "@/assets/fleet.jpg";
import heroImg from "@/assets/hero-antigua.jpg";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
};

interface GalleryImage {
  src: string;
  caption: string;
  category: string;
}

const images: GalleryImage[] = [
  { src: gallery1, caption: "Palm-lined paradise beach", category: "beaches" },
  { src: tourIsland, caption: "Panoramic island views from Shirley Heights", category: "tours" },
  { src: gallery2, caption: "Snorkeling in crystal clear waters", category: "tours" },
  { src: gallery3, caption: "Colorful streets of St. John's", category: "landmarks" },
  { src: tourSunset, caption: "Caribbean sunset from the water", category: "sunsets" },
  { src: gallery4, caption: "Sailing through Antigua's waters", category: "tours" },
  { src: tourHistorical, caption: "Historic Nelson's Dockyard", category: "landmarks" },
  { src: gallery5, caption: "Dramatic tropical sunset", category: "sunsets" },
  { src: tourBeach, caption: "Pristine white sand beach", category: "beaches" },
  { src: fleetImg, caption: "Our comfortable tour coaster bus", category: "vehicles" },
  { src: gallery6, caption: "Historic fort overlooking the sea", category: "landmarks" },
  { src: heroImg, caption: "Aerial view of Antigua coastline", category: "beaches" },
];

const filterTabs = ["All", "Tours", "Beaches", "Landmarks", "Sunsets", "Vehicles"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = active === "All" ? images : images.filter((img) => img.category === active.toLowerCase());

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center gradient-hero">
        <div className="relative z-10 text-center px-4">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span>
            <span className="text-antigua-white/80">Gallery</span>
          </nav>
          <h1 className="text-antigua-white">Gallery — Antigua Through Our Lens</h1>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-mist">
        <div className="container mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
                  active === tab
                    ? "gradient-gold-cta text-antigua-black shadow-md"
                    : "border border-mist text-slate hover:border-antigua-blue hover:text-antigua-blue"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <FadeIn key={`${img.src}-${i}`} delay={i * 0.04}>
                <button
                  onClick={() => setLightboxIdx(images.indexOf(img))}
                  className="group relative w-full overflow-hidden rounded-xl break-inside-avoid cursor-pointer block"
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width={600}
                    height={i % 3 === 0 ? 800 : 600}
                  />
                  <div className="absolute inset-0 bg-antigua-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Expand className="text-antigua-white" size={24} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-antigua-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-antigua-white text-sm font-body">{img.caption}</p>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[9998] bg-antigua-black/95 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 text-antigua-white/70 hover:text-antigua-white z-10" aria-label="Close">
            <X size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + images.length) % images.length); }}
            className="absolute left-4 text-antigua-white/70 hover:text-antigua-white z-10" aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % images.length); }}
            className="absolute right-4 text-antigua-white/70 hover:text-antigua-white z-10" aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightboxIdx].src} alt={images[lightboxIdx].caption} className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg" />
            <p className="text-antigua-white/70 text-sm font-body mt-4">{images[lightboxIdx].caption}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
