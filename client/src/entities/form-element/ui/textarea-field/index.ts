import { FormElement, FormElementType } from "@/entities/form-element/model"
import { TextareaFieldDesigner } from "./TextareaFieldDesigner"
import { TextareaFieldForm } from "./TextareaFieldForm"
import { TextareaFieldProperties } from "./TextareaFieldProperties"
import { TextIcon } from "lucide-react"
import { validate } from "./validate"

const type: FormElementType = "TextareaField"

type TextareaFieldExtraAttributes = {
  label: string
  helperText: string
  required: boolean
  placeholder: string
  rows: number
}

const TextareaFieldFormElement: FormElement<TextareaFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Textarea field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
      rows: 3,
    },
  }),

  sidebarButtonElement: {
    icon: TextIcon,
    label: "Textarea Field",
  },

  designerComponent: TextareaFieldDesigner,
  formComponent: TextareaFieldForm,
  propertiesComponent: TextareaFieldProperties,

  validate: validate,
}

export { type TextareaFieldExtraAttributes, TextareaFieldFormElement }
