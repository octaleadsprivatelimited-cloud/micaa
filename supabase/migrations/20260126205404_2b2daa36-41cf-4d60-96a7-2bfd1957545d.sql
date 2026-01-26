-- Create a table to store Firebase admin emails
CREATE TABLE public.firebase_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.firebase_admins ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (needed for checking admin status)
CREATE POLICY "Anyone can view firebase admins"
ON public.firebase_admins
FOR SELECT
USING (true);

-- Insert your admin email (replace with your actual admin email)
INSERT INTO public.firebase_admins (email) VALUES ('admin@svnglobal.com');