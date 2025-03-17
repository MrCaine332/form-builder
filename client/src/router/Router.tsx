import React, { useMemo } from "react"
import { useUnit } from "effector-react"
import { $isAuthenticated } from "@/entities/user/model"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ROUTES } from "@/router/config"
import { Root } from "@/pages"
import { authenticatedRoutes, notAuthenticatedRoutes } from "./routes"
import { allAccessibleRoutes } from "./routes"

export const Router = () => {
  const isAuthenticated = useUnit($isAuthenticated)

  const routes = useMemo(() => {
    return createBrowserRouter([
      {
        path: ROUTES.root,
        element: <Root />,
        children: [
          ...allAccessibleRoutes,
          ...(isAuthenticated ? authenticatedRoutes : []),
          ...(!isAuthenticated ? notAuthenticatedRoutes : []),
        ],
      },
    ])
  }, [isAuthenticated])

  return <RouterProvider router={routes} />
}
