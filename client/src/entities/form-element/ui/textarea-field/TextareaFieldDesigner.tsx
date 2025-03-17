import { FormElementInstance } from "@/entities/form-element/model"
import { TextareaFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { Textarea } from "@/shared/ui/textarea"

type TextareaFieldDesignerProps = {
  element: FormElementInstance<TextareaFieldExtraAttributes>
}

export const TextareaFieldDesigner = ({
  element,
}: TextareaFieldDesignerProps) => {
  const { label, placeholder, helperText, required, rows } =
    element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col gap-2 w-full p-4">
      <Label>
        {label}
        {!required ? " (optional)" : null}
      </Label>
      <Textarea readOnly disabled placeholder={placeholder} className="min-h-0" />
      {helperText ? (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      ) : null}
    </Card>
  )
}
