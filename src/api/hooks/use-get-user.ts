import { type IUsersApiResponse } from "@/interface/user/user.interface";
import { useQuery } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";
import { userQueryKey } from "@/constants";
import type { IGetUserOptions } from "../urls/user";

export const useGetUser = (options?: IGetUserOptions) => {
  const { data, isPending } = useQuery<IUsersApiResponse, string>({
    queryKey: [
      userQueryKey.GET_USERS,
      options?.limit,
      options?.skip,
      options?.q,
      options?.route,
    ],
    queryFn: async () => {
      return getUserFn.getAllUsers(options);
    },
  });

  return { data, isPending };
};
