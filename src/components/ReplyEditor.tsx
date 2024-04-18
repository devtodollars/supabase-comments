import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Textarea
        className="flex-1 mt-2"
        value={replyText}
        onChange={handleReplyChange}
        placeholder="Write a comment..."
      />
      <div className="flex justify-between items-center mt-2">
        {user && (
          <Button variant="link" onClick={handleLogout} className="ml-1">
            Logout
          </Button>
        )}
        <div className="flex items-center">
          {onClose && (
            <Button className="mr-2" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button onClick={submitReply}>Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyEditor;
