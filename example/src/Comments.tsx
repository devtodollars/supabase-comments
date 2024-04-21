import { createClient } from "@supabase/supabase-js";
import { CommentsSection } from "supabase-comments";
import "supabase-comments/style.css";
import "./shadecn-theme.css"

const SUPABASE_URL = "https://bgzlfawsgmedzuflckpb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnemxmYXdzZ21lZHp1Zmxja3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MDYxNjgsImV4cCI6MjAyOTI4MjE2OH0.C7O_BPQG2M4vpPHIWXAi1Ak0py1kzR4AOI2Su0UUR98";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Comments() {
  return (
    <CommentsSection
      topic="supabase-comments-demo-topic"
      supabaseClient={supabase}
      mode={"dark"}
    />
  );
}

export default Comments;
