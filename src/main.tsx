import { createClient } from "@supabase/supabase-js";
import Comments from "@/components/Comments";
import CommentsProvider from "@/components/CommentsProvider";
import ReplyEditor from "@/components/ReplyEditor";
import React from "react";
import ReactDOM from "react-dom/client";
import Profile from "./components/Profile";

const SUPABASE_URL = "http://localhost:54321";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CommentsProvider supabaseClient={supabase}>
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="w-full max-w-2xl">
          <Profile />
          <ReplyEditor topic="Single Topic" parentId={null} />
          <Comments topic="Single Topic" parentId={null} />
        </div>
      </div>
    </CommentsProvider>
  </React.StrictMode>,
);
