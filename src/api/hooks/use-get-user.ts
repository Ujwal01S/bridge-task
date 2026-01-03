import { type IUsersApiResponse } from "@/interface/user/user.interface";
import { useQuery } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";
import type { IGetUserOptions } from "../urls/user";
import { queryKey } from "@/constants";
import { useMemo } from "react";
import { useDeletedUsersStore } from "@/store/use-delete-user-store";
import { filterDeletedUsers } from "@/utils/filter-user-api";

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

  // removing the deleted user from the data
  const filteredData = useMemo(
    () => filterDeletedUsers(data, deletedUserIds),
    [data, deletedUserIds]
  );

  return { data: filteredData, isPending };
};
