import UserForm from "@/components/form/user-form/user-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/store/use-user-store";
import { memo } from "react";

interface Props {
  open: boolean;
  type: "create" | "edit";
  onChange?: () => void;
  id?: number;
}

const UserModal = ({ open, type, onChange, id }: Props) => {
  const { users } = useUserStore();

  let selectedUser;
  if (id) {
    selectedUser = users.find((user) => user.id === id);
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className='min-w-[50vw] min-h-[70vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create New User" : "Edit User"}
          </DialogTitle>

          <DialogDescription className='sr-only'>
            {type === "create"
              ? "Fill in the details to create a new user."
              : "Update the user information below."}
          </DialogDescription>
        </DialogHeader>

        <UserForm
          mode={type === "create" ? "create" : "update"}
          initialValues={selectedUser}
          id={id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default memo(UserModal);
