import { FormElementInstance } from "@/entities/form-element/model"
import { CheckboxFieldExtraAttributes } from "./"

export const validate = (
  formElement: FormElementInstance<CheckboxFieldExtraAttributes>,
  value: string
) => {
  if (formElement.extraAttributes.required) {
    return value === "true"
  }
  return true
}
