import React from "react";
import { DisplayUser } from "../types";
import { useCommentsContext } from "../contexts";
import { useComments } from "../hooks/useComments";

export const Comment: React.FC = () => {
  const { onUserClick, mode } = useCommentsContext();
  const commentsQuery = useComments("hello");

  const handleUserClick = (user: DisplayUser) => {
    // Propagates the click handling to the context's onUserClick, if available
    onUserClick?.(user);
  };

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
          <div key={comment.id} onClick={() => handleUserClick(comment.user)}>
            <h4>{comment.user.name}</h4>
            <p>{comment.comment}</p>
          </div>
        ))}
    </div>
  );
};
