import React, { useEffect, useState } from "react";
import useComment from "../hooks/useComment";
import { Comments } from "./Comments";
import useAddComment from "../hooks/useAddComment";
import { useAuth } from "../hooks/useAuth";
import AuthDialog from "./AuthDialog";

const Comment: React.FC<{ id: string }> = ({ id }) => {
  const { data: comment, isLoading } = useComment({ id });
  const addCommentMutation = useAddComment();
  const { user, logout } = useAuth();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
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

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const handleLogout = async () => {
    await logout();
    return setShowReplyBox(false);
  };

  const handleReplyBox = async () => {
    if (user == null) {
      setShowAuthDialog(true); // Show auth dialog if not authenticated
      return;
    }
    return setShowReplyBox((prev) => !prev);
  };
  const submitReply = () => {
    if (!comment) return;
    // open auth dialog if not logged in

    console.log("Submitting reply:", replyText);
    addCommentMutation.mutate({
      topic: comment.topic,
      comment: replyText,
      parentId: comment.id,
    });
    // Add logic here to submit the reply to the server.
    setReplyText(""); // Reset the reply input field after submit
    // Optionally hide the reply box after submitting
    setShowReplyBox(false);
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
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
          {showReplyBox && (
            <div>
              <button onClick={handleLogout}>Logout</button>
              <input
                type="text"
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
              />
              <button onClick={submitReply}>Submit Reply</button>
            </div>
          )}
          {showReplies && (
            <div
              style={{
                paddingLeft: "15px",
                marginLeft: "5px",
                borderLeft: "3px solid #ccc",
              }}
            >
              {/* Here you would render the list of replies, for now showing a placeholder */}
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
