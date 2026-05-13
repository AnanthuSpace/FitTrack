import { create } from "zustand"

type Theme = "light" | "dark"

type ThemeState = {
  theme: Theme
  toggleTheme: () => void
  hydrateTheme: () => void
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  localStorage.setItem("fittrack-theme", theme)
}

export const useTheme = create<ThemeState>((set) => ({
  theme: "light",
  hydrateTheme: () => {
    const saved = localStorage.getItem("fittrack-theme")
    const isDarkSystem = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = (saved as Theme | null) ?? (isDarkSystem ? "dark" : "light")
    applyTheme(theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme: Theme = state.theme === "light" ? "dark" : "light"
      applyTheme(nextTheme)
      return { theme: nextTheme }
    }),
}))
