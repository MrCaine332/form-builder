import { FormElementInstance } from "@/entities/form-element/model"
import { NumberFieldExtraAttributes } from "./"

export const validate = (
  formElement: FormElementInstance<NumberFieldExtraAttributes>,
  value: string
) => {
	if (formElement.extraAttributes.required) {
		return value.length > 0
	}
	return true
}
