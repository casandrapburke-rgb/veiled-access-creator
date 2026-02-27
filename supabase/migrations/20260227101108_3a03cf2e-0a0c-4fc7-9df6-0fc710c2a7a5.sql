
CREATE TABLE public.applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  gender text,
  age integer NOT NULL,
  country text,
  state text,
  city text,
  address text,
  occupation text,
  income numeric,
  marital_status text,
  parent_name text,
  phone text,
  email text,
  purpose text,
  agent_id text NOT NULL,
  photo_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all applications operations" ON public.applications FOR ALL USING (true) WITH CHECK (true);
