-- Create table in the public schema with the sc_ prefix
CREATE TABLE public.sc_comments (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    topic character varying NOT NULL,
    comment character varying NOT NULL,
    user_id uuid NOT NULL,
    parent_id uuid
);

-- Create a unique index on the ID column with the sc_ prefix
CREATE UNIQUE INDEX sc_comments_pkey ON public.sc_comments USING btree (id);

-- Add primary key constraint using the prefixed index
ALTER TABLE public.sc_comments ADD CONSTRAINT sc_comments_pkey PRIMARY KEY USING INDEX sc_comments_pkey;

-- Add foreign key constraints in the public schema with the sc_ prefix
ALTER TABLE public.sc_comments ADD CONSTRAINT sc_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.sc_comments(id) ON DELETE CASCADE;
ALTER TABLE public.sc_comments ADD CONSTRAINT sc_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create views within the public schema with the sc_ prefix
CREATE OR REPLACE VIEW public.sc_comments_with_metadata AS
SELECT
    sc_comments.id,
    sc_comments.created_at,
    sc_comments.topic,
    sc_comments.comment,
    sc_comments.user_id,
    sc_comments.parent_id,
    (SELECT count(*) FROM public.sc_comments c WHERE c.parent_id = sc_comments.id) AS replies_count
FROM public.sc_comments;

CREATE OR REPLACE VIEW public.sc_display_users AS
SELECT
    users.id,
    COALESCE(users.raw_user_meta_data ->> 'name', users.raw_user_meta_data ->> 'full_name', users.raw_user_meta_data ->> 'user_name') AS name,
    COALESCE(users.raw_user_meta_data ->> 'avatar_url', users.raw_user_meta_data ->> 'avatar') AS avatar
FROM auth.users;

-- Enable Row-Level Security on the table
ALTER TABLE public.sc_comments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to select (view) comments
CREATE POLICY "Enable access to all users"
    ON public.sc_comments
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

-- Create policy to allow users to delete their own comments
CREATE POLICY "Enable delete for users based on user_id"
    ON public.sc_comments
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING ((auth.uid() = user_id));

-- Create policy to allow authenticated users to insert new comments
CREATE POLICY "Enable insert for authenticated users only"
    ON public.sc_comments
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.role() = 'authenticated') AND (user_id = auth.uid()));

-- Create policy to allow users to update their own comments
CREATE POLICY "Enable update for users based on user_id"
    ON public.sc_comments
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING ((auth.uid() = user_id))
    WITH CHECK (auth.uid() = user_id);
