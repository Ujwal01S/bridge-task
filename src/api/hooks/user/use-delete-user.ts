import { notificationMessage, queryKey } from "@/constants";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import { useUserStore } from "@/store/use-user-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";
import { getUserFn } from "@/api/functions/user/user";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { useUserSearchParams } from "@/hooks/query-params/use-search";

export const useDeleteUser = () => {
  const { closeDeleteDialog } = useDeleteDialogStore();
  const { removeUser } = useUserStore();
  const { addDeletedUser } = useDeletedUsersStore();

  const { limit, skip } = usePaginationParams();
  const { q } = useUserSearchParams();
  // user zustand store to create user

  // modal zustand store to close the modal
  // const { closeModal } = useUserModalStore();

  const queryClient = useQueryClient();

  const { mutate, isPending: deleteIsPending } = useMutation({
    mutationFn: (id: number) => getUserFn.deleteUser(id),
    onSuccess: (_, deletedUserId) => {
      // delete user one to remove user list and persists
      addDeletedUser(deletedUserId);

      // for zustand store one
      removeUser(deletedUserId);

      queryClient.invalidateQueries({
        queryKey: [queryKey.GET_USERS, skip, limit, q],
      });
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
