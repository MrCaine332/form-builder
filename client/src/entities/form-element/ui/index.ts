import { FormElementsType } from "../model"
import { TitleFieldFormElement } from "./title-field"
import { SubtitleFieldFormElement } from "./subtitle-field"
import { ParagraphFieldFormElement } from "./paragraph-field"
import { SeparatorFieldFormElement } from "./separator-field"
import { TextFieldFormElement } from "./text-field"
import { SpacerFieldFormElement } from "./spacer-field"
import { NumberFieldFormElement } from "./number-field"
import { TextareaFieldFormElement } from "./textarea-field"
import { DateFieldFormElement } from "./date-field"
import { SelectFieldFormElement } from "./select-field"
import { CheckboxFieldFormElement } from "./checkbox-field"

export const FormElements: FormElementsType = {
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,

  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
}

export { DesignerElementPlaceholder } from "./DesignerElementPlaceholder"
