import { FormElementInstance } from "@/entities/form-element/model"
import { SelectFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { Select, SelectTrigger, SelectValue } from "@/shared/ui/select"

type SelectFieldDesignerProps = {
  element: FormElementInstance<SelectFieldExtraAttributes>
}

export const SelectFieldDesigner = ({ element }: SelectFieldDesignerProps) => {
  const { label, placeholder, helperText, required } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col gap-2 w-full p-4">
      <Label>
        {label}
        {!required ? " (optional)" : null}
      </Label>
      <Select>
        <SelectTrigger className="w-full" disabled>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
      {helperText ? (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      ) : null}
    </Card>
  )
}
