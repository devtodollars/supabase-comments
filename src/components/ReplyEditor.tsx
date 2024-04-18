import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  const { user, logout } = useAuth();
  const [replyText, setReplyText] = useState<string>("");
  const addCommentMutation = useAddComment();

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="flex flex-col">
      <Textarea
        className="flex-1 mt-2"
        value={replyText}
        onChange={handleReplyChange}
        placeholder="Write a comment..."
      />
      <div className="flex items-center justify-end mt-2">
        <Button onClick={submitReply}>Comment</Button>
      </div>
    </div>
  );
};

export default ReplyEditor;
