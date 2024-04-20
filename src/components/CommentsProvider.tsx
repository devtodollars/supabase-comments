import { FC, ReactNode, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseClient } from "@supabase/supabase-js";
import { CommentsContext, SupabaseClientContext } from "@/lib/contexts";
import AuthDialog from "@/components/AuthDialog";

const defaultQueryClient = new QueryClient();

export interface CommentsProviderProps {
  supabaseClient: SupabaseClient;
  queryClient?: QueryClient;
  mode?: "light" | "dark";
  authComponent?: ReactNode;
  children: ReactNode;
}

const CommentsProvider: FC<CommentsProviderProps> = ({
  supabaseClient,
  queryClient = defaultQueryClient,
  mode,
  authComponent,
  children,
}) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const context = useMemo(
    () => ({
      showAuthDialog,
      setShowAuthDialog,
      mode,
    }),
    [showAuthDialog, setShowAuthDialog, mode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseClientContext.Provider value={supabaseClient}>
        <CommentsContext.Provider value={context}>
          {children}
          <AuthDialog open={showAuthDialog} setOpen={setShowAuthDialog}>
            {authComponent}
          </AuthDialog>
        </CommentsContext.Provider>
      </SupabaseClientContext.Provider>
    </QueryClientProvider>
  );
};

export default CommentsProvider;
