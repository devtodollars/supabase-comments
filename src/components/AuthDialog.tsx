import { Auth } from "@supabase/auth-ui-react";
import { useCommentsContext, useSupabaseClient } from "@/lib/contexts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { ReactNode } from "react";

interface AuthDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children?: ReactNode;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, setOpen, children }) => {
  const supabase = useSupabaseClient();
  const commentsContext = useCommentsContext();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to comment</DialogTitle>
        </DialogHeader>
        {children ? (
          children
        ) : (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme={commentsContext.mode === "dark" ? "dark" : undefined}
            providers={[]}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
