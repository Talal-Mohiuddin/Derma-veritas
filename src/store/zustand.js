import { create } from "zustand";

export const useStore = create((set) => ({
  bookingOpen: false,
  setBookingOpen: (isOpen) => set({ bookingOpen: isOpen }),
}));


