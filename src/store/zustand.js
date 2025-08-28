import { create } from "zustand";

export const useStore = create((set) => ({
  userRole: null,
  setUserRole: (role) => set({ userRole: role }),
}));
