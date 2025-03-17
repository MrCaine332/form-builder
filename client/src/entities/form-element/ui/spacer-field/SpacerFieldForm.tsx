import { FormElementInstance } from "@/entities/form-element/model"
import { SpacerFieldExtraAttributes } from "./"

type SpacerFieldFormProps = {
  element: FormElementInstance<SpacerFieldExtraAttributes>
}

export const SpacerFieldForm = ({ element }: SpacerFieldFormProps) => {
  const { height } = element.extraAttributes
  return <div style={{ height, width: "100%" }} />
}
