import { FormElementInstance } from "@/entities/form-element/model"
import { TextFieldExtraAttributes } from "./"

export const validate = (
  formElement: FormElementInstance<TextFieldExtraAttributes>,
  value: string
) => {
  if (formElement.extraAttributes.required) {
    return value.length > 0
  }
  return true
}
