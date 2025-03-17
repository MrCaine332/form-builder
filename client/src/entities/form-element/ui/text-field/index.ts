import { FormElement, FormElementType } from "@/entities/form-element/model"
import { TextFieldDesigner } from "./TextFieldDesigner"
import { TextFieldForm } from "./TextFieldForm"
import { TextFieldProperties } from "./TextFieldProperties"
import { TypeIcon } from "lucide-react"
import {validate} from "./validate";

const type: FormElementType = "TextField"

type TextFieldExtraAttributes = {
  label: string
  helperText: string
  required: boolean
  placeholder: string
}

const TextFieldFormElement: FormElement<TextFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),

  sidebarButtonElement: {
    icon: TypeIcon,
    label: "Text Field",
  },

  designerComponent: TextFieldDesigner,
  formComponent: TextFieldForm,
  propertiesComponent: TextFieldProperties,

  validate: validate
}

export {
	type TextFieldExtraAttributes,
	TextFieldFormElement
}