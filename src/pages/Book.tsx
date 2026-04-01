import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Smartphone, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { toursData } from "@/data/tours";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
};

const referralSources = ["Google", "TripAdvisor", "Instagram", "Facebook", "Hotel Recommendation", "Friend / Family", "Cruise Ship", "Other"];

const Book = () => {
  const [tab, setTab] = useState<"tour" | "taxi" | "custom">("tour");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", whatsappSame: true, whatsapp: "",
    date: "", time: "", guests: "2", pickup: "", dropoff: "",
    tourSlug: "", specialRequests: "", referralSource: "",
  });

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.date) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      service_type: tab,
      customer_name: form.name.trim().slice(0, 100),
      customer_email: form.email.trim().slice(0, 255),
      customer_phone: form.phone.trim().slice(0, 30),
      customer_whatsapp: form.whatsappSame ? form.phone.trim().slice(0, 30) : form.whatsapp.trim().slice(0, 30),
      service_date: form.date,
      service_time: form.time || null,
      num_guests: parseInt(form.guests) || 1,
      pickup_location: form.pickup.trim().slice(0, 200) || null,
      dropoff_location: form.dropoff.trim().slice(0, 200) || null,
      special_requests: form.specialRequests.trim().slice(0, 1000) || null,
      referral_source: form.referralSource || null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main>
        <section className="min-h-screen flex items-center justify-center bg-sand pt-20">
          <div className="text-center px-4 max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-whatsapp/20 flex items-center justify-center">
              <Check className="text-whatsapp" size={40} />
            </div>
            <h1 className="text-foreground mb-4 text-3xl">Booking Request Received!</h1>
            <p className="text-muted-foreground font-body mb-6">
              Daryl will confirm your booking via WhatsApp within 1 hour. Keep an eye on your phone!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="gradient-gold-cta text-antigua-black font-accent px-6 py-3 rounded-lg text-sm inline-block">
                BACK TO HOME
              </Link>
              <a
                href={`https://wa.me/12681234567?text=${encodeURIComponent("Hi Daryl! I just submitted a booking request on your website. Looking forward to hearing from you!")}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-whatsapp text-antigua-white font-body font-semibold px-6 py-3 rounded-lg text-sm inline-flex items-center justify-center gap-2"
              >
                <Smartphone size={16} /> WHATSAPP DARYL
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center gradient-hero">
        <div className="relative z-10 text-center px-4">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span><span className="text-antigua-white/80">Book</span>
          </nav>
          <h1 className="text-antigua-white">Book Your Adventure</h1>
          <p className="text-antigua-white/70 font-body mt-2">Fill out the form below and Daryl will confirm within 1 hour.</p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              {/* Tabs */}
              <FadeIn>
                <div className="flex gap-2 mb-8">
                  {([["tour", "Tour Booking"], ["taxi", "Taxi Transfer"], ["custom", "Custom Request"]] as const).map(([key, label]) => (
                    <button key={key} onClick={() => setTab(key)} className={`px-5 py-2.5 rounded-lg text-sm font-body font-medium transition-all ${tab === key ? "gradient-gold-cta text-antigua-black shadow-md" : "border border-mist text-muted-foreground hover:border-antigua-blue"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {tab === "tour" && (
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Select Tour</label>
                      <select value={form.tourSlug} onChange={e => set("tourSlug", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue transition-colors bg-background text-foreground">
                        <option value="">Choose a tour...</option>
                        {toursData.map(t => <option key={t.slug} value={t.slug}>{t.title} — ${t.price}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Full Name *</label>
                      <input value={form.name} onChange={e => set("name", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" required maxLength={100} />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Email *</label>
                      <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" required maxLength={255} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Phone *</label>
                    <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" required maxLength={30} />
                  </div>

                  <label className="flex items-center gap-2 text-sm font-body text-muted-foreground cursor-pointer">
                    <input type="checkbox" checked={form.whatsappSame} onChange={e => set("whatsappSame", e.target.checked)} className="rounded" />
                    WhatsApp number same as phone
                  </label>

                  {!form.whatsappSame && (
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">WhatsApp Number</label>
                      <input type="tel" value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" maxLength={30} />
                    </div>
                  )}

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Date *</label>
                      <input type="date" value={form.date} onChange={e => set("date", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" required />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Time</label>
                      <input type="time" value={form.time} onChange={e => set("time", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Guests *</label>
                      <select value={form.guests} onChange={e => set("guests", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  {(tab === "taxi" || tab === "custom") && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1">Pickup Location</label>
                        <input value={form.pickup} onChange={e => set("pickup", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" maxLength={200} />
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1">Drop-off Location</label>
                        <input value={form.dropoff} onChange={e => set("dropoff", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" maxLength={200} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Special Requests</label>
                    <textarea value={form.specialRequests} onChange={e => set("specialRequests", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground min-h-[100px] resize-y" maxLength={1000} />
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">How did you hear about us?</label>
                    <select value={form.referralSource} onChange={e => set("referralSource", e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground">
                      <option value="">Select...</option>
                      {referralSources.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <button type="submit" disabled={loading} className="w-full gradient-gold-cta text-antigua-black font-accent py-3.5 rounded-lg hover:scale-[1.02] hover:brightness-110 transition-all text-sm disabled:opacity-50">
                    {loading ? "SUBMITTING..." : "REQUEST BOOKING"}
                  </button>

                  <p className="text-xs text-muted-foreground font-body text-center">
                    ✓ No payment required &nbsp; ✓ Free cancellation up to 24hrs &nbsp; ✓ WhatsApp confirmation within 1hr
                  </p>
                </form>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.15}>
                <div className="bg-card rounded-xl border border-mist p-6 space-y-5 lg:sticky lg:top-28">
                  <h3 className="text-lg text-foreground font-display">Need Help Booking?</h3>
                  <a href="tel:+12681234567" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-antigua-blue transition-colors">
                    <Phone size={18} className="text-antigua-gold flex-shrink-0" /> +1 (268) 123-4567
                  </a>
                  <a href="https://wa.me/12681234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-whatsapp transition-colors">
                    <Smartphone size={18} className="text-whatsapp flex-shrink-0" /> WhatsApp Daryl
                  </a>
                  <a href="mailto:info@darylstours.com" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-antigua-blue transition-colors">
                    <Mail size={18} className="text-antigua-gold flex-shrink-0" /> info@darylstours.com
                  </a>
                  <div className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                    <MapPin size={18} className="text-antigua-gold flex-shrink-0 mt-0.5" /> St. John's, Antigua & Barbuda
                  </div>
                  <div className="mt-4 rounded-xl overflow-hidden border border-mist h-[200px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121449.05949474886!2d-61.85!3d17.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c0d6825e3d1c5a5%3A0x5b5b0b5b5b5b5b5b!2sAntigua!5e0!3m2!1sen!2s!4v1"
                      width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Antigua map"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Book;
