import { FormElement, FormElementType } from "@/entities/form-element/model"
import { ParagraphFieldDesigner } from "./ParagraphFieldDesigner"
import { ParagraphFieldForm } from "./ParagraphFieldForm"
import { ParagraphFieldProperties } from "./ParagraphFieldProperties"
import { PilcrowIcon } from "lucide-react"

const type: FormElementType = "ParagraphField"

type ParagraphFieldExtraAttributes = {
  text: string
}

const ParagraphFieldFormElement: FormElement<ParagraphFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      text: "Paragraph text",
    },
  }),

  sidebarButtonElement: {
    icon: PilcrowIcon,
    label: "Paragraph Field",
  },

  designerComponent: ParagraphFieldDesigner,
  formComponent: ParagraphFieldForm,
  propertiesComponent: ParagraphFieldProperties,

  validate: () => true,
}

export { type ParagraphFieldExtraAttributes, ParagraphFieldFormElement }
