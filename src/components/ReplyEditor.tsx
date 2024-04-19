import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useAddComment from "@/hooks/useAddComment";
import useAuth from "@/hooks/useAuth";
import { useCommentsContext } from "@/lib/contexts";
import ProfileDialog from "@/components/ProfileDialog";

interface ReplyEditorProps {
  parentId: string | null;
  topic: string;
  onClose?: () => void;
}

const ReplyEditor: React.FC<ReplyEditorProps> = ({
  parentId,
  topic,
  onClose,
}) => {
  const [replyText, setReplyText] = useState<string>("");
  const addCommentMutation = useAddComment();
  const { setShowAuthDialog } = useCommentsContext();
  const { user } = useAuth();

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const submitReply = () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    console.log("Submitting reply:", replyText);
    addCommentMutation.mutate({
      topic: topic,
      comment: replyText,
      parentId: parentId,
    });
    setReplyText("");
    onClose?.();
  };

  return (
    <div className="flex flex-col">
      <Textarea
        autoFocus={parentId != null}
        className="flex-1 mt-2"
        value={replyText}
        onChange={handleReplyChange}
        placeholder="Write a comment..."
      />
      <div className="flex items-center justify-between mt-2 mb-8">
        {user && <ProfileDialog />}
        <div className="flex-grow"></div>
        <Button
          onClick={submitReply}
          disabled={replyText === "" && user !== null}
        >
          {user ? "Comment" : "Login to comment"}
        </Button>
      </div>
    </div>
  );
};

export default ReplyEditor;
