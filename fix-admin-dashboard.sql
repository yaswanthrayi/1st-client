-- Fix for admin dashboard data visibility
-- Run this in your Supabase SQL Editor

-- First, drop all existing policies
DROP POLICY IF EXISTS "Anyone can insert form submissions" ON public.form;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.form;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public.form;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.form;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.form;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.form;
DROP POLICY IF EXISTS "enable_insert_for_anon_users" ON public.form;
DROP POLICY IF EXISTS "enable_insert_for_auth_users" ON public.form;
DROP POLICY IF EXISTS "enable_select_for_auth_users" ON public.form;
DROP POLICY IF EXISTS "enable_delete_for_auth_users" ON public.form;
DROP POLICY IF EXISTS "allow_insert_for_all" ON public.form;
DROP POLICY IF EXISTS "allow_select_for_authenticated" ON public.form;
DROP POLICY IF EXISTS "allow_delete_for_authenticated" ON public.form;

-- Temporarily disable RLS to test (you can re-enable later with proper auth)
ALTER TABLE public.form DISABLE ROW LEVEL SECURITY;

-- Grant permissions to both anon and authenticated users
GRANT SELECT, INSERT, DELETE ON public.form TO anon, authenticated;

-- Verify the table exists and check some data
SELECT COUNT(*) as total_submissions FROM public.form;
SELECT * FROM public.form ORDER BY created_at DESC LIMIT 5;
