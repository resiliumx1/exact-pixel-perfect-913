import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const statusColor: Record<string, string> = {
  new: "bg-antigua-blue/10 text-antigua-blue",
  responded: "bg-emerald-100 text-emerald-800",
  closed: "bg-mist text-slate",
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setInquiries(data || []);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    toast({ title: `Inquiry marked as ${status}` });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-display text-foreground mb-6">Inquiries</h1>
      <div className="space-y-3">
        {inquiries.map((i) => (
          <div key={i.id} className="bg-background rounded-xl border border-mist p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-body font-semibold text-foreground">{i.name}</p>
                <p className="text-xs text-muted-foreground font-body">{i.email} {i.phone && `· ${i.phone}`}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[i.status] || "bg-mist text-slate"}`}>{i.status}</span>
            </div>
            <p className="text-sm text-foreground font-body mb-3">{i.message}</p>
            <div className="flex gap-2">
              {i.status !== "responded" && <button onClick={() => updateStatus(i.id, "responded")} className="text-xs font-body font-semibold text-antigua-blue hover:underline">Mark Responded</button>}
              {i.status !== "closed" && <button onClick={() => updateStatus(i.id, "closed")} className="text-xs font-body font-semibold text-muted-foreground hover:underline">Close</button>}
            </div>
          </div>
        ))}
        {inquiries.length === 0 && <p className="text-center text-sm text-muted-foreground font-body py-12">No inquiries yet.</p>}
      </div>
    </div>
  );
};

export default AdminInquiries;
