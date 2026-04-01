import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Shield, Heart, HandHelping } from "lucide-react";

import darylImg from "@/assets/daryl-portrait.jpg";
import heroImg from "@/assets/hero-antigua.jpg";
import AntiguaSunIcon from "@/components/antiguan/AntiguaSunIcon";
import AntiguaFlag from "@/components/antiguan/AntiguaFlag";
import AntiguaFlagBadge from "@/components/antiguan/AntiguaFlagBadge";
import SectionDividerSun from "@/components/antiguan/SectionDividerSun";
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

const flagMeanings = [
  { color: "bg-antigua-red", label: "Red", meaning: "Energy of the people & African heritage" },
  { color: "bg-antigua-black", label: "Black", meaning: "African ancestry & soil of the nation" },
  { color: "bg-antigua-blue", label: "Blue", meaning: "Hope, Caribbean sea & sky" },
  { color: "bg-antigua-gold", label: "Gold", meaning: "Rising sun — dawn of a new era" },
  { color: "bg-antigua-white", label: "White", meaning: "Sand & beaches of the islands" },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <FlagStripe />
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
                  <blockquote className="border-l-4 border-antigua-gold pl-4 italic text-foreground/80">
                    <span className="text-antigua-gold text-2xl font-display leading-none">"</span>
                    Every guest I take out isn't just a customer — they're family. That's how we do things in Antigua.
                    <span className="text-antigua-gold text-2xl font-display leading-none">"</span>
                    <footer className="text-sm mt-2 not-italic text-muted-foreground">— Daryl</footer>
                  </blockquote>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="mt-4">
                  <AntiguaFlagBadge variant="full" />
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
                  <div className="absolute -left-8 top-0.5">
                    <AntiguaSunIcon size={22} className="text-antigua-gold" />
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

      {/* Proudly Antiguan — Born Under This Sun */}
      <section className="py-16 lg:py-20 gradient-ocean text-antigua-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn>
            <div className="text-center mb-10">
              <SectionDividerSun className="mb-6" />
              <h2 className="text-antigua-white mb-2">Born Under This Sun</h2>
              <p className="text-antigua-white/60 font-body text-sm">The Antigua & Barbuda flag tells a powerful story</p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn delay={0.1}>
              <div className="flex justify-center">
                <AntiguaFlag width={280} className="rounded-lg shadow-2xl" />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-3">
                {flagMeanings.map((fm) => (
                  <div key={fm.label} className="flex items-center gap-3 bg-antigua-white/5 rounded-lg p-3 border border-antigua-white/10">
                    <div className={`w-8 h-8 rounded-full ${fm.color} flex-shrink-0 border border-antigua-white/20`} />
                    <div>
                      <span className="text-antigua-white font-body font-semibold text-sm">{fm.label}</span>
                      <p className="text-antigua-white/60 text-xs font-body">{fm.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <p className="text-antigua-white/80 font-body leading-relaxed max-w-2xl mx-auto mb-8">
                Daryl carries this pride into every tour. He's not just a driver — he's a cultural ambassador, sharing the heart and soul of Antigua with every visitor who steps into his vehicle.
              </p>
              <Link to="/book" className="inline-block gradient-gold-cta text-antigua-black font-accent px-8 py-3 rounded-lg cta-glow-gold shadow-lg text-sm">
                BOOK YOUR EXPERIENCE
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default About;
