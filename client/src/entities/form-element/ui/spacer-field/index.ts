import { FormElement, FormElementType } from "@/entities/form-element/model"
import { SpacerFieldDesigner } from "./SpacerFieldDesigner"
import { SpacerFieldForm } from "./SpacerFieldForm"
import { SpacerFieldProperties } from "./SpacerFieldProperties"
import { HeadingIcon, SpaceIcon } from "lucide-react"

const type: FormElementType = "SpacerField"

type SpacerFieldExtraAttributes = {
  height: number
}

const SpacerFieldFormElement: FormElement<SpacerFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      height: 20,
    },
  }),

  sidebarButtonElement: {
    icon: SpaceIcon,
    label: "Spacer Field",
  },

  designerComponent: SpacerFieldDesigner,
  formComponent: SpacerFieldForm,
  propertiesComponent: SpacerFieldProperties,

  validate: () => true,
}

export { type SpacerFieldExtraAttributes, SpacerFieldFormElement }
