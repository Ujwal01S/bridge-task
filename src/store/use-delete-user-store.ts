import { create } from "zustand";
import { persist } from "zustand/middleware";

// creating this store to filter out deleted user when user data gets revalidate

interface IDeletedUsersState {
  deletedUserIds: number[];
  addDeletedUser: (id: number) => void;
  clearDeletedUsers: () => void;
}

export const useDeletedUsersStore = create<IDeletedUsersState>()(
  persist(
    (set) => ({
      deletedUserIds: [],
      addDeletedUser: (id) =>
        set((state) => ({
          deletedUserIds: [...state.deletedUserIds, id],
        })),
      clearDeletedUsers: () => set({ deletedUserIds: [] }),
    }),
    {
      name: "deleted-users-storage",
    }
  )
);
