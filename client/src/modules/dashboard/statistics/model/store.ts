import {
  attach,
  combine,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector"
import { createEffect } from "effector/compat"
import { pending, status } from "patronum"
import { createGate } from "effector-react"
import { toast } from "sonner"
import { Statistics, statisticsApi } from "@/entities/statistics/model"

/** Stores */
/** =================================== */
export const $statisticsStore = createStore<Statistics | null>(null)

/** Events */
/** =================================== */
export const getStatistics = createEvent()

/** Effects */
/** =================================== */
type GetStatisticsFxParams = { controller: AbortController }

const getStatisticsFx = createEffect<GetStatisticsFxParams, Statistics>(
  async ({ controller }: any) => {
    const statistics = await statisticsApi.getStatistics(controller.signal)
    return statistics
  }
)

const abortGetStatisticsFx = attach({
  source: getStatisticsFx.inFlight,
  effect: (inFlight, controller: AbortController) => {
    if (!controller.signal.aborted && inFlight > 0) {
      controller.abort()
    }
  },
})

export const DashboardStatisticsGate = createGate()

/** Samples */
/** =================================== */
sample({
  clock: DashboardStatisticsGate.open,
  fn: () => ({ controller: new AbortController() }),
  target: getStatisticsFx,
})

sample({
  clock: DashboardStatisticsGate.close,
  source: getStatisticsFx,
  filter: ({ controller }) => !!controller,
  fn: ({ controller }) => controller,
  target: abortGetStatisticsFx,
})

sample({
  source: getStatisticsFx.doneData,
  target: $statisticsStore,
})

/** Status */
/** =================================== */
export const $status = status({ effect: getStatisticsFx }).reset(getStatistics)
export const $pending = pending([getStatisticsFx])
export const $error = restore(getStatisticsFx.failData, null).reset(
  getStatistics,
  getStatisticsFx.done
)

export const $getStatisticsStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

$error.watch((error) => {
  if (error && error.name !== "CanceledError") {
    toast.error("Error occured", {
      description: "We could not get your statistics. We are sorry!",
    })
  }
})
