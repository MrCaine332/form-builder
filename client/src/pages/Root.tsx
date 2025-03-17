import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/modules/common/header"
import { Toaster } from "@/shared/ui/sonner"

export const Root = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <Header />
      <Outlet />
      <Toaster richColors />
    </div>
  )
}
