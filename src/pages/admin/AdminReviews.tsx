import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, X } from "lucide-react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ customer_name: "", country: "", quote: "", rating: "5", tour_taken: "" });

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    setReviews(data || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm({ customer_name: "", country: "", quote: "", rating: "5", tour_taken: "" });
    setEditing("new");
  };

  const save = async () => {
    const data = {
      customer_name: form.customer_name.trim().slice(0, 100),
      country: form.country.trim().slice(0, 50),
      quote: form.quote.trim().slice(0, 1000),
      rating: parseInt(form.rating) || 5,
      tour_taken: form.tour_taken.trim().slice(0, 100),
    };
    if (editing === "new") {
      await supabase.from("testimonials").insert(data);
      toast({ title: "Review added" });
    } else {
      await supabase.from("testimonials").update(data).eq("id", editing.id);
      toast({ title: "Review updated" });
    }
    setEditing(null);
    load();
  };

  const toggleVisible = async (r: any) => {
    await supabase.from("testimonials").update({ is_visible: !r.is_visible }).eq("id", r.id);
    load();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Review deleted" });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display text-foreground">Reviews</h1>
        <button onClick={openNew} className="gradient-gold-cta text-antigua-black font-accent px-4 py-2 rounded-lg text-xs inline-flex items-center gap-1">
          <Plus size={14} /> ADD REVIEW
        </button>
      </div>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-background rounded-xl border border-mist p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-body font-semibold text-foreground">{r.customer_name} {r.country}</p>
                <p className="text-xs text-muted-foreground font-body">{r.tour_taken} · {"⭐".repeat(r.rating)}</p>
                <p className="text-sm text-foreground font-body mt-1 italic">"{r.quote}"</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisible(r)} className={`w-10 h-5 rounded-full transition-colors ${r.is_visible ? "bg-emerald-500" : "bg-mist"} relative`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-antigua-white shadow transition-transform ${r.is_visible ? "left-5" : "left-0.5"}`} />
                </button>
                <button onClick={() => deleteReview(r.id)} className="text-muted-foreground hover:text-antigua-red"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center text-sm text-muted-foreground font-body py-12">No reviews yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-antigua-black/50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-background rounded-xl border border-mist max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display text-foreground">Add Review</h2>
              <button onClick={() => setEditing(null)}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <input value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} placeholder="Customer name" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              <input value={form.country} onChange={e => setForm({...form, country: e.target.value})} placeholder="Country (e.g. 🇬🇧 UK)" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              <textarea value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} placeholder="Review quote" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground min-h-[80px]" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground">
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
                <input value={form.tour_taken} onChange={e => setForm({...form, tour_taken: e.target.value})} placeholder="Tour taken" className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              </div>
              <button onClick={save} className="w-full gradient-gold-cta text-antigua-black font-accent py-2.5 rounded-lg text-xs">SAVE REVIEW</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
