-- Create home_content table to manage hero section content
CREATE TABLE public.home_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  cta_primary_text TEXT,
  cta_secondary_text TEXT,
  image_url TEXT,
  background_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public access and admin management
CREATE POLICY "Public can view active home content" 
ON public.home_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage home content" 
ON public.home_content 
FOR ALL 
USING (is_admin());

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_home_content_updated_at
BEFORE UPDATE ON public.home_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default hero content
INSERT INTO public.home_content (section_key, title, subtitle, description, cta_primary_text, cta_secondary_text) VALUES 
('hero', 'Fast, Expert', 'Electronics Repair', 'Smartphones, Laptops, Tablets & More. Same-day diagnostics with certified technicians using genuine parts.', 'Book a Repair', 'Call Now');