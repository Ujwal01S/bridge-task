import type { IUsersApiResponse } from "@/interface/user/user.interface";
import { getUserUrls } from "../urls/user";
import api from "@/services/api-request";

interface IGetUserFn {
  getAllUsers: () => Promise<IUsersApiResponse>;
}

export const getUserFn: IGetUserFn = {
  getAllUsers: async () => {
    const url = getUserUrls.getAllUser();

    const response = await api.get(url);

    return response.data;
  },
};
