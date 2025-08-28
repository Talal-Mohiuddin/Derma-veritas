import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  userRole: null,
  bookingOpen: false,
  setUser: (user) => set({ user }),
  setUserRole: (role) => set({ userRole: role }),
  setBookingOpen: (isOpen) => set({ bookingOpen: isOpen }),
}));


