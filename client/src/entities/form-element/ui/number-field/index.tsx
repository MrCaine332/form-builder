import { FormElement, FormElementType } from "@/entities/form-element/model"
import { NumberFieldDesigner } from "./NumberFieldDesigner"
import { NumberFieldForm } from "./NumberFieldForm"
import { NumberFieldProperties } from "./NumberFieldProperties"
import { validate } from "./validate"

const type: FormElementType = "NumberField"

type NumberFieldExtraAttributes = {
  label: string
  helperText: string
  required: boolean
  placeholder: string
}

const NumberFieldFormElement: FormElement<NumberFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Number field",
      helperText: "Helper text",
      required: false,
      placeholder: "0",
    },
  }),

  sidebarButtonElement: {
    icon: () => <span className="text-2xl text-bold">123</span>,
    label: "Number Field",
  },

  designerComponent: NumberFieldDesigner,
  formComponent: NumberFieldForm,
  propertiesComponent: NumberFieldProperties,

  validate: validate,
}

export { type NumberFieldExtraAttributes, NumberFieldFormElement }
