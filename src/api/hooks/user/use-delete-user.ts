import { notificationMessage } from "@/constants";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import { useUserStore } from "@/store/use-user-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation } from "@tanstack/react-query";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";
import { getUserFn } from "@/api/functions/user/user";

export const useDeleteUser = () => {
  const { closeDeleteDialog } = useDeleteDialogStore();
  const { removeUser } = useUserStore();
  const { addDeletedUser } = useDeletedUsersStore();

  const { mutate, isPending: deleteIsPending } = useMutation({
    mutationFn: (id: number) => getUserFn.deleteUser(id),
    onSuccess: (_, deletedUserId) => {
      // delete user one to remove user list and persists
      addDeletedUser(deletedUserId);

      // for zustand store one
      removeUser(deletedUserId);
      successNotification({
        header: "Delete User",
        description: notificationMessage.DELETE_SUCCESS,
      });
      closeDeleteDialog();
    },

    onError: (errorMessage: string) => {
      errorNotification({
        header: "Delete User",
        description: errorMessage || notificationMessage.DELETE_FAILED,
      });
      closeDeleteDialog();
    },
  });

  return { mutate, deleteIsPending };
};
