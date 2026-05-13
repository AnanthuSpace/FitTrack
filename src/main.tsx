import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"

import App from "@/App"
import { useTheme } from "@/hooks/use-theme"
import "@/index.css"

export function AppProviders() {
  const hydrateTheme = useTheme((state) => state.hydrateTheme)

  useEffect(() => {
    hydrateTheme()
  }, [hydrateTheme])

  return (
    <BrowserRouter>
      <App />
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
