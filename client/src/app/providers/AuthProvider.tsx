import React, { useEffect } from "react"
import { useUnit } from "effector-react"
import { $authStore, refresh } from "@/entities/user/model"
import { Loader } from "@/shared/ui/loader"

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const auth = useUnit($authStore)

  useEffect(() => {
    refresh()
  }, [])

  if (auth.status === "INITIAL") {
    return <Loader className="h-screen" />
  }

  return children
}
