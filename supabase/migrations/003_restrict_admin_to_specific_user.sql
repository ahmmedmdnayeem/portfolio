-- Lock down admin writes to specific user UUIDs instead of any authenticated user.
-- This prevents anyone who signs up via Supabase Auth (if signups remain enabled)
-- from gaining admin privileges.

-- Replace the broad authenticated-role policies with email-allowlist policies.
DROP POLICY IF EXISTS "Admin full access projects" ON projects;
DROP POLICY IF EXISTS "Admin full access skills" ON skills;
DROP POLICY IF EXISTS "Admin full access experience" ON experience;
DROP POLICY IF EXISTS "Admin full access certifications" ON certifications;
DROP POLICY IF EXISTS "Admin full access testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin read messages" ON contact_messages;

-- Helper: check if the calling user's email is in our allowlist.
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND lower(email) IN ('amnayeem.dev@gmail.com')
  );
$$;

CREATE POLICY "Admin email full access projects" ON projects
  FOR ALL USING (public.is_admin_user());
CREATE POLICY "Admin email full access skills" ON skills
  FOR ALL USING (public.is_admin_user());
CREATE POLICY "Admin email full access experience" ON experience
  FOR ALL USING (public.is_admin_user());
CREATE POLICY "Admin email full access certifications" ON certifications
  FOR ALL USING (public.is_admin_user());
CREATE POLICY "Admin email full access testimonials" ON testimonials
  FOR ALL USING (public.is_admin_user());
CREATE POLICY "Admin email full access messages" ON contact_messages
  FOR ALL USING (public.is_admin_user());

-- Note: the existing "Public read X" SELECT policies and "Public insert messages"
-- INSERT policy remain in place — they're correct and needed for the public site.
