import { Link } from "react-router-dom"
import { ROUTES } from "@/router"
import { useUnit } from "effector-react"
import { $isAuthenticated } from "@/entities/user/model"

export const Logo = () => {
  const isAuthenticated = useUnit($isAuthenticated)

  return (
    <Link
      to={isAuthenticated ? ROUTES.dashboard : ROUTES.signIn}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text"
    >
      FormBuilder
    </Link>
  )
}
