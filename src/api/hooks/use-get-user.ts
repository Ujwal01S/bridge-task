import { type IUsersApiResponse } from "@/interface/user/user.interface";
import { useQuery } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";
import type { IGetUserOptions } from "../urls/user";
import { queryKey } from "@/constants";
import { useMemo } from "react";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";

export const useGetUser = (options?: IGetUserOptions) => {
  const { deletedUserIds } = useDeletedUsersStore();

  const { data, isPending } = useQuery<IUsersApiResponse, string>({
    queryKey: [
      queryKey.GET_USERS,
      options?.limit,
      options?.skip,
      options?.q,
      options?.route,
    ],
    queryFn: async () => {
      return getUserFn.getAllUsers(options);
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return undefined;

    const filteredUsers = data.users.filter(
      (user) => !deletedUserIds.includes(user.id)
    );

    return {
      ...data,
      users: filteredUsers,
      total: data.total - deletedUserIds.length,
    };
  }, [data, deletedUserIds]);

  return { data: filteredData, isPending };
};
