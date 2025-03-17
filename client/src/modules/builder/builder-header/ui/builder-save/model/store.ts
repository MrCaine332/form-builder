import { combine, createEvent, restore, sample } from "effector"
import { createEffect } from "effector/compat"
import { pending, status } from "patronum"
import { formsApi } from "@/entities/form/model"
import { FormElementInstance } from "@/entities/form-element/model"
import { $formStore } from "@/pages/builder/model"
import { $formElements } from "@/modules/builder/model"
import { toast } from "sonner"

/** Events */
/** =================================== */

export const saveForm = createEvent()

/** Effects */
/** =================================== */

type SaveFormFxParams = { id: string; elements: FormElementInstance[] }

const saveFormFx = createEffect<SaveFormFxParams, any>(
  async ({ id, elements }) => {
    const content = JSON.stringify(elements)
    const result = await formsApi.saveForm(id, content)
    return result
  }
)

/** Samples */
/** =================================== */

const saveFormStore = combine({
  form: $formStore,
  elements: $formElements,
  inFlight: saveFormFx.inFlight,
})

sample({
  clock: saveForm,
  source: saveFormStore,
  filter: ({ inFlight }) => inFlight === 0,
  fn: ({ form, elements }) => ({ id: form!.id.toString(), elements }),
  target: saveFormFx,
})

/** Status */
/** =================================== */
const $status = status({ effect: saveFormFx }).reset(saveForm)
const $pending = pending([saveFormFx])
const $error = restore(saveFormFx.failData, null).reset(
  saveForm,
  saveFormFx.done
)

export const $saveFormStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

$status.watch((status) => {
  if (status === "done")
    toast.success("Saved", {
      description: "Your form has been successfully saved! Now you just need to publish it.",
    })
  if (status === "fail")
    toast.error("Error occured", {
      description: "We could not save your form. We are sorry!",
    })
})
