import { getUserUrls, type IGetUserOptions } from "@/api/urls/user/user";
import type { IUpdateUserPayload, IUser, IUsersApiResponse } from "@/interface";
import api from "@/services/api-request";

interface IGetUserFn {
  getAllUsers: (options?: IGetUserOptions) => Promise<IUsersApiResponse>;
  createUser: (payload: IUpdateUserPayload) => Promise<IUser>;
  deleteUser: (id: number) => Promise<boolean>;
  updateUser: (id: number, payload: IUpdateUserPayload) => Promise<IUser>;
}

export const getUserFn: IGetUserFn = {
  getAllUsers: async (options?: IGetUserOptions) => {
    const url = getUserUrls.getAllUser(options);
    const response = await api.get(url);

    return response.data;
  },

  createUser: async (payload) => {
    const url = getUserUrls.createUser();
    const response = await api.post(url, payload);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const url = getUserUrls.deleteUser(id);
    const response = await api.delete(url);

    return response.data;
  },

  updateUser: async (id, payload) => {
    const url = getUserUrls.updateUser(id);
    const response = await api.put(url, payload);
    return response.data;
  },
};
