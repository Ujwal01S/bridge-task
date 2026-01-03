import type { IPickedUser, IUpdateUserPayload } from "@/interface";
import { notificationMessage, queryKey } from "@/constants";
import { useUserStore } from "@/store/use-user-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaginationParams } from "@/hooks/query-params/use-pagination";
import { getUserFn } from "@/api/functions/user/user";
import { useSearchParams } from "@/hooks/query-params/use-search";

export const useCreateUser = () => {
  const { limit, skip } = usePaginationParams();
  const { q } = useSearchParams();
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
