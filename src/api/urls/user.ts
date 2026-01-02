interface IGetUserUrls {
  getAllUser: (options?: any) => string;
}

export const getUserUrls: IGetUserUrls = {
  getAllUser: () => {
    const url = `users`;

    return url;
  },
};
