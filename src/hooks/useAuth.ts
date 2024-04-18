import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/lib/contexts";
import { User } from "@supabase/supabase-js";

export default function useAuth() {
  const supabase = useSupabaseClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to true initially until the first auth event is received
    setLoading(true);

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
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

  return { user, loading, logout };
}
