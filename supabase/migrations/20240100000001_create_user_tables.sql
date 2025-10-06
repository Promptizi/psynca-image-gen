-- Create studio_user_profiles table
CREATE TABLE IF NOT EXISTS public.studio_user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create studio_user_credits table
CREATE TABLE IF NOT EXISTS public.studio_user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INTEGER DEFAULT 10 CHECK (credits >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.studio_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_user_credits ENABLE ROW LEVEL SECURITY;

-- Policies for studio_user_profiles
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.studio_user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.studio_user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.studio_user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.studio_user_profiles
      WHERE studio_user_profiles.user_id = auth.uid()
      AND studio_user_profiles.role = 'admin'
    )
  );

-- Policies for studio_user_credits
-- Users can view their own credits
CREATE POLICY "Users can view own credits"
  ON public.studio_user_credits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update their own credits (for consuming)
CREATE POLICY "Users can update own credits"
  ON public.studio_user_credits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all credits
CREATE POLICY "Admins can view all credits"
  ON public.studio_user_credits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.studio_user_profiles
      WHERE studio_user_profiles.user_id = auth.uid()
      AND studio_user_profiles.role = 'admin'
    )
  );

-- Admins can update all credits
CREATE POLICY "Admins can update all credits"
  ON public.studio_user_credits
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.studio_user_profiles
      WHERE studio_user_profiles.user_id = auth.uid()
      AND studio_user_profiles.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_studio_user_profiles_email ON public.studio_user_profiles(email);
CREATE INDEX idx_studio_user_profiles_role ON public.studio_user_profiles(role);
CREATE INDEX idx_studio_user_credits_user_id ON public.studio_user_credits(user_id);

-- Trigger to automatically update updated_at on studio_user_profiles
CREATE TRIGGER update_studio_user_profiles_updated_at
    BEFORE UPDATE ON public.studio_user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to automatically update updated_at on studio_user_credits
CREATE TRIGGER update_studio_user_credits_updated_at
    BEFORE UPDATE ON public.studio_user_credits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile and credits on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into studio_user_profiles
  INSERT INTO public.studio_user_profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'user'
  );

  -- Insert into studio_user_credits with 10 initial credits
  INSERT INTO public.studio_user_credits (user_id, credits)
  VALUES (NEW.id, 10);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions
GRANT ALL ON public.studio_user_profiles TO service_role;
GRANT ALL ON public.studio_user_credits TO service_role;
GRANT SELECT, UPDATE ON public.studio_user_profiles TO authenticated;
GRANT SELECT, UPDATE ON public.studio_user_credits TO authenticated;
