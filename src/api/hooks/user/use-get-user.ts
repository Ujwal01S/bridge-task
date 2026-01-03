import { type IUsersApiResponse } from "@/interface/user/user.interface";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/constants";
import { useUserStore } from "@/store/use-user-store";
import { useEffect, useMemo } from "react";
import { filterDeletedUsers } from "@/utils/filter-user-api";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";
import type { IGetUserOptions } from "@/api/urls/user/user";
import { getUserFn } from "@/api/functions/user/user";

export const useGetUser = (options?: IGetUserOptions) => {
  const { setUsers, setTotal, users } = useUserStore();

  // delete user store
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

  const filteredData = useMemo(
    () => filterDeletedUsers(data, deletedUserIds),
    [data, deletedUserIds]
  );

  // Sync API data with Zustand store on initial load
  useEffect(() => {
    if (filteredData?.users) {
      const pickedUsers = filteredData.users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        address: user.address,
      }));
      setUsers(pickedUsers);
      setTotal(filteredData.total);
    }
  }, [data, setUsers, setTotal]);

  return { data: { users, total: useUserStore.getState().total }, isPending };
};
