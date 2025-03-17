import { RouteObject, Navigate } from "react-router-dom"
import { signInRoute, signUpRoute } from "@/pages/authentication"
import { formRoute } from "@/pages/form"
import { dashboardRoute } from "@/pages/dashboard/Dashboard"
import { builderRoute } from "@/pages/builder/Builder"
import { submitRoute } from "@/pages/submit"

export const allAccessibleRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={"/*"} replace />,
  },
  submitRoute,
]

export const authenticatedRoutes: RouteObject[] = [
  dashboardRoute,
  builderRoute,
  formRoute,
  {
    path: "*",
    element: <Navigate to={"/dashboard"} replace />,
  },
]

export const notAuthenticatedRoutes: RouteObject[] = [
  signInRoute,
  signUpRoute,
  {
    path: "*",
    element: <Navigate to={"/signin"} replace />,
  },
]
