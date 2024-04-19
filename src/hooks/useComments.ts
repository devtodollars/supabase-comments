import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";
import { timeout } from "@/lib/utils";

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
      // This might look crazy, but it ensures the spinner will show for a
      // minimum of 200ms which is a pleasant amount of time for the sake of ux.
      const minTime = timeout(220);
      const comments = await api.getComments({ topic, parentId });
      await minTime;
      comments.forEach((comment) => {
        queryClient.setQueryData(["comments", comment.id], comment);
        queryClient.setQueryData(["users", comment.user_id], comment.user);
      });
      return comments;
    },
  });

  return commentsQuery;
}
