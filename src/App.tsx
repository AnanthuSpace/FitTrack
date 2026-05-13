import { Navigate, Route, Routes } from "react-router-dom"

import { DashboardPage } from "@/pages/dashboard-page"
import { LandingPage } from "@/pages/landing-page"
import { OnboardingPage } from "@/pages/onboarding-page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
