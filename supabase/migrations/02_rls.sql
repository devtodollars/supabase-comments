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
