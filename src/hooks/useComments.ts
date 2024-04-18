import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";

interface UseCommentsQuery {
  topic: string;
  parentId: string | null;
}

interface UseCommentsOptions {
  enabled?: boolean;
}

export default function useComments(
  { topic, parentId = null }: UseCommentsQuery,
  options: UseCommentsOptions = {},
) {
  const api = useApi();
  const queryClient = useQueryClient();
  const commentsQuery = useQuery({
    enabled: options.enabled,
    queryKey: ["comments", { topic, parentId }],
    queryFn: async () => {
      const comments = await api.getComments({ topic, parentId });
      comments.forEach((comment) => {
        queryClient.setQueryData(["comments", comment.id], comment);
        queryClient.setQueryData(["users", comment.user_id], comment.user);
      });
      return comments;
    },
  });

  return commentsQuery;
}
