import { createClient } from "@supabase/supabase-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeMinimal } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import CommentsSection from "@/components/CommentsSection";

const SUPABASE_URL = "http://localhost:54321";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CommentsSection
      topic="Single Topic"
      supabaseClient={supabase}
      authComponent={
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
      }
    />
  </React.StrictMode>,
);
