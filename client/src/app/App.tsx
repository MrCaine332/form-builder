import React from "react"
import { Router } from "@/router"
import { ThemeProvider } from "@/app/providers/ThemeProvider"
import { AuthProvider } from "@/app/providers/AuthProvider"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
