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
import { FormPublic } from "@/entities/form/model/types"
import { formsApi } from "@/entities/form/model"
import { FormElementInstance } from "@/entities/form-element/model"

/** Gates */
/** =================================== */
export const SubmitGate = createGate<{ url: string }>()

/** Stores */
/** =================================== */
export const $formStore = createStore<FormPublic | null>(null).reset(
  SubmitGate.close
)
export const $formElements = createStore<FormElementInstance[]>([]).reset(
  SubmitGate.close
)

export const $isFormSubmitted = createStore<boolean>(false).reset(
  SubmitGate.close
)

// export const $isFormSubmitted = $formStore.map((state) => {
//   if (!state) return false
//   const submittedForms: string[] = JSON.parse(
//     localStorage.getItem("submitted-forms") || "[]"
//   )
//   return submittedForms.includes(state!.shareURL)
// })

/** Events */
/** =================================== */
export const getForm = createEvent<{ url: number }>()

/** Effects */
/** =================================== */
type GetFormFxParams = { url: string; controller: AbortController }

export const getFormFx = createEffect<GetFormFxParams, FormPublic>(
  async ({ url, controller }) => {
    const form = await formsApi.getFormByUrl(url, {
      signal: controller.signal,
    })
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
  clock: SubmitGate.open,
  fn: ({ url }) => ({ url, controller: new AbortController() }),
  target: getFormFx,
})

sample({
  clock: SubmitGate.close,
  source: getFormFx,
  filter: ({ controller }) => !!controller,
  fn: ({ controller }) => controller,
  target: abortGetFormFx,
})

sample({
  source: getFormFx.doneData,
  target: $formStore,
})

sample({
  source: $formStore,
  filter: (form) => !!form,
  fn: (form) => {
    return JSON.parse(form!.content)
  },
  target: $formElements,
})

sample({
  source: $formStore,
  filter: (form) => !!form,
  fn: (form) => {
    if (!form) return false
    const submittedForms: string[] = JSON.parse(
      localStorage.getItem("submitted-forms") || "[]"
    )
    return submittedForms.includes(form.shareURL)
  },
  target: $isFormSubmitted,
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
