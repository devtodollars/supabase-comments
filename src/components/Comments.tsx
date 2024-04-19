import React from "react";
import { useCommentsContext } from "@/lib/contexts";
import Comment from "@/components/Comment";
import useComments from "@/hooks/useComments";
import CommentSkeleton from "@/components/CommentSkeleton";

export const Comments: React.FC<{ topic: string; parentId: string | null }> = ({
  topic,
  parentId = null,
}) => {
  const { mode } = useCommentsContext();
  const commentsQuery = useComments({ topic, parentId });

  return (
    <div >
      {commentsQuery.isLoading && <CommentSkeleton />}
      {commentsQuery.data &&
        commentsQuery.data.map((comment) => (
          <div className="mb-4">
            <Comment key={comment.id} id={comment.id} />
          </div>
        ))}
    </div>
  );
};

export default Comments;
