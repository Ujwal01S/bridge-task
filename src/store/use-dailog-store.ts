import { create } from "zustand";

interface IDeleteDialogState {
  id: number | undefined;
  open: boolean;
  setOpenDeleteDialog: (id: number) => void;
  closeDeleteDialog: () => void;
}

export const useDeleteDialogStore = create<IDeleteDialogState>((set) => ({
  id: undefined,
  open: false,
  setOpenDeleteDialog: (id) => set({ id, open: true }),
  closeDeleteDialog: () => set({ id: undefined, open: false }),
}));
