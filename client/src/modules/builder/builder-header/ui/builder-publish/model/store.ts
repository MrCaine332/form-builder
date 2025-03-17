import { combine, createEvent, restore, sample } from "effector"
import { createEffect } from "effector/compat"
import { pending, status } from "patronum"
import { Form, formsApi } from "@/entities/form/model"
import { $formStore } from "@/pages/builder/model"
import { toast } from "sonner"

/** Events */
/** =================================== */

export const publishForm = createEvent()

/** Effects */
/** =================================== */

type PublishFormFxParams = { id: string }

export const publishFormFx = createEffect<PublishFormFxParams, any>(async ({ id }) => {
  const result = await formsApi.publishForm(id)
  return result
})

$formStore.on(publishFormFx.done, (state) => ({ ...state, isPublished: true } as Form))

/** Samples */
/** =================================== */

const publishFormStore = combine({
  form: $formStore,
  inFlight: publishFormFx.inFlight,
})

sample({
  clock: publishForm,
  source: publishFormStore,
  filter: ({ inFlight }) => inFlight === 0,
  fn: ({ form }) => ({ id: form!.id.toString() }),
  target: publishFormFx,
})

/** Status */
/** =================================== */
const $status = status({ effect: publishFormFx }).reset(publishForm)
const $pending = pending([publishFormFx])
const $error = restore(publishFormFx.failData, null).reset(
  publishForm,
  publishFormFx.done
)

export const $publishFormStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

$status.watch((status) => {
  if (status === "fail")
    toast.error("Error occured", {
      description: "We could not publish your form. We are sorry!",
    })
})
