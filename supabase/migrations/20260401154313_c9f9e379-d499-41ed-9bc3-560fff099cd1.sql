CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  duration_hours DECIMAL(4,1),
  category TEXT,
  difficulty TEXT,
  max_guests INTEGER,
  included TEXT[],
  what_to_bring TEXT[],
  images TEXT[],
  hero_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published tours" ON public.tours FOR SELECT USING (is_published = true);
CREATE POLICY "Authenticated users have full access to tours" ON public.tours FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON public.tours FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  tour_id UUID REFERENCES public.tours(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp TEXT,
  service_date DATE NOT NULL,
  service_time TIME,
  num_guests INTEGER DEFAULT 1,
  pickup_location TEXT,
  dropoff_location TEXT,
  special_requests TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending',
  amount DECIMAL(10,2),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can manage bookings" ON public.bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can manage inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  country TEXT,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  tour_taken TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible testimonials" ON public.testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  category TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible gallery images" ON public.gallery_images FOR SELECT USING (is_visible = true);
CREATE POLICY "Authenticated users can manage gallery images" ON public.gallery_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.taxi_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.taxi_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active taxi routes" ON public.taxi_routes FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage taxi routes" ON public.taxi_routes FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();