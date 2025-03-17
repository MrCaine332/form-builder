import { FormElement, FormElementType } from "@/entities/form-element/model"
import { SubtitleFieldDesigner } from "./SubtitleFieldDesigner"
import { SubtitleFieldForm } from "./SubtitleFieldForm"
import { SubtitleFieldProperties } from "./SubtitleFieldProperties"
import { Heading2Icon } from "lucide-react"

const type: FormElementType = "SubtitleField"

type SubtitleFieldExtraAttributes = {
  subtitle: string
}

const SubtitleFieldFormElement: FormElement<SubtitleFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      subtitle: "Subtitle field",
    },
  }),

  sidebarButtonElement: {
    icon: Heading2Icon,
    label: "Subtitle Field",
  },

  designerComponent: SubtitleFieldDesigner,
  formComponent: SubtitleFieldForm,
  propertiesComponent: SubtitleFieldProperties,

  validate: () => true,
}

export { type SubtitleFieldExtraAttributes, SubtitleFieldFormElement }
