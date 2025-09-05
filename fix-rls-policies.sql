-- Quick fix for RLS policy issues
-- Run this in your Supabase SQL Editor

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Anyone can insert form submissions" ON public.form;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.form;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public.form;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.form;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.form;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.form;

-- Create new simplified policies
CREATE POLICY "enable_insert_for_anon_users" ON public.form
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "enable_insert_for_auth_users" ON public.form
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "enable_select_for_auth_users" ON public.form
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "enable_delete_for_auth_users" ON public.form
  FOR DELETE TO authenticated USING (true);

-- Make sure the table has the right permissions
GRANT INSERT ON public.form TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.form TO authenticated;

-- Check if table exists and show current policies
SELECT * FROM pg_policies WHERE tablename = 'form';
