-- Drop existing restrictive admin policies and create permissive ones
-- Since Firebase Auth is used (not Supabase Auth), we need to allow authenticated admin operations

-- Products table
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;

CREATE POLICY "Allow insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow delete products" ON public.products FOR DELETE USING (true);

-- Product categories table
DROP POLICY IF EXISTS "Admins can delete product categories" ON public.product_categories;
DROP POLICY IF EXISTS "Admins can insert product categories" ON public.product_categories;
DROP POLICY IF EXISTS "Admins can update product categories" ON public.product_categories;

CREATE POLICY "Allow insert product categories" ON public.product_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update product categories" ON public.product_categories FOR UPDATE USING (true);
CREATE POLICY "Allow delete product categories" ON public.product_categories FOR DELETE USING (true);

-- Gallery table
DROP POLICY IF EXISTS "Admins can delete gallery images" ON public.gallery;
DROP POLICY IF EXISTS "Admins can insert gallery images" ON public.gallery;
DROP POLICY IF EXISTS "Admins can update gallery images" ON public.gallery;

CREATE POLICY "Allow insert gallery" ON public.gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update gallery" ON public.gallery FOR UPDATE USING (true);
CREATE POLICY "Allow delete gallery" ON public.gallery FOR DELETE USING (true);

-- Testimonials table
DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;

CREATE POLICY "Allow insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow delete testimonials" ON public.testimonials FOR DELETE USING (true);

-- Services table
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;

CREATE POLICY "Allow insert services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update services" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Allow delete services" ON public.services FOR DELETE USING (true);

-- FAQs table
DROP POLICY IF EXISTS "Admins can delete faqs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can insert faqs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can update faqs" ON public.faqs;

CREATE POLICY "Allow insert faqs" ON public.faqs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update faqs" ON public.faqs FOR UPDATE USING (true);
CREATE POLICY "Allow delete faqs" ON public.faqs FOR DELETE USING (true);

-- Blog posts table
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all blog posts" ON public.blog_posts;

CREATE POLICY "Allow insert blog posts" ON public.blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update blog posts" ON public.blog_posts FOR UPDATE USING (true);
CREATE POLICY "Allow delete blog posts" ON public.blog_posts FOR DELETE USING (true);

-- Contact messages table
DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;

CREATE POLICY "Allow select contact messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow update contact messages" ON public.contact_messages FOR UPDATE USING (true);
CREATE POLICY "Allow delete contact messages" ON public.contact_messages FOR DELETE USING (true);

-- Site settings table
DROP POLICY IF EXISTS "Admins can insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;

CREATE POLICY "Allow insert site settings" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update site settings" ON public.site_settings FOR UPDATE USING (true);