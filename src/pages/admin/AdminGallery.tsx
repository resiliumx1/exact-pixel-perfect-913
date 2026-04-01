import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

const AdminGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [form, setForm] = useState({ image_url: "", caption: "", alt_text: "", category: "tours" });

  const load = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("display_order");
    setImages(data || []);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.image_url.trim()) { toast({ title: "Image URL required", variant: "destructive" }); return; }
    await supabase.from("gallery_images").insert({
      image_url: form.image_url.trim().slice(0, 500),
      caption: form.caption.trim().slice(0, 200),
      alt_text: form.alt_text.trim().slice(0, 200),
      category: form.category,
    });
    setForm({ image_url: "", caption: "", alt_text: "", category: "tours" });
    toast({ title: "Image added" });
    load();
  };

  const toggleVisible = async (img: any) => {
    await supabase.from("gallery_images").update({ is_visible: !img.is_visible }).eq("id", img.id);
    load();
  };

  const deleteImg = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    toast({ title: "Image deleted" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-display text-foreground mb-6">Gallery</h1>

      {/* Add form */}
      <div className="bg-background rounded-xl border border-mist p-4 mb-6 space-y-3">
        <h3 className="text-sm font-body font-semibold text-foreground">Add Image</h3>
        <input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="Image URL" className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
        <div className="grid grid-cols-3 gap-3">
          <input value={form.caption} onChange={e => setForm({...form, caption: e.target.value})} placeholder="Caption" className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
          <input value={form.alt_text} onChange={e => setForm({...form, alt_text: e.target.value})} placeholder="Alt text" className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground" />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground">
            {["tours","beaches","landmarks","sunsets","vehicles"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={add} className="gradient-gold-cta text-antigua-black font-accent px-4 py-2 rounded-lg text-xs">ADD IMAGE</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative rounded-lg overflow-hidden border border-mist group">
            <img src={img.image_url} alt={img.alt_text || img.caption} className="w-full aspect-square object-cover" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-antigua-black/70 p-2 text-xs text-antigua-white font-body">
              {img.caption || "No caption"}
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <button onClick={() => toggleVisible(img)} className={`w-8 h-5 rounded-full transition-colors ${img.is_visible ? "bg-emerald-500" : "bg-mist"} relative`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-antigua-white shadow transition-transform ${img.is_visible ? "left-3" : "left-0.5"}`} />
              </button>
              <button onClick={() => deleteImg(img.id)} className="bg-antigua-red/80 text-antigua-white rounded p-1"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
        {images.length === 0 && <p className="col-span-full text-center text-sm text-muted-foreground font-body py-12">No gallery images yet.</p>}
      </div>
    </div>
  );
};

export default AdminGallery;
