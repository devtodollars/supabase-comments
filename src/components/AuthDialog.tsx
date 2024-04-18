import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@/lib/contexts";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose }) => {
  const supabase = useSupabaseClient();
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h2>Login to Reply</h2>
      <Auth supabaseClient={supabase} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AuthDialog;
