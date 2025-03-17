import { FormElement, FormElementType } from "@/entities/form-element/model"
import { DateFieldDesigner } from "./DateFieldDesigner"
import { DateFieldForm } from "./DateFieldForm"
import { DateFieldProperties } from "./DateFieldProperties"
import { CalendarDaysIcon } from "lucide-react"
import { validate } from "./validate"

const type: FormElementType = "DateField"

type DateFieldExtraAttributes = {
  label: string
  helperText: string
  required: boolean
}

const DateFieldFormElement: FormElement<DateFieldExtraAttributes> = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Date field",
      helperText: "Pick a date",
      required: false,
    },
  }),

  sidebarButtonElement: {
    icon: CalendarDaysIcon,
    label: "Date Field",
  },

  designerComponent: DateFieldDesigner,
  formComponent: DateFieldForm,
  propertiesComponent: DateFieldProperties,

  validate: validate,
}

export { type DateFieldExtraAttributes, DateFieldFormElement }
