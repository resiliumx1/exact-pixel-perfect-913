import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
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

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 255),
      phone: form.phone.trim().slice(0, 30),
      message: form.message.trim().slice(0, 2000),
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Message sent! Daryl will get back to you soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <main>
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center gradient-hero">
        <div className="relative z-10 text-center px-4">
          <nav className="text-antigua-white/50 text-sm font-body mb-3">
            <Link to="/" className="hover:text-antigua-white transition-colors">Home</Link>
            <span className="mx-2">→</span><span className="text-antigua-white/80">Contact</span>
          </nav>
          <h1 className="text-antigua-white">Get In Touch</h1>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-foreground mb-6">Send Us a Message</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Name *</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue transition-colors bg-background text-foreground" placeholder="Your name" required maxLength={100} />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue transition-colors bg-background text-foreground" placeholder="your@email.com" required maxLength={255} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue transition-colors bg-background text-foreground" placeholder="+1 (268) 000-0000" maxLength={30} />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Message *</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue transition-colors bg-background text-foreground min-h-[140px] resize-y" placeholder="How can we help you?" required maxLength={2000} />
                  </div>
                  <button type="submit" disabled={loading} className="gradient-gold-cta text-antigua-black font-accent px-8 py-3 rounded-lg hover:scale-[1.02] hover:brightness-110 transition-all text-sm disabled:opacity-50">
                    {loading ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.15}>
                <div className="bg-card rounded-xl border border-mist p-6 space-y-5">
                  <h3 className="text-lg text-foreground font-display">Contact Info</h3>
                  <a href="tel:+12681234567" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-antigua-blue transition-colors">
                    <Phone size={18} className="text-antigua-gold flex-shrink-0" /> +1 (268) 123-4567
                  </a>
                  <a href="https://wa.me/12681234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-whatsapp transition-colors">
                    <Smartphone size={18} className="text-whatsapp flex-shrink-0" /> WhatsApp Chat
                  </a>
                  <a href="mailto:info@darylstours.com" className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-antigua-blue transition-colors">
                    <Mail size={18} className="text-antigua-gold flex-shrink-0" /> info@darylstours.com
                  </a>
                  <div className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                    <MapPin size={18} className="text-antigua-gold flex-shrink-0 mt-0.5" /> St. John's, Antigua & Barbuda
                  </div>
                  <div className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                    <Clock size={18} className="text-antigua-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Mon–Sat: 6:00 AM – 10:00 PM</p>
                      <p>Sun: 7:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-6 rounded-xl overflow-hidden border border-mist h-[250px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121449.05949474886!2d-61.85!3d17.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c0d6825e3d1c5a5%3A0x5b5b0b5b5b5b5b5b!2sAntigua!5e0!3m2!1sen!2s!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Antigua location map"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
