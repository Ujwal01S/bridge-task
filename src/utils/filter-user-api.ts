import type { IUsersApiResponse } from "@/interface";

export const filterDeletedUsers = (
  data: IUsersApiResponse | undefined,
  deletedUserIds: number[]
): IUsersApiResponse | undefined => {
  if (!data) return undefined;

  const filteredUsers = data.users.filter(
    (user) => !deletedUserIds.includes(user.id)
  );

  return {
    ...data,
    users: filteredUsers,
    total: data.total - deletedUserIds.length,
  };
};
