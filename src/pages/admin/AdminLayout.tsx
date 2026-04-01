import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, MessageSquare, MapPin, Image, Star, Settings, ArrowLeft, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Bookings", icon: Calendar, to: "/admin/bookings" },
  { label: "Inquiries", icon: MessageSquare, to: "/admin/inquiries" },
  { label: "Tours", icon: MapPin, to: "/admin/tours" },
  { label: "Gallery", icon: Image, to: "/admin/gallery" },
  { label: "Reviews", icon: Star, to: "/admin/reviews" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-cloud">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-shadow transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-antigua-white/10 flex items-center justify-between">
            <div>
              <span className="font-accent text-antigua-gold text-lg block">DARYL'S</span>
              <span className="font-body text-[9px] tracking-[2px] text-antigua-white/50">ADMIN PANEL</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-antigua-white/50"><X size={20} /></button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                    active
                      ? "text-antigua-gold bg-antigua-gold/10 border-l-2 border-antigua-gold"
                      : "text-antigua-white/60 hover:text-antigua-white hover:bg-antigua-white/5"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 space-y-1 border-t border-antigua-white/10">
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-antigua-white/40 hover:text-antigua-white transition-colors">
              <ArrowLeft size={18} /> Back to Site
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-antigua-white/40 hover:text-antigua-red transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-antigua-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 bg-background border-b border-mist flex items-center px-4 gap-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground"><Menu size={20} /></button>
          <span className="text-sm font-body text-muted-foreground">Admin Dashboard</span>
        </header>
        <main className="flex-1 p-4 lg:p-6 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
