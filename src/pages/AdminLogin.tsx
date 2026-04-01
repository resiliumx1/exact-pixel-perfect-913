import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      toast({ title: "Invalid credentials", variant: "destructive" });
    } else {
      navigate("/admin");
    }
  };

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-sand">
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <span className="font-accent text-antigua-gold text-2xl block">DARYL'S</span>
          <span className="font-body text-xs tracking-[3px] text-charcoal/60">ADMIN DASHBOARD</span>
        </div>
        <form onSubmit={handleLogin} className="bg-background rounded-xl border border-mist p-6 shadow-lg space-y-4">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" required />
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-mist rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-antigua-blue bg-background text-foreground" required />
          </div>
          <button type="submit" disabled={loading} className="w-full gradient-gold-cta text-antigua-black font-accent py-3 rounded-lg hover:scale-[1.02] hover:brightness-110 transition-all text-sm disabled:opacity-50">
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
