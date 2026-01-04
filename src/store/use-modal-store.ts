import { create } from "zustand";

type ModalType = "create" | "edit";

interface IModalState {
  userId: number | undefined;
  openModal: boolean;
  type: ModalType | undefined;
  content: React.ReactNode;
  title: string;
  setOpenModal: ({
    id,
    type,
    content,
    title,
  }: {
    id: number | undefined;
    type: ModalType;
    content: React.ReactNode;
    title: string;
  }) => void;
  setOpenCreateModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<IModalState>((set) => ({
  userId: undefined,
  openModal: false,
  type: undefined,
  content: undefined,
  title: "",
  setOpenModal: ({ id, type, content, title }) =>
    set({ userId: id, openModal: true, type, content, title }),
  setOpenCreateModal: () =>
    set({ userId: undefined, openModal: true, type: "create" }),
  closeModal: () =>
    set({
      userId: undefined,
      openModal: false,
      type: undefined,
      content: undefined,
    }),
}));
