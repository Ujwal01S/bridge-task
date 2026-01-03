import type { IUsersApiResponse } from "@/interface";
import { getUserUrls, type IGetUserOptions } from "../urls/user";
import api from "@/services/api-request";

interface IGetUserFn {
  getAllUsers: (options?: IGetUserOptions) => Promise<IUsersApiResponse>;
  deleteUser: (id: number) => Promise<boolean>;
}

export const getUserFn: IGetUserFn = {
  getAllUsers: async (options?: IGetUserOptions) => {
    const url = getUserUrls.getAllUser(options);
    const response = await api.get(url);

    return response.data;
  },

  deleteUser: async (id: number) => {
    const url = getUserUrls.deleteUser(id);
    const response = await api.delete(url);

    return response.data;
  },
};
