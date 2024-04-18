import React, { useState } from "react";
import useAddComment from "@/hooks/useAddComment";
import useAuth from "@/hooks/useAuth";

interface ReplyEditorProps {
  parentId: string | null;
  topic: string;
  onClose?: () => void;
  onLogout?: () => void;
}

const ReplyEditor: React.FC<ReplyEditorProps> = ({
  parentId,
  topic,
  onClose,
  onLogout,
}) => {
  const { logout } = useAuth();
  const [replyText, setReplyText] = useState<string>("");
  const addCommentMutation = useAddComment();

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const handleLogout = async () => {
    await logout();
    onLogout?.();
  };

  const submitReply = () => {
    console.log("Submitting reply:", replyText);
    addCommentMutation.mutate({
      topic: topic,
      comment: replyText,
      parentId: parentId,
    });
    setReplyText(""); // Reset the reply input field after submit
    onClose?.();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <input
        type="text"
        value={replyText}
        onChange={handleReplyChange}
        placeholder="Write a reply..."
      />
      <button onClick={submitReply}>Submit Reply</button>
      {onClose && <button onClick={onClose}>Cancel</button>}
    </div>
  );
};

export default ReplyEditor;
