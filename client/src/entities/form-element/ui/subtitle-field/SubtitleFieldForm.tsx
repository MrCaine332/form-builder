import { FormElementInstance } from "@/entities/form-element/model"
import { SubtitleFieldExtraAttributes } from "./"

type SubtitleFieldFormProps = {
  element: FormElementInstance<SubtitleFieldExtraAttributes>
}

export const SubtitleFieldForm = ({ element }: SubtitleFieldFormProps) => {
  const { subtitle } = element.extraAttributes
  return <p className="text-muted-foreground">{subtitle}</p>
}
