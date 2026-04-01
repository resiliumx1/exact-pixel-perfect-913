import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, AlertCircle, DollarSign, Star } from "lucide-react";

interface Stats {
  todayBookings: number;
  pendingInquiries: number;
  monthRevenue: number;
  totalReviews: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ todayBookings: 0, pendingInquiries: 0, monthRevenue: 0, totalReviews: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().split("T")[0];
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

      const [bToday, iPending, bMonth, tCount, bRecent, iRecent] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("service_date", today),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("bookings").select("amount").eq("status", "confirmed").gte("created_at", monthStart),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(10),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const revenue = (bMonth.data || []).reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
      setStats({
        todayBookings: bToday.count || 0,
        pendingInquiries: iPending.count || 0,
        monthRevenue: revenue,
        totalReviews: tCount.count || 0,
      });
      setRecentBookings(bRecent.data || []);
      setRecentInquiries(iRecent.data || []);
    };
    load();
  }, []);

  const statCards = [
    { label: "Today's Bookings", value: stats.todayBookings, icon: Calendar, color: "text-antigua-blue" },
    { label: "Pending Inquiries", value: stats.pendingInquiries, icon: AlertCircle, color: "text-antigua-red", badge: stats.pendingInquiries > 0 },
    { label: "This Month's Revenue", value: `$${stats.monthRevenue.toLocaleString()}`, icon: DollarSign, color: "text-antigua-gold" },
    { label: "Total Reviews", value: stats.totalReviews, icon: Star, color: "text-antigua-gold" },
  ];

  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-antigua-blue/10 text-antigua-blue",
    cancelled: "bg-red-100 text-red-800",
    new: "bg-antigua-blue/10 text-antigua-blue",
    responded: "bg-emerald-100 text-emerald-800",
    closed: "bg-mist text-slate",
  };

  return (
    <div>
      <h1 className="text-2xl font-display text-foreground mb-6">Welcome back, Daryl 👋</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-background rounded-xl border border-mist p-4 relative">
            <s.icon size={20} className={`${s.color} mb-2`} />
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-xs font-body text-muted-foreground">{s.label}</p>
            {s.badge && <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-antigua-red animate-pulse" />}
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-background rounded-xl border border-mist mb-6">
        <div className="px-4 py-3 border-b border-mist">
          <h2 className="text-sm font-body font-semibold text-foreground">Recent Bookings</h2>
        </div>
        {recentBookings.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground font-body">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-mist text-xs font-body text-muted-foreground">
                <th className="px-4 py-2 text-left">Date</th><th className="px-4 py-2 text-left">Customer</th><th className="px-4 py-2 text-left">Service</th><th className="px-4 py-2 text-left">Status</th>
              </tr></thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-mist/50 last:border-0">
                    <td className="px-4 py-2.5 text-xs font-body text-foreground">{b.service_date}</td>
                    <td className="px-4 py-2.5 text-xs font-body text-foreground">{b.customer_name}</td>
                    <td className="px-4 py-2.5 text-xs font-body text-muted-foreground capitalize">{b.service_type}</td>
                    <td className="px-4 py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-medium ${statusColor[b.status] || "bg-mist text-slate"}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-background rounded-xl border border-mist">
        <div className="px-4 py-3 border-b border-mist">
          <h2 className="text-sm font-body font-semibold text-foreground">Recent Inquiries</h2>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground font-body">No inquiries yet.</p>
        ) : (
          <div className="divide-y divide-mist/50">
            {recentInquiries.map((i) => (
              <div key={i.id} className="px-4 py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{i.name}</p>
                    <p className="text-xs text-muted-foreground font-body line-clamp-1">{i.message}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-medium ${statusColor[i.status] || "bg-mist text-slate"}`}>{i.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
