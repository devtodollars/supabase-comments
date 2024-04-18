import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useAddComment from "@/hooks/useAddComment";

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

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const submitReply = () => {
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
      <div className="flex items-center justify-end mt-2">
        <Button onClick={submitReply} disabled={replyText === ""}>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default ReplyEditor;
