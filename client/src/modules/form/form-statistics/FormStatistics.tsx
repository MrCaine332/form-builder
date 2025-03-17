import { useStoreMap } from "effector-react"
import {
  EyeIcon,
  FileStackIcon,
  MousePointerClickIcon,
  WaypointsIcon,
} from "lucide-react"
import { StatisticsCard } from "@/entities/statistics/ui"
import {$formDetails} from "@/pages/form/model"

export const FormStatistics = () => {
  const formStatistics = useStoreMap($formDetails, (state) => state!.statistics)

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatisticsCard
        title={"Total visits"}
        description={"All time form visits"}
        value={formStatistics.visits || 0}
        icon={<EyeIcon className="text-blue-500" />}
        textColor="text-blue-500"
      />
      <StatisticsCard
        title={"Total submissions"}
        description={"All time form submissions"}
        value={formStatistics.submissions || 0}
        icon={<FileStackIcon className="text-yellow-500" />}
        textColor="text-yellow-500"
      />
      <StatisticsCard
        title={"Submission rate"}
        description={"Visits that result in form submission"}
        value={`${Math.round(formStatistics.submissionRate || 0)}%`}
        icon={<MousePointerClickIcon className="text-green-500" />}
        textColor="text-green-500"
      />
      <StatisticsCard
        title={"Bounce rate"}
        description={"Visits that leaves without interacting"}
        value={`${Math.round(formStatistics.bounceRate || 0)}%`}
        icon={<WaypointsIcon className="text-red-500" />}
        textColor="text-red-500"
      />
    </div>
  )
}
