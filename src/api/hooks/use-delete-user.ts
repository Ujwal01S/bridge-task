import { notificationMessage, queryKey } from "@/constants";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { useDeleteDialogStore } from "@/store/use-dailog-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { skip, limit } = usePaginationParams();
  const { closeDeleteDialog } = useDeleteDialogStore();
  const { addDeletedUser } = useDeletedUsersStore();

  const { mutate, isPending: deleteIsPending } = useMutation({
    mutationFn: (id: number) => getUserFn.deleteUser(id),
    onSuccess: (_, deletedUserId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GET_USERS, skip, limit],
      });

      addDeletedUser(deletedUserId);

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
