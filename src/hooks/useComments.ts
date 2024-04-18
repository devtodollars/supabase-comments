import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import { useEffect } from "react";

interface UseCommentsQuery {
  topic: string;
  parentId: string | null;
}

interface UseCommentsOptions {
  enabled?: boolean;
}

export function useComments(
  { topic, parentId = null }: UseCommentsQuery,
  options: UseCommentsOptions = {},
) {
  const api = useApi();
  const queryClient = useQueryClient();
  const commentsQuery = useQuery({
    queryKey: ["comments", { topic, parentId }],
    queryFn: async () => {
      const comments = await api.getComments({ topic, parentId });
      return comments;
    },

    enabled: options.enabled,
  });
  const { data, isSuccess } = commentsQuery;

  useEffect(() => {
    if (isSuccess) {
      data.forEach((comment) => {
        queryClient.setQueryData(["comments", comment.id], comment);
        queryClient.setQueryData(["users", comment.user_id], comment.user);
      });
    }
  }, [data, isSuccess]);

  return commentsQuery;
}
