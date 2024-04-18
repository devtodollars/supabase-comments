import React from "react";
import { useCommentsContext } from "../contexts";
import Comment from "./Comment";
import useComments from "../hooks/useComments";
import ReplyEditor from "./ReplyEditor";

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
      <ReplyEditor parentId={parentId} topic={topic} />
      {commentsQuery.isLoading && <p>Loading...</p>}
      {commentsQuery.data &&
        commentsQuery.data.map((comment) => (
          <Comment key={comment.id} id={comment.id} />
        ))}
    </div>
  );
};
