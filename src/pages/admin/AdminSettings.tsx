import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const defaultSettings = [
  { key: "phone", label: "Phone Number", value: "+1 (268) 123-4567" },
  { key: "whatsapp", label: "WhatsApp Number", value: "+12681234567" },
  { key: "email", label: "Email", value: "info@darylstours.com" },
  { key: "address", label: "Address", value: "St. John's, Antigua & Barbuda" },
  { key: "hours_weekday", label: "Weekday Hours", value: "Mon–Sat: 6:00 AM – 10:00 PM" },
  { key: "hours_weekend", label: "Weekend Hours", value: "Sun: 7:00 AM – 8:00 PM" },
  { key: "instagram", label: "Instagram URL", value: "" },
  { key: "facebook", label: "Facebook URL", value: "" },
  { key: "tripadvisor", label: "TripAdvisor URL", value: "" },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, string> = {};
      (data || []).forEach(s => { map[s.key] = s.value; });
      defaultSettings.forEach(d => { if (!map[d.key]) map[d.key] = d.value; });
      setSettings(map);
    };
    load();
  }, []);

  const save = async () => {
    setLoading(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert({ key, value: value.slice(0, 500) }, { onConflict: "key" });
    }
    setLoading(false);
    toast({ title: "Settings saved" });
  };

  return (
    <div>
      <h1 className="text-2xl font-display text-foreground mb-6">Settings</h1>
      <div className="bg-background rounded-xl border border-mist p-6 max-w-lg space-y-4">
        {defaultSettings.map(d => (
          <div key={d.key}>
            <label className="block text-sm font-body font-medium text-foreground mb-1">{d.label}</label>
            <input
              value={settings[d.key] || ""}
              onChange={e => setSettings({ ...settings, [d.key]: e.target.value })}
              className="w-full border border-mist rounded-lg px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:border-antigua-blue"
              maxLength={500}
            />
          </div>
        ))}
        <button onClick={save} disabled={loading} className="gradient-gold-cta text-antigua-black font-accent px-6 py-2.5 rounded-lg text-xs disabled:opacity-50">
          {loading ? "SAVING..." : "SAVE SETTINGS"}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
