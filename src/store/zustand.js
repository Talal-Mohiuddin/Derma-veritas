import { getAuth, signOut } from "firebase/auth";
import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  userRole: null,
  bookingOpen: false,
  pendingBooking: null, // Store pending booking data
  isChatOpen: false,
  setIsChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
  setUser: (user) => set({ user }),
  setUserRole: (role) => set({ userRole: role }),
  setBookingOpen: (isOpen) => set({ bookingOpen: isOpen }),
  setPendingBooking: (bookingData) => set({ pendingBooking: bookingData }),
  clearPendingBooking: () => set({ pendingBooking: null }),
  handleLogout: async (router) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      if (router) {
        router.push("/login");
      } else if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      set({ user: null, userRole: null, pendingBooking: null });
    }
  },
}));
