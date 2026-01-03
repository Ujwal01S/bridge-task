import { authUrl } from "@/api/urls/auth";
import type { ILoginResponse } from "@/interface/login-response.interface";
import api from "@/services/api-request";

export interface IAuthPayload {
  username: string;
  password: string;
}

interface IAuthFn {
  login: (payload: IAuthPayload) => Promise<ILoginResponse>;
}

export const getAuthFn: IAuthFn = {
  login: async (payload: IAuthPayload) => {
    const url = authUrl.loginUrl;

    const response = await api.post(url, payload);

    return response.data;
  },
};
