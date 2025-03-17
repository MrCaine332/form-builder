import { FormElementInstance } from "@/entities/form-element/model"
import { TextareaFieldExtraAttributes } from "./"

export const validate = (
  formElement: FormElementInstance<TextareaFieldExtraAttributes>,
  value: string
) => {
  if (formElement.extraAttributes.required) {
    return value.length > 0
  }
  return true
}
