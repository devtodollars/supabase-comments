import React from "react";
import { useCommentsContext } from "../contexts";
import { useComments } from "../hooks/useComments";

export const Comments: React.FC<{ topic: string }> = ({ topic }) => {
  const { mode } = useCommentsContext();
  const commentsQuery = useComments({ topic, parentId: null });

  return (
    <div
      style={{
        color: mode === "dark" ? "#fff" : "#000",
        backgroundColor: mode === "dark" ? "#333" : "#eee",
      }}
    >
      {commentsQuery.isLoading && <p>Loading!</p>}
      {commentsQuery.data &&
        commentsQuery.data.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.user_id}</h4>
            <p>{comment.comment}</p>
          </div>
        ))}
    </div>
  );
};
