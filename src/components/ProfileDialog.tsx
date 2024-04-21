import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export function ProfileDialog() {
  const { user, displayUser, logout, updateDisplayUser } = useAuth();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (displayUser) {
      setName(displayUser.name || "");
      setAvatar(displayUser.avatar || "");
    }
  }, [displayUser]);

  const handleSave = async () => {
    if (displayUser == null) return;
    await updateDisplayUser({
      id: displayUser?.id,
      name,
      avatar,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-3">
          <Button variant="link" className="p-0">
            View Profile
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here or logout.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Avatar>
              <AvatarImage src={displayUser?.avatar} alt="User avatar" />
              <AvatarFallback>🙂</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={user?.email}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Avatar URL
            </Label>
            <Input
              id="username"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <DialogClose asChild>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileDialog;
