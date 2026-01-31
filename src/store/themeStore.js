import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      // Default system preference check
      mode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage", // local storage key name
    }
  )
);