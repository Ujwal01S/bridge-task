import { buildQueryParams } from "@/utils/query-params-builder";

export interface IGetUserOptions {
  limit?: number;
  skip?: number;
  route?: string;
  q?: string;
}

interface IGetUserUrls {
  getAllUser: (options?: any) => string;
  deleteUser: (id: number) => string;
}

export const getUserUrls: IGetUserUrls = {
  getAllUser: (options) => {
    if (!options) {
      return "users";
    }
    const { route, ...rest } = options;
    const queryParams = buildQueryParams(rest);
    const url = route ? `users/${route}${queryParams}` : `users${queryParams}`;
    return url;
  },

  deleteUser: (id) => {
    const url = `users/${id}`;
    return url;
  },
};
