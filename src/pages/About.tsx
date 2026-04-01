import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Shield, Heart, HandHelping } from "lucide-react";

import darylImg from "@/assets/daryl-portrait.jpg";
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

const values = [
  { icon: Shield, title: "Safety", desc: "Fully licensed, insured vehicles and a spotless safety record. Your wellbeing is our top priority." },
  { icon: Heart, title: "Authenticity", desc: "Real experiences with a real local. No tourist traps, no rehearsed scripts — just genuine Antigua." },
  { icon: HandHelping, title: "Hospitality", desc: "Antiguan warmth at every turn. From the first handshake to the last goodbye, you're family." },
];

const milestones = [
  { year: "2009", title: "The Beginning", desc: "Daryl starts offering informal tours to friends and hotel guests." },
  { year: "2012", title: "Going Official", desc: "Licensed as a professional tour operator and taxi service." },
  { year: "2016", title: "Fleet Expansion", desc: "Added the Coaster Bus for group tours and wedding transfers." },
  { year: "2020", title: "Digital Presence", desc: "Launched online booking and grew to 5-star TripAdvisor status." },
  { year: "2024", title: "500+ Reviews", desc: "Reached 500+ five-star reviews and counting." },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Antigua coastline" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/70 via-shadow/40 to-shadow/60" />
        <div className="relative z-10 text-center px-4">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span>
            <span className="text-antigua-white/80">About</span>
          </nav>
          <h1 className="text-antigua-white">Meet Daryl — Your Antigua Insider</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative">
                <img
                  src={darylImg}
                  alt="Daryl - Your Antigua tour guide"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0 object-cover aspect-[3/4]"
                  style={{ transform: "rotate(-2deg)" }}
                  loading="lazy"
                  width={600}
                  height={800}
                />
                <div className="absolute -bottom-4 -right-4 lg:-right-8 gradient-gold-cta text-antigua-black font-accent text-xs px-4 py-2 rounded-lg shadow-lg" style={{ transform: "rotate(3deg)" }}>
                  15+ YEARS EXPERIENCE
                </div>
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <span className="font-body font-semibold text-antigua-blue text-xs tracking-[4px] uppercase">Our Story</span>
                <h2 className="mt-3 mb-6 text-foreground">Born Antiguan. Proud Antiguan.</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                  <p>
                    Growing up in the heart of Antigua, Daryl developed a deep love for his island home — its hidden beaches, historic landmarks, vibrant culture, and the warm spirit of its people. What started as showing friends around the island grew into a passion for sharing Antigua's beauty with the world.
                  </p>
                  <p>
                    With over 15 years of experience as a licensed tour operator and taxi service provider, Daryl has built a reputation for reliability, knowledge, and genuine hospitality. He doesn't just drive you from point A to point B — he takes you on a journey through the real Antigua, sharing stories that guidebooks don't tell.
                  </p>
                  <p>
                    Whether it's a full island tour, a sunset cruise, or a simple airport transfer, Daryl treats every guest like family. That's the Antiguan way, and it's the foundation of everything he does.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20 bg-sand">
        <div className="container mx-auto px-4 max-w-2xl">
          <FadeIn>
            <h2 className="text-center mb-12 text-foreground">The Journey So Far</h2>
          </FadeIn>
          <div className="relative pl-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-mist" />
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="relative mb-8 last:mb-0">
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-ocean flex items-center justify-center">
                    <span className="text-antigua-white text-[8px] font-accent">{m.year.slice(2)}</span>
                  </div>
                  <div>
                    <span className="text-antigua-gold font-body font-semibold text-sm">{m.year}</span>
                    <h3 className="text-base font-body font-semibold text-foreground">{m.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-0.5">{m.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center mb-12 text-foreground">What We Stand For</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="bg-card rounded-xl p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-200 border border-mist">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-antigua-gold/15 border border-antigua-gold/30 flex items-center justify-center">
                    <v.icon className="text-antigua-gold" size={28} />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proudly Antiguan */}
      <section className="py-16 lg:py-20 gradient-ocean text-antigua-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <FadeIn>
            <span className="text-5xl mb-4 block">🇦🇬</span>
            <h2 className="text-antigua-white mb-6">Proudly Antiguan</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-4 text-antigua-white/80 font-body leading-relaxed">
              <p>
                The Antigua & Barbuda flag tells a powerful story. The rising sun represents the dawn of a new era. The V-shape stands for victory. The colors embody the African heritage (black), the island's energy (red), and the hope of the Caribbean sea and sky (blue and white). The golden sun symbolizes the warmth and promise of these beautiful islands.
              </p>
              <p>
                Daryl carries this pride into every tour. He's not just a driver — he's a cultural ambassador, sharing the heart and soul of Antigua with every visitor who steps into his vehicle.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link to="/book" className="inline-block mt-8 gradient-gold-cta text-antigua-black font-accent px-8 py-3 rounded-lg hover:scale-[1.03] hover:brightness-110 transition-all shadow-lg text-sm">
              BOOK YOUR EXPERIENCE
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default About;
