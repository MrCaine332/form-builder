import { FormElementInstance } from "@/entities/form-element/model"
import { SelectFieldExtraAttributes } from "./"

export const validate = (
  formElement: FormElementInstance<SelectFieldExtraAttributes>,
  value: string
) => {
  if (formElement.extraAttributes.required) {
    return value.length > 0
  }
  return true
}
