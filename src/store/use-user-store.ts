import type { IPickedUser } from "@/interface";
import { create } from "zustand";

interface IUserStoreState {
  users: IPickedUser[];
  total: number;
  addUser: (user: IPickedUser) => void;
  updateUser: (id: number, user: Partial<Omit<IPickedUser, "id">>) => void;
  removeUser: (id: number) => void;
  setUsers: (users: IPickedUser[]) => void;
  setTotal: (total: number) => void;
  clearUsers: () => void;
}

export const useUserStore = create<IUserStoreState>((set) => ({
  users: [],
  total: 0,

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
      total: state.total + 1,
    })),

  updateUser: (id, updatedData) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      ),
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      total: state.total - 1,
    })),

  setUsers: (users) => set({ users }),

  setTotal: (total) => set({ total }),

  clearUsers: () => set({ users: [], total: 0 }),
}));
