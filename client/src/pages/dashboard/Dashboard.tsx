import React from "react"
import { Container } from "@/shared/ui/container"
import { Separator } from "@/shared/ui/separator"
import { DashboardStatistics } from "@/modules/dashboard/statistics"
import { DashboardFormsList } from "@/modules/dashboard/forms-list"
import { RouteObject } from "react-router-dom"
import { ROUTES } from "@/router"

export const Dashboard = () => {
  return (
    <main>
      <Container className="mb-4">
        <DashboardStatistics />
        <Separator className="my-6" />
        <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
        <Separator className="my-6" />
        <DashboardFormsList />
      </Container>
    </main>
  )
}

export const dashboardRoute: RouteObject = {
  path: ROUTES.dashboard,
  element: <Dashboard />,
}
