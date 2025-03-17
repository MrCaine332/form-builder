import {
  DashboardStatisticsGate,
  $statisticsStore,
  $getStatisticsStatus,
} from "./model"
import { useGate, useUnit } from "effector-react"
import {
  EyeIcon,
  FileStackIcon,
  MousePointerClickIcon,
  WaypointsIcon,
} from "lucide-react"
import { StatisticsCard } from "@/entities/statistics/ui"

export const DashboardStatistics = () => {
  useGate(DashboardStatisticsGate)
  const statistics = useUnit($statisticsStore)
  const status = useUnit($getStatisticsStatus)

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatisticsCard
        title={"Total visits"}
        description={"All time form visits"}
        value={statistics?.visits || 0}
        isLoading={status.status === "pending"}
        icon={<EyeIcon className="text-blue-500" />}
        textColor="text-blue-500"
      />
      <StatisticsCard
        title={"Total submissions"}
        description={"All time form submissions"}
        value={statistics?.submissions || 0}
        isLoading={status.status === "pending"}
        icon={<FileStackIcon className="text-yellow-500" />}
        textColor="text-yellow-500"
      />
      <StatisticsCard
        title={"Submission rate"}
        description={"Visits that result in form submission"}
        value={`${Math.round(statistics?.submissionRate || 0)}%`}
        isLoading={status.status === "pending"}
        icon={<MousePointerClickIcon className="text-green-500" />}
        textColor="text-green-500"
      />
      <StatisticsCard
        title={"Bounce rate"}
        description={"Visits that leaves without interacting"}
        value={`${Math.round(statistics?.bounceRate || 0)}%`}
        isLoading={status.status === "pending"}
        icon={<WaypointsIcon className="text-red-500" />}
        textColor="text-red-500"
      />
    </div>
  )
}
