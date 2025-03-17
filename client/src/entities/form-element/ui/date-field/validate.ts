import { FormElementInstance } from "@/entities/form-element/model"
import { DateFieldExtraAttributes } from "./"

export const validate = (
  formElement: FormElementInstance<DateFieldExtraAttributes>,
  value: string
) => {
  if (formElement.extraAttributes.required) {
    return value.length > 0
  }
  return true
}
