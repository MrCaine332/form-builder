import { FormElementInstance } from "@/entities/form-element/model"
import { TitleFieldExtraAttributes } from "./"

type TitleFieldFormProps = {
  element: FormElementInstance<TitleFieldExtraAttributes>
}

export const TitleFieldForm = ({ element }: TitleFieldFormProps) => {
  const { title } = element.extraAttributes
  return <p className="text-xl">{title}</p>
}
