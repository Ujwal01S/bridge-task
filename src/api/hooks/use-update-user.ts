import { notificationMessage } from "@/constants";
import type { IUpdateUserPayload, IUser } from "@/interface";
import { useUserModalStore } from "@/store/use-user-modal-store";
import { useUserStore } from "@/store/use-user-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";

export const useUpdateUser = () => {
  const { updateUser } = useUserStore();
  const { closeModal } = useUserModalStore();

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
