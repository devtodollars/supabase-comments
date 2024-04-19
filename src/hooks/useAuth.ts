import { useEffect, useState } from "react";
import { useCommentsContext, useSupabaseClient } from "@/lib/contexts";
import { User } from "@supabase/supabase-js";
import { DisplayUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export default function useAuth() {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const { setShowAuthDialog } = useCommentsContext();
  const [user, setUser] = useState<User | null>(null);
  const [displayUser, setDisplayUser] = useState<DisplayUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true initially until the first auth event is received
    setLoading(true);

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const user = session?.user ?? null;
        let displayUser = null;
        setUser(user);
        if (user) {
          setShowAuthDialog(false);
          displayUser = {
            id: user.id,
            name:
              user?.user_metadata["name"] ||
              user?.user_metadata["full_name"] ||
              user?.user_metadata["user_name"],
            avatar:
              user?.user_metadata["avatar_url"] ||
              user?.user_metadata["avatar"],
          };
          queryClient.setQueryData(["users", displayUser.id], displayUser);
        }
        setDisplayUser(displayUser);
        setLoading(false); // Set loading to false upon receiving an event
      },
    );

    // Cleanup the subscription on component unmount
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  // Function to handle user logout
  const logout = async () => {
    setLoading(true); // Optionally set loading true during logout process
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false); // Reset loading state after logout
  };
  // update display user
  const updateDisplayUser = async (newUser: DisplayUser) => {
    await supabase.auth.updateUser({
      data: { name: newUser.name, avatar_url: newUser.avatar },
    });
    queryClient.invalidateQueries();
  };

  return { user, displayUser, loading, logout, updateDisplayUser };
}
