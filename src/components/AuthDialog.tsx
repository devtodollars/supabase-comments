import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@/lib/contexts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeMinimal } from "@supabase/auth-ui-shared";
import { ReactNode } from "react";

interface AuthDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children?: ReactNode;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, setOpen, children }) => {
  const supabase = useSupabaseClient();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to comment</DialogTitle>
        </DialogHeader>
        {children ? children : (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
