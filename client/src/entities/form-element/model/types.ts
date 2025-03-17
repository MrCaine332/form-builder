import React from "react"

type LayoutElements =
  | "TitleField"
  | "SubtitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"

type FormElements =
  | "TextField"
  | "NumberField"
  | "TextareaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"

export type FormElementType = LayoutElements | FormElements

export type FormElementInstance<T = Record<string, any> | undefined> = {
  id: string
  type: FormElementType
  extraAttributes: T
}

export type FormElement<T = Record<string, any> | undefined> = {
  type: FormElementType

  construct: (id: string) => FormElementInstance<T>

  sidebarButtonElement: {
    icon: React.ElementType
    label: string
  }

  designerComponent: React.FC<{ element: FormElementInstance<T> }>
  formComponent: React.FC<{
    element: FormElementInstance<T>
    onApply?: (id: string, value: string) => void
    isInvalid?: boolean
  }>
  propertiesComponent: React.FC<{ element: FormElementInstance<T> }>

  validate: (formElement: FormElementInstance<T>, value: string) => boolean
}

export type FormElementsType = {
  [key in FormElementType]: FormElement<any>
}
