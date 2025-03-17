import { FormElement, FormElementType } from "@/entities/form-element/model"
import { SelectFieldDesigner } from "./SelectFieldDesigner"
import { SelectFieldForm } from "./SelectFieldForm"
import { SelectFieldProperties } from "./SelectFieldProperties"
import { ListChecksIcon } from "lucide-react"
import { validate } from "./validate"

const type: FormElementType = "SelectField"

type SelectFieldExtraAttributes = {
  label: string
  helperText: string
  required: boolean
  placeholder: string
  options: any[]
}

const SelectFieldFormElement: FormElement<SelectFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Select field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
      options: [],
    },
  }),

  sidebarButtonElement: {
    icon: ListChecksIcon,
    label: "Select Field",
  },

  designerComponent: SelectFieldDesigner,
  formComponent: SelectFieldForm,
  propertiesComponent: SelectFieldProperties,

  validate: validate,
}

export { type SelectFieldExtraAttributes, SelectFieldFormElement }
