import { FormElementInstance } from "@/entities/form-element/model"
import { CheckboxFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"
import {Checkbox} from "@/shared/ui/checkbox";

type CheckboxFieldDesignerProps = {
  element: FormElementInstance<CheckboxFieldExtraAttributes>
}

export const CheckboxFieldDesigner = ({
  element,
}: CheckboxFieldDesignerProps) => {
  const { label, helperText, required } = element.extraAttributes

  const id = `checkbox-${element.id}`

  return (
    <Card className="h-[120px] flex items-center space-x-2 gap-2 w-full p-4">
      <Checkbox id={id} ></Checkbox>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {!required ? " (optional)" : null}
        </Label>

        {helperText ? (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        ) : null}
      </div>
    </Card>
  )
}
