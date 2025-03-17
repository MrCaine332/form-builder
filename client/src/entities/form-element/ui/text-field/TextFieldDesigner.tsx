import { FormElementInstance } from "@/entities/form-element/model"
import { TextFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"

type TextFieldDesignerProps = {
  element: FormElementInstance<TextFieldExtraAttributes>
}

export const TextFieldDesigner = ({ element }: TextFieldDesignerProps) => {
  const { label, placeholder, helperText, required } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col gap-2 w-full p-4">
      <Label>
        {label}
        {!required ? " (optional)" : null}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText ? (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      ) : null}
    </Card>
  )
}
