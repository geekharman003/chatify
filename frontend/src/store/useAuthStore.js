import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: { name: "harman", age: 25 },
  isLoggedIn: false,
}));
