import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import AntiguaSunIcon from "@/components/antiguan/AntiguaSunIcon";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import TaxiServices from "./pages/TaxiServices";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminTours = lazy(() => import("./pages/admin/AdminTours"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:bg-antigua-gold focus:text-antigua-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-body"
      >
        Skip to content
      </a>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <AntiguaSunIcon size={48} className="text-antigua-gold animate-spin-slow" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetail />} />
          <Route path="/taxi-services" element={<TaxiServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
