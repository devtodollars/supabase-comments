import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@/lib/contexts";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeMinimal } from "@supabase/auth-ui-shared";

interface AuthDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, setOpen }) => {
  const supabase = useSupabaseClient();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to comment</DialogTitle>
        </DialogHeader>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
