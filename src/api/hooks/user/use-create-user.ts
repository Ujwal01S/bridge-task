import { getUserFn } from "@/api/functions/user/user";
import { notificationMessage, queryKey } from "@/constants";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { useUserSearchParams } from "@/hooks/query-params/use-search";
import type { IPickedUser, IUpdateUserPayload } from "@/interface";
import { useUserStore } from "@/store/use-user-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUser = () => {
  const { limit, skip } = usePaginationParams();
  const { q } = useUserSearchParams();
  // user zustand store to create user
  const { addUser } = useUserStore();

  // modal zustand store to close the modal
  // const { closeModal } = useUserModalStore();

  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: createUserIsPending } = useMutation({
    mutationFn: async (payload: IUpdateUserPayload) => {
      return getUserFn.createUser(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GET_USERS, skip, limit, q],
      });
      // Add user to Zustand store
      const newUser: IPickedUser = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        address: data.address,
      };

      addUser(newUser);

      // closeModal();

      successNotification({
        header: "Create User",
        description: notificationMessage.CREATE_SUCCESS,
      });
    },
    onError: (errorMessage: string) => {
      errorNotification({
        header: "Create User",
        description: errorMessage || notificationMessage.CREATE_FAILED,
      });
    },
  });

  return { createUser, createUserIsPending };
};
