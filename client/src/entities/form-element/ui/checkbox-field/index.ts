import { FormElement, FormElementType } from "@/entities/form-element/model"
import { CheckboxFieldDesigner } from "./CheckboxFieldDesigner"
import { CheckboxFieldForm } from "./CheckboxFieldForm"
import { CheckboxFieldProperties } from "./CheckboxFieldProperties"
import { MousePointerSquare } from "lucide-react"
import { validate } from "./validate"

const type: FormElementType = "CheckboxField"

type CheckboxFieldExtraAttributes = {
  label: string
  helperText: string
  required: boolean
}

const CheckboxFieldFormElement: FormElement<CheckboxFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Checkbox field",
      helperText: "Helper text",
      required: false,
    },
  }),

  sidebarButtonElement: {
    icon: MousePointerSquare,
    label: "Checkbox Field",
  },

  designerComponent: CheckboxFieldDesigner,
  formComponent: CheckboxFieldForm,
  propertiesComponent: CheckboxFieldProperties,

  validate: validate,
}

export { type CheckboxFieldExtraAttributes, CheckboxFieldFormElement }
