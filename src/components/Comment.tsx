import React, { useEffect, useState } from "react";
import useComment from "@/hooks/useComment";
import { Comments } from "@/components/Comments";
import useAddComment from "@/hooks/useAddComment";
import useAuth from "@/hooks/useAuth";
import AuthDialog from "@/components/AuthDialog";
import ReplyEditor from "@/components/ReplyEditor";

const Comment: React.FC<{ id: string }> = ({ id }) => {
  const { data: comment, isLoading } = useComment({ id });
  const addCommentMutation = useAddComment();
  const { user } = useAuth();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // close auth dialog if logged in
  useEffect(() => {
    if (user) setShowAuthDialog(false);
  }, [user]);

  // show replies after comment
  useEffect(() => {
    if (addCommentMutation.isSuccess) {
      setShowReplies(true);
    }
  }, [addCommentMutation.isSuccess]);

  const handleReplyBox = async () => {
    if (user == null) {
      setShowAuthDialog(true); // Show auth dialog if not authenticated
      return;
    }
    return setShowReplyEditor((prev) => !prev);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {comment && (
        <div key={comment.id}>
          <h4>{comment.user.name}</h4>
          <p>{comment.created_at}</p>
          <p>{comment.comment}</p>
          {comment.replies_count > 0 && (
            <button onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? "Hide Replies" : `View  Replies`}
            </button>
          )}
          <button onClick={handleReplyBox}>
            {showReplyEditor ? "Cancel" : "Reply"}
          </button>
          {showReplyEditor && (
            <ReplyEditor
              parentId={comment.id}
              topic={comment.topic}
              onClose={() => setShowReplyEditor(false)}
              onLogout={() => setShowAuthDialog(false)}
            />
          )}
          {showReplies && (
            <div
              style={{
                paddingLeft: "15px",
                marginLeft: "5px",
                borderLeft: "3px solid #ccc",
              }}
            >
              <Comments topic={comment.topic} parentId={comment.id} />
            </div>
          )}
        </div>
      )}
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />
    </div>
  );
};

export default Comment;
