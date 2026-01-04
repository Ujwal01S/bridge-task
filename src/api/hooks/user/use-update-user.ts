import { getUserFn } from "@/api/functions/user/user";
import { notificationMessage } from "@/constants";
import type { IUpdateUserPayload } from "@/interface";
import { useModalStore } from "@/store/use-modal-store";
import { useUserStore } from "@/store/use-user-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { updateUser } = useUserStore();
  const { closeModal } = useModalStore();

  const { mutate: editUser, isPending: userEditIsPending } = useMutation({
    mutationFn: async (vars: { id: number; payload: IUpdateUserPayload }) => {
      return getUserFn.updateUser(vars.id, vars.payload);
    },
    onSuccess: (data, variables) => {
      // Update user in Zustand store
      updateUser(variables.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        address: data.address,
      });

      successNotification({
        header: "Update User",
        description: notificationMessage.UPDATE_SUCCESS,
      });

      closeModal();
    },
    onError: (errorMessage: string) => {
      errorNotification({
        header: "Update User",
        description: errorMessage || notificationMessage.UPDATE_FAILED,
      });
    },
  });

  return { editUser, userEditIsPending };
};
