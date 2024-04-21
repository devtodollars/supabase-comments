import React, { ReactNode } from "react";
import CommentsProvider from "@/components/CommentsProvider";
import Comments from "@/components/Comments";
import ReplyEditor from "@/components/ReplyEditor";
import { SupabaseClient } from "@supabase/supabase-js";

export interface CommentsSectionProps {
  supabaseClient: SupabaseClient;
  topic: string;
  authComponent?: ReactNode;
  mode: "light" | "dark";
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  supabaseClient,
  authComponent,
  topic,
  mode,
}) => {
  return (
    <CommentsProvider
      supabaseClient={supabaseClient}
      authComponent={authComponent}
      mode={mode}
    >
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="w-full max-w-2xl">
          <ReplyEditor topic={topic} parentId={null} />
          <Comments topic={topic} parentId={null} />
        </div>
      </div>
    </CommentsProvider>
  );
};

export default CommentsSection;
