import type { IUsersApiResponse } from "@/interface";
import { getUserUrls, type IGetUserOptions } from "../urls/user";
import api from "@/services/api-request";

interface IGetUserFn {
  getAllUsers: (options?: IGetUserOptions) => Promise<IUsersApiResponse>;
}

export const getUserFn: IGetUserFn = {
  getAllUsers: async (options?: IGetUserOptions) => {
    const url = getUserUrls.getAllUser(options);
    const response = await api.get(url);

    return response.data;
  },
};
