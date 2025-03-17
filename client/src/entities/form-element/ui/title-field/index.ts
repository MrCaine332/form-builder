import { FormElement, FormElementType } from "@/entities/form-element/model"
import { TitleFieldDesigner } from "./TitleFieldDesigner"
import { TitleFieldForm } from "./TitleFieldForm"
import { TitleFieldProperties } from "./TitleFieldProperties"
import { HeadingIcon } from "lucide-react"

const type: FormElementType = "TitleField"

type TitleFieldExtraAttributes = {
  title: string
}

const TitleFieldFormElement: FormElement<TitleFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      title: "Title field",
    },
  }),

  sidebarButtonElement: {
    icon: HeadingIcon,
    label: "Title Field",
  },

  designerComponent: TitleFieldDesigner,
  formComponent: TitleFieldForm,
  propertiesComponent: TitleFieldProperties,

  validate: () => true,
}

export { type TitleFieldExtraAttributes, TitleFieldFormElement }
