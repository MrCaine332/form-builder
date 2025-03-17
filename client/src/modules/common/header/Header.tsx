import React from "react"
import { useUnit } from "effector-react/compat"
import { Logo } from "./components/logo"
import { ThemeSwitcher } from "./components/theme-switcher"
import { $isAuthenticated } from "@/entities/user/model"
import { UserDropdown } from "@/entities/user/ui/user-dropdown"

export const Header = () => {
  const isAuthenticated = useUnit($isAuthenticated)

  return (
    <header className="h-[60px] px-4 py-2 border-b flex justify-between items-center bg-section">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        {isAuthenticated ? <UserDropdown /> : null}
      </div>
    </header>
  )
}
