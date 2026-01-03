import { create } from "zustand";

type ModalType = "create" | "edit";

interface IUserModalState {
  userId: number | undefined;
  openModal: boolean;
  type: ModalType | undefined;
  setOpenModal: (id: number | undefined, type: ModalType) => void;
  setOpenCreateModal: () => void;
  closeModal: () => void;
}

export const useUserModalStore = create<IUserModalState>((set) => ({
  userId: undefined,
  openModal: false,
  type: undefined,
  setOpenModal: (id, type) => set({ userId: id, openModal: true, type }),
  setOpenCreateModal: () =>
    set({ userId: undefined, openModal: true, type: "create" }),
  closeModal: () =>
    set({ userId: undefined, openModal: false, type: undefined }),
}));
