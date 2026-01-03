import { create } from "zustand";

// creating this store to filter out deleted user when user data gets revalidate

interface IDeletedUsersState {
  deletedUserIds: number[];
  addDeletedUser: (id: number) => void;
  clearDeletedUsers: () => void;
}

export const useDeletedUsersStore = create<IDeletedUsersState>((set, get) => ({
  deletedUserIds: [],
  addDeletedUser: (id) =>
    set((state) => ({
      deletedUserIds: [...state.deletedUserIds, id],
    })),
  clearDeletedUsers: () => set({ deletedUserIds: [] }),
}));
