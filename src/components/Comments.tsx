import React from "react";
import { useCommentsContext } from "@/lib/contexts";
import Comment from "@/components/Comment";
import useComments from "@/hooks/useComments";

export const Comments: React.FC<{ topic: string; parentId: string | null }> = ({
  topic,
  parentId = null,
}) => {
  const { mode } = useCommentsContext();
  const commentsQuery = useComments({ topic, parentId });

  return (
    <div
      style={{
        color: mode === "dark" ? "#fff" : "#000",
        backgroundColor: mode === "dark" ? "#333" : "#eee",
      }}
    >
      {commentsQuery.isLoading && <p>Loading...</p>}
      {commentsQuery.data &&
        commentsQuery.data.map((comment) => (
          <Comment key={comment.id} id={comment.id} />
        ))}
    </div>
  );
};

export default Comments;
