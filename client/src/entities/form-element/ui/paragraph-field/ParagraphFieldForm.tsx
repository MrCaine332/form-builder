import { FormElementInstance } from "@/entities/form-element/model"
import { ParagraphFieldExtraAttributes } from "./"

type ParagraphFieldFormProps = {
  element: FormElementInstance<ParagraphFieldExtraAttributes>
}

export const ParagraphFieldForm = ({ element }: ParagraphFieldFormProps) => {
  const { text } = element.extraAttributes
  return <p>{text}</p>
}
