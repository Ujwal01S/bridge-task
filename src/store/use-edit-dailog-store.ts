import { create } from "zustand";

interface IDeleteDialogState {
  userId: number | undefined;
  openEdit: boolean;
  setOpenEditDialog: (id: number) => void;
  closeEditDialog: () => void;
}

export const useEditDialogStore = create<IDeleteDialogState>((set) => ({
  userId: undefined,
  openEdit: false,
  setOpenEditDialog: (id) => set({ userId: id, openEdit: true }),
  closeEditDialog: () => set({ userId: undefined, openEdit: false }),
}));
