import useApi from './useApi';
import { useQuery } from "@tanstack/react-query";

interface UseCommentQuery {
  id: string;
}

interface UseCommentOptions {
  enabled?: boolean;
}

const useComment = (
  { id }: UseCommentQuery,
  options: UseCommentOptions = {},
) => {
  const api = useApi();
  return useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      return await api.getComment(id);
    },
    staleTime: Infinity,
    enabled: options.enabled,
  });
};

export default useComment;
