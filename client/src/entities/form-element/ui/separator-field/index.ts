import { FormElement, FormElementType } from "@/entities/form-element/model"
import { SeparatorFieldDesigner } from "./SeparatorFieldDesigner"
import { SeparatorFieldForm } from "./SeparatorFieldForm"
import { SeparatorFieldProperties } from "./SeparatorFieldProperties"
import { SeparatorHorizontalIcon } from "lucide-react"

const type: FormElementType = "SeparatorField"

const SeparatorFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {},
  }),

  sidebarButtonElement: {
    icon: SeparatorHorizontalIcon,
    label: "Separator Field",
  },

  designerComponent: SeparatorFieldDesigner,
  formComponent: SeparatorFieldForm,
  propertiesComponent: SeparatorFieldProperties,

  validate: () => true,
}

export { SeparatorFieldFormElement }
