import { userQueryKey } from "@/constants/query-key.constant";
import { type IUsersApiResponse } from "@/interface/user/user.interface";
import { useQuery } from "@tanstack/react-query";
import { getUserFn } from "../functions/user";

export const useGetUser = () => {
  const { data, isPending } = useQuery<IUsersApiResponse, string>({
    queryKey: [userQueryKey.GET_USERS],
    queryFn: async () => {
      return getUserFn.getAllUsers();
    },
  });

  return { data, isPending };
};
