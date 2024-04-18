import { FC, ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DisplayUser } from "../types";
import { CommentsContext, SupabaseClientContext } from "../contexts";
import { SupabaseClient } from "@supabase/supabase-js";

const defaultQueryClient = new QueryClient();

export interface CommentsProviderProps {
  queryClient?: QueryClient;
  supabaseClient: SupabaseClient;
  onAuthRequested?: () => void;
  onUserClick?: (user: DisplayUser) => void;
  mode?: "light" | "dark";
  children: ReactNode;
}
export const CommentsProvider: FC<CommentsProviderProps> = ({
  supabaseClient,
  queryClient = defaultQueryClient,
  children,
  onAuthRequested,
  onUserClick,
  mode,
}) => {
  const context = useMemo(
    () => ({
      onAuthRequested,
      onUserClick,
      mode,
    }),
    [onAuthRequested, onUserClick, mode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseClientContext.Provider value={supabaseClient}>
        <CommentsContext.Provider value={context}>
          {children}
        </CommentsContext.Provider>
      </SupabaseClientContext.Provider>
    </QueryClientProvider>
  );
};
