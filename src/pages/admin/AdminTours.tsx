import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, X } from "lucide-react";

const AdminTours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", short_description: "", price: "", duration_hours: "", category: "island", difficulty: "Easy", max_guests: "10", is_published: true, is_featured: false });

  const load = async () => {
    const { data } = await supabase.from("tours").select("*").order("display_order");
    setTours(data || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setForm({ title: "", slug: "", description: "", short_description: "", price: "", duration_hours: "", category: "island", difficulty: "Easy", max_guests: "10", is_published: true, is_featured: false });
    setEditing("new");
  };

  const openEdit = (t: any) => {
    setForm({
      title: t.title, slug: t.slug, description: t.description || "", short_description: t.short_description || "",
      price: t.price?.toString() || "", duration_hours: t.duration_hours?.toString() || "",
      category: t.category || "island", difficulty: t.difficulty || "Easy", max_guests: t.max_guests?.toString() || "10",
      is_published: t.is_published, is_featured: t.is_featured,
    });
    setEditing(t);
  };

  const save = async () => {
    const data = {
      title: form.title.trim().slice(0, 200),
      slug: form.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 100),
      description: form.description.trim(),
      short_description: form.short_description.trim().slice(0, 500),
      price: parseFloat(form.price) || 0,
      duration_hours: parseFloat(form.duration_hours) || 0,
      category: form.category,
      difficulty: form.difficulty,
      max_guests: parseInt(form.max_guests) || 10,
      is_published: form.is_published,
      is_featured: form.is_featured,
    };

    if (editing === "new") {
      await supabase.from("tours").insert(data);
      toast({ title: "Tour created" });
    } else {
      await supabase.from("tours").update(data).eq("id", editing.id);
      toast({ title: "Tour updated" });
    }
    setEditing(null);
    load();
  };

  const deleteTour = async (id: string) => {
    if (!confirm("Delete this tour?")) return;
    await supabase.from("tours").delete().eq("id", id);
    toast({ title: "Tour deleted" });
    load();
  };

  const togglePublished = async (t: any) => {
    await supabase.from("tours").update({ is_published: !t.is_published }).eq("id", t.id);
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display text-foreground">Tours</h1>
        <button onClick={openNew} className="gradient-gold-cta text-antigua-black font-accent px-4 py-2 rounded-lg text-xs inline-flex items-center gap-1">
          <Plus size={14} /> ADD TOUR
        </button>
      </div>

      <div className="bg-background rounded-xl border border-mist overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-mist text-xs font-body text-muted-foreground">
            <th className="px-4 py-2.5 text-left">Title</th>
            <th className="px-4 py-2.5 text-left">Category</th>
            <th className="px-4 py-2.5 text-left">Price</th>
            <th className="px-4 py-2.5 text-left">Published</th>
            <th className="px-4 py-2.5"></th>
          </tr></thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t.id} className="border-b border-mist/50 last:border-0">
                <td className="px-4 py-2.5 text-sm font-body font-medium">{t.title}</td>
                <td className="px-4 py-2.5 text-xs font-body text-muted-foreground capitalize">{t.category}</td>
                <td className="px-4 py-2.5 text-xs font-body">${t.price}</td>
                <td className="px-4 py-2.5">
                  <button onClick={() => togglePublished(t)} className={`w-10 h-5 rounded-full transition-colors ${t.is_published ? "bg-emerald-500" : "bg-mist"} relative`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-antigua-white shadow transition-transform ${t.is_published ? "left-5" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-4 py-2.5 flex gap-2">
                  <button onClick={() => openEdit(t)} className="text-antigua-blue hover:text-ocean"><Edit size={14} /></button>
                  <button onClick={() => deleteTour(t.id)} className="text-muted-foreground hover:text-antigua-red"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {tours.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground font-body">No tours in database. Add tours or seed data.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-antigua-black/50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-background rounded-xl border border-mist max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display text-foreground">{editing === "new" ? "Add Tour" : "Edit Tour"}</h2>
              <button onClick={() => setEditing(null)}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Tour title" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="url-slug" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              <textarea value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})} placeholder="Short description" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground min-h-[60px]" />
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Full description" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground min-h-[100px]" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Price (USD)" type="number" className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
                <input value={form.duration_hours} onChange={e => setForm({...form, duration_hours: e.target.value})} placeholder="Duration (hours)" type="number" className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground">
                  {["island","beach","historical","nightlife","custom"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})} className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground">
                  {["Easy","Moderate","Adventure"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input value={form.max_guests} onChange={e => setForm({...form, max_guests: e.target.value})} placeholder="Max guests" type="number" className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input type="checkbox" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} /> Published
                </label>
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} /> Featured
                </label>
              </div>
              <button onClick={save} className="w-full gradient-gold-cta text-antigua-black font-accent py-2.5 rounded-lg text-xs">
                {editing === "new" ? "CREATE TOUR" : "SAVE CHANGES"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTours;
