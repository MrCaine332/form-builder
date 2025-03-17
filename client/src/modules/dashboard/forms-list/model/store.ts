import {
  attach,
  combine,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector"
import { createEffect } from "effector/compat"
import { createGate } from "effector-react"
import { pending, status } from "patronum"
import { FormWithoutContent } from "@/entities/form/model"
import { formsApi } from "@/entities/form/model"
import { toast } from "sonner"

/** Stores */
/** =================================== */
export const $formsListStore = createStore<FormWithoutContent[] | []>([])

/** Events */
/** =================================== */
export const getForms = createEvent()

/** Effects */
/** =================================== */
type GetFormsFxParams = { controller: AbortController }

export const getFormsFx = createEffect<GetFormsFxParams, FormWithoutContent[]>(
  async ({ controller }: any) => {
    const forms = await formsApi.getForms(controller.signal)
    return forms
  }
)

export const abortGetFormsFx = attach({
  source: getFormsFx.inFlight,
  effect: (inFlight, controller: AbortController) => {
    if (!controller.signal.aborted && inFlight > 0) {
      controller.abort()
    }
  },
})

/** Gates */
/** =================================== */
export const DashboardFormsListGate = createGate()

/** Samples */
/** =================================== */
sample({
  clock: DashboardFormsListGate.open,
  fn: () => ({ controller: new AbortController() }),
  target: getFormsFx,
})

sample({
  clock: DashboardFormsListGate.close,
  source: getFormsFx,
  filter: ({ controller }) => !!controller,
  fn: ({ controller }) => controller,
  target: abortGetFormsFx,
})

sample({
  source: getFormsFx.doneData,
  target: $formsListStore,
})

/** Status */
/** =================================== */
export const $status = status({ effect: getFormsFx }).reset(getForms)
export const $pending = pending([getFormsFx])
export const $error = restore(getFormsFx.failData, null).reset(
  getForms,
  getFormsFx.done
)

export const $getFormsListStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

$error.watch((error) => {
  if (error && error.name !== "CanceledError") {
    toast.error("Error occured", {
      description: "We could not get your forms. We are sorry!",
    })
  }
})
