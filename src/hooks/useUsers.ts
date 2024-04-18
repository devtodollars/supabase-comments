import { useQuery } from "@tanstack/react-query";
import useApi from "@/hooks/useApi";

interface UseUserQuery {
  id: string;
}

interface UseUserOptions {
  enabled?: boolean;
}

const useUser = ({ id }: UseUserQuery, options: UseUserOptions = {}) => {
  const api = useApi();
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => {
      return api.getUser(id);
    },
    staleTime: Infinity,
    enabled: options.enabled,
  });
};

export default useUser;
