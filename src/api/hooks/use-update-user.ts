import type { IUser } from "@/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending: userEditIsPending } = useMutation({
    mutationFn: async (vars: { id: number; payload: Partial<IUser> }) => {
      return getUserFn.updateUser(vars.id, vars.payload);
    },
  });

  return { editUser, userEditIsPending };
};
