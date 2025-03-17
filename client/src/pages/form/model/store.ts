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
import { FormDetails } from "@/entities/form/model/types"
import { formsApi } from "@/entities/form/model"

/** Gates */
/** =================================== */
export const FormGate = createGate<{ id: string }>()

/** Stores */
/** =================================== */
export const $formDetails = createStore<FormDetails | null>(null).reset(
  FormGate.close
)

/** Events */
/** =================================== */
export const getFormDetails = createEvent<{ id: number }>()

/** Effects */
/** =================================== */
type GetFormDetailsFxParams = { id: string; controller: AbortController }

export const getFormDetailsFx = createEffect<
  GetFormDetailsFxParams,
  FormDetails
>(async ({ id, controller }) => {
  const formDetails = await formsApi.getFormDetails(id, controller.signal)
  return formDetails
})

export const abortGetFormDetailsFx = attach({
  source: getFormDetailsFx.inFlight,
  effect: (inFlight, controller: AbortController) => {
    if (!controller.signal.aborted && inFlight > 0) {
      controller.abort()
    }
  },
})

/** Samples */
/** =================================== */

sample({
  clock: FormGate.open,
  fn: ({ id }) => ({ id, controller: new AbortController() }),
  target: getFormDetailsFx,
})

sample({
  clock: FormGate.close,
  source: getFormDetailsFx,
  filter: ({ controller }) => !!controller,
  fn: ({ controller }) => controller,
  target: abortGetFormDetailsFx,
})

sample({
  source: getFormDetailsFx.doneData,
  target: $formDetails,
})

/** Status */
/** =================================== */
const $getFormDetailsStatuses = status({ effect: getFormDetailsFx }).reset(
  getFormDetails
)
const $getFormDetailsPending = pending([getFormDetailsFx])
const $getFormDetailsError = restore(getFormDetailsFx.failData, null).reset(
  getFormDetails,
  getFormDetailsFx.done
)

export const $getFormDetailsStatus = combine({
  status: $getFormDetailsStatuses,
  pending: $getFormDetailsPending,
  error: $getFormDetailsError,
})
