
-- Drop the restrictive policy and replace with a permissive one
DROP POLICY IF EXISTS "Allow all applications operations" ON public.applications;
CREATE POLICY "Allow all applications operations" ON public.applications FOR ALL USING (true) WITH CHECK (true);
