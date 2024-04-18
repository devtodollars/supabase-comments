import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

// Creating the context object
export interface CommentsContextApi {
  showAuthDialog: boolean;
  setShowAuthDialog: (value: boolean) => void;
  mode?: "light" | "dark";
}
export const CommentsContext = createContext<CommentsContextApi | null>(null);
export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error(
      "CommentsProvider not found. Make sure this code is contained in a CommentsProvider.",
    );
  }
  return context;
};

// Supabase Client
export const SupabaseClientContext = createContext<SupabaseClient | null>(null);
export const useSupabaseClient = () => {
  const supabaseClient = useContext(SupabaseClientContext);
  if (!supabaseClient) {
    throw new Error(
      "No supabase client found. Make sure this code is contained in a CommentsProvider.",
    );
  }
  return supabaseClient;
};
