import { combine, createEvent, restore, sample } from "effector"
import { createEffect } from "effector/compat"
import { pending, status } from "patronum"
import { FormPublic, formsApi } from "@/entities/form/model"
import {$formStore, $isFormSubmitted} from "@/pages/submit/model"
import { toast } from "sonner"

/** Events */
/** =================================== */

export const submitForm = createEvent<{ content: string }>()

/** Effects */
/** =================================== */

type SubmitFormFxParams = { url: string; content: string }

const submitFormFx = createEffect<SubmitFormFxParams, any>(
  async ({ url, content }) => {
    const result = await formsApi.submitForm(url, content)
    return result
  }
)

/** Samples */
/** =================================== */

const submitFormStore = combine({
  form: $formStore,
  inFlight: submitFormFx.inFlight,
})

sample({
  clock: submitForm,
  source: submitFormStore,
  filter: ({ inFlight }) => inFlight === 0,
  fn: ({ form }, { content }) => ({ url: form!.shareURL, content }),
  target: submitFormFx,
})

sample({
  clock: submitFormFx.done,
  source: $formStore,
  fn: (form) => {
    const { shareURL } = form as FormPublic
    const submittedForms: string[] = JSON.parse(
      localStorage.getItem("submitted-forms") || "[]"
    )
    submittedForms.push(shareURL)
    localStorage.setItem("submitted-forms", JSON.stringify(submittedForms))

	  return true
  },
	target: $isFormSubmitted,
})

/** Status */
/** =================================== */
export const $status = status({ effect: submitFormFx }).reset(submitForm)
export const $pending = pending([submitFormFx])
export const $error = restore(submitFormFx.failData, null).reset(
  submitForm,
  submitFormFx.done
)

export const $submitFormStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

$status.watch((status) => {
  if (status === "fail")
    toast.error("Error occured", {
      description: "We could not submit the form. We are sorry!",
    })
})
