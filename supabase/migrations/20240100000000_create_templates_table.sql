-- Create studio_templates table
CREATE TABLE IF NOT EXISTS public.studio_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail TEXT,
  active BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE public.studio_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow all authenticated users to read active templates
CREATE POLICY "Active templates are viewable by everyone"
  ON public.studio_templates
  FOR SELECT
  TO authenticated, anon
  USING (active = true);

-- Allow admins to perform all operations
CREATE POLICY "Admins can manage templates"
  ON public.studio_templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.studio_user_profiles
      WHERE studio_user_profiles.user_id = auth.uid()
      AND studio_user_profiles.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_studio_templates_category ON public.studio_templates(category);
CREATE INDEX idx_studio_templates_active ON public.studio_templates(active);
CREATE INDEX idx_studio_templates_created_at ON public.studio_templates(created_at DESC);
CREATE INDEX idx_studio_templates_tags ON public.studio_templates USING GIN(tags);

-- Create storage bucket for studio thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('studio-thumbnails', 'studio-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to studio thumbnails
CREATE POLICY "Studio thumbnails are publicly accessible"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'studio-thumbnails');

-- Allow authenticated users to upload studio thumbnails
CREATE POLICY "Authenticated users can upload studio thumbnails"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'studio-thumbnails');

-- Allow authenticated users to update their own studio thumbnails
CREATE POLICY "Users can update studio thumbnails"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'studio-thumbnails')
  WITH CHECK (bucket_id = 'studio-thumbnails');

-- Allow authenticated users to delete studio thumbnails
CREATE POLICY "Users can delete studio thumbnails"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'studio-thumbnails');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_studio_templates_updated_at
    BEFORE UPDATE ON public.studio_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some default templates
INSERT INTO public.studio_templates (title, prompt, category, thumbnail, active, tags)
VALUES
  ('Retrato Profissional',
   'Professional corporate headshot portrait with formal business attire, neutral background, confident expression, studio lighting',
   'Profissional',
   '/placeholder.svg',
   true,
   ARRAY['profissional', 'corporativo', 'retrato']),

  ('LinkedIn Profile',
   'Modern LinkedIn profile photo, business casual attire, friendly approachable expression, clean professional background',
   'Profissional',
   '/placeholder.svg',
   true,
   ARRAY['linkedin', 'rede social', 'profissional']),

  ('Foto Corporativa',
   'Executive corporate portrait, formal suit, office environment background, confident professional posture',
   'Corporativo',
   '/placeholder.svg',
   true,
   ARRAY['corporativo', 'executivo', 'formal']),

  ('Consultor Expert',
   'Expert consultant professional photo, smart casual dress code, modern office setting, trustworthy expression',
   'Consultoria',
   '/placeholder.svg',
   true,
   ARRAY['consultor', 'expert', 'business']),

  ('Palestrante',
   'Professional speaker portrait, dynamic confident pose, stage or conference background, engaging expression',
   'Palestrante',
   '/placeholder.svg',
   true,
   ARRAY['palestrante', 'speaker', 'eventos'])
ON CONFLICT (id) DO NOTHING;

-- Grant permissions to service role
GRANT ALL ON public.studio_templates TO service_role;