import { buildQueryParams } from "@/utils/query-params-builder";

export interface IGetUserOptions {
  limit?: number;
  skip?: number;
  route?: string;
  q?: string;
}

interface IGetUserUrls {
  getAllUser: (options?: any) => string;
  createUser: () => string;
  deleteUser: (id: number) => string;
  updateUser: (id: number) => string;
}

export const getUserUrls: IGetUserUrls = {
  getAllUser: (options) => {
    if (!options) {
      return "users";
    }
    const { route, ...rest } = options;
    const { skip, ...restWithoutSkip } = rest;
    // remove skip for serach purpose
    const decidingOption = route ? restWithoutSkip : rest;
    const queryParams = buildQueryParams(decidingOption);

    const url = route ? `users/${route}${queryParams}` : `users${queryParams}`;
    return url;
  },

  createUser: () => "users/add",

  deleteUser: (id) => {
    const url = `users/${id}`;
    return url;
  },

  updateUser: (id: number) => {
    const url = `users/${id}`;

    return url;
  },
};
