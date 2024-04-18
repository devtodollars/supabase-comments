import React, { useEffect, useState } from "react";
import useComment from "@/hooks/useComment";
import { Comments } from "@/components/Comments";
import useAddComment from "@/hooks/useAddComment";
import useAuth from "@/hooks/useAuth";
import AuthDialog from "@/components/AuthDialog";
import ReplyEditor from "@/components/ReplyEditor";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <div className="flex">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="pl-2 w-full">
              <div className="flex items-center gap-1 h-10">
                <div className="font-semibold">{comment.user.name}</div>
                <p className="text-xs text-muted-foreground">•</p>
                <p className="text-xs text-muted-foreground">
                  {comment.created_at}
                </p>
              </div>
              <div className="pt-1">
                <p className="text-sm">{comment.comment}</p>
                {comment.replies_count > 0 && (
                  <Button
                    onClick={() => setShowReplies(!showReplies)}
                    variant="link"
                    className="py-0 pl-0 pr-3"
                  >
                    {showReplies
                      ? "Hide Replies"
                      : `View ${comment.replies_count} Replies`}
                  </Button>
                )}
                <Button
                  onClick={handleReplyBox}
                  variant="link"
                  className="pl-0"
                >
                  {showReplyEditor ? "Cancel" : "Reply"}
                </Button>
                {showReplyEditor && (
                  <ReplyEditor
                    parentId={comment.id}
                    topic={comment.topic}
                    onClose={() => setShowReplyEditor(false)}
                    onLogout={() => setShowAuthDialog(false)}
                  />
                )}
                {showReplies && (
                  <div className="pl-3 my-3 border-l-2">
                    <Comments topic={comment.topic} parentId={comment.id} />
                  </div>
                )}
              </div>
            </div>
          </div>
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
