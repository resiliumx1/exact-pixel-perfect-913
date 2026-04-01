import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Search, Smartphone, X } from "lucide-react";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-antigua-blue/10 text-antigua-blue",
  cancelled: "bg-red-100 text-red-800",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<any | null>(null);
  const [notes, setNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const load = async () => {
    let q = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") q = q.eq("status", statusFilter);
    if (search.trim()) q = q.ilike("customer_name", `%${search.trim()}%`);
    const { data } = await q;
    setBookings(data || []);
  };

  useEffect(() => { load(); }, [statusFilter, search]);

  const openDetail = (b: any) => {
    setSelected(b);
    setNotes(b.admin_notes || "");
    setNewStatus(b.status);
  };

  const saveDetail = async () => {
    if (!selected) return;
    await supabase.from("bookings").update({ status: newStatus, admin_notes: notes.slice(0, 2000) }).eq("id", selected.id);
    toast({ title: "Booking updated" });
    setSelected(null);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-display text-foreground mb-6">Bookings</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer name..." className="w-full pl-9 pr-4 py-2 border border-mist rounded-lg font-body text-sm bg-background text-foreground focus:outline-none focus:border-antigua-blue" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-mist rounded-lg px-3 py-2 font-body text-sm bg-background text-foreground">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-background rounded-xl border border-mist overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-mist text-xs font-body text-muted-foreground">
            <th className="px-4 py-2.5 text-left">Date</th>
            <th className="px-4 py-2.5 text-left">Customer</th>
            <th className="px-4 py-2.5 text-left">Service</th>
            <th className="px-4 py-2.5 text-left">Status</th>
            <th className="px-4 py-2.5 text-left">Amount</th>
            <th className="px-4 py-2.5"></th>
          </tr></thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-mist/50 last:border-0 hover:bg-sand/50 cursor-pointer" onClick={() => openDetail(b)}>
                <td className="px-4 py-2.5 text-xs font-body">{b.service_date}</td>
                <td className="px-4 py-2.5 text-xs font-body font-medium">{b.customer_name}</td>
                <td className="px-4 py-2.5 text-xs font-body text-muted-foreground capitalize">{b.service_type}</td>
                <td className="px-4 py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[b.status] || "bg-mist text-slate"}`}>{b.status}</span></td>
                <td className="px-4 py-2.5 text-xs font-body">{b.amount ? `$${b.amount}` : "—"}</td>
                <td className="px-4 py-2.5 text-xs text-antigua-blue font-body">View</td>
              </tr>
            ))}
            {bookings.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground font-body">No bookings found.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-antigua-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-background rounded-xl border border-mist max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-display text-foreground">Booking Details</h2>
              <button onClick={() => setSelected(null)}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3 text-sm font-body">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Customer:</span> <strong>{selected.customer_name}</strong></div>
                <div><span className="text-muted-foreground">Email:</span> {selected.customer_email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.customer_phone}</div>
                <div><span className="text-muted-foreground">Service:</span> <span className="capitalize">{selected.service_type}</span></div>
                <div><span className="text-muted-foreground">Date:</span> {selected.service_date}</div>
                <div><span className="text-muted-foreground">Time:</span> {selected.service_time || "TBD"}</div>
                <div><span className="text-muted-foreground">Guests:</span> {selected.num_guests}</div>
                {selected.pickup_location && <div><span className="text-muted-foreground">Pickup:</span> {selected.pickup_location}</div>}
                {selected.dropoff_location && <div><span className="text-muted-foreground">Dropoff:</span> {selected.dropoff_location}</div>}
              </div>
              {selected.special_requests && <div><span className="text-muted-foreground">Requests:</span><p className="mt-1 text-foreground">{selected.special_requests}</p></div>}

              <div>
                <label className="block text-muted-foreground mb-1">Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="w-full border border-mist rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                  {["pending", "confirmed", "completed", "cancelled"].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-muted-foreground mb-1">Admin Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border border-mist rounded-lg px-3 py-2 text-sm bg-background text-foreground min-h-[80px]" maxLength={2000} />
              </div>
              <div className="flex gap-2">
                <button onClick={saveDetail} className="gradient-gold-cta text-antigua-black font-accent px-4 py-2 rounded-lg text-xs">SAVE</button>
                <a
                  href={`https://wa.me/${selected.customer_phone?.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${selected.customer_name}! This is Daryl from Extreme Island Tours regarding your ${selected.service_type} booking on ${selected.service_date}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-whatsapp text-antigua-white px-4 py-2 rounded-lg text-xs font-body font-semibold inline-flex items-center gap-1"
                >
                  <Smartphone size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
