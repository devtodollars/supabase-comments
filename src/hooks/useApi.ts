import { useMemo } from "react";
import { createApiClient } from "@/lib/api";
import { useSupabaseClient } from "@/lib/contexts";

const useApi = () => {
  const supabase = useSupabaseClient();
  const api = useMemo(() => createApiClient(supabase), [supabase]);
  return api;
};

export default useApi;
