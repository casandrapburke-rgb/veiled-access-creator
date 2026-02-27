
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can manage access_keys" ON public.access_keys;
DROP POLICY IF EXISTS "Admins can insert audit_log" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Admins can view audit_log" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Admins can manage messages" ON public.messages;

-- Create permissive policies allowing all operations (anon + authenticated)
-- Security is enforced by the admin key validation edge function
CREATE POLICY "Allow all access_keys operations" ON public.access_keys FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all audit_log operations" ON public.admin_audit_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all messages operations" ON public.messages FOR ALL USING (true) WITH CHECK (true);
