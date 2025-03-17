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
import { Form } from "@/entities/form/model/types"
import { formsApi } from "@/entities/form/model"

/** Gates */
/** =================================== */
export const BuilderGate = createGate<{ id: string }>()

/** Stores */
/** =================================== */
export const $formStore = createStore<Form | null>(null).reset(
  BuilderGate.close
)

/** Events */
/** =================================== */
export const getForm = createEvent<{ id: number }>()

/** Effects */
/** =================================== */
type GetFormFxParams = { id: string; controller: AbortController }

export const getFormFx = createEffect<GetFormFxParams, Form>(
  async ({ id, controller }) => {
    const form = await formsApi.getForm(id, { signal: controller.signal })
    return form
  }
)

export const abortGetFormFx = attach({
  source: getFormFx.inFlight,
  effect: (inFlight, controller: AbortController) => {
    if (!controller.signal.aborted && inFlight > 0) {
      controller.abort()
    }
  },
})

/** Samples */
/** =================================== */

sample({
  clock: BuilderGate.open,
  fn: ({ id }) => ({ id, controller: new AbortController() }),
  target: getFormFx,
})

sample({
  clock: BuilderGate.close,
  source: getFormFx,
  filter: ({ controller }) => !!controller,
  fn: ({ controller }) => controller,
  target: abortGetFormFx,
})

sample({
  source: getFormFx.doneData,
  target: $formStore,
})

/** Status */
/** =================================== */
const $getFormStatuses = status({ effect: getFormFx }).reset(getForm)
const $getFormPending = pending([getFormFx])
const $getFormError = restore(getFormFx.failData, null).reset(
  getForm,
  getFormFx.done
)

export const $getFormStatus = combine({
  status: $getFormStatuses,
  pending: $getFormPending,
  error: $getFormError,
})
