import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";

interface UseAddCommentPayload {
  comment: string;
  topic: string;
  parentId: string | null;
}

const useAddComment = () => {
  const queryClient = useQueryClient();
  const api = useApi();

  const commentMutation = useMutation({
    mutationFn: async ({ comment, topic, parentId }: UseAddCommentPayload) => {
      return await api.addComment({
        comment,
        topic,
        parent_id: parentId,
      });
    },
    onSuccess: (_, variables) => {
      const { topic, parentId } = variables;
      queryClient.invalidateQueries({
        queryKey: ["comments", { topic, parentId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", parentId],
      });
    },
  });
  return commentMutation;
};

export default useAddComment;
