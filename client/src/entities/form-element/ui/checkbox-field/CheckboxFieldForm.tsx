import { FormElementInstance } from "@/entities/form-element/model"
import { CheckboxFieldExtraAttributes, CheckboxFieldFormElement } from "./"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"
import { useEffect, useState } from "react"
import { cn } from "@/shared/utils/cn"
import { Checkbox } from "@/shared/ui/checkbox"
import { TextFieldFormElement } from "@/entities/form-element/ui/text-field"

type CheckboxFieldFormProps = {
  element: FormElementInstance<CheckboxFieldExtraAttributes>
  onApply?: (key: string, value: string) => void
  isInvalid?: boolean
}

export const CheckboxFieldForm = ({
  element,
  onApply,
  isInvalid,
}: CheckboxFieldFormProps) => {
  const { label, helperText, required } = element.extraAttributes

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(isInvalid || false)
  }, [isInvalid])

  const id = `checkbox-${element.id}`

  return (
    <Card className="flex items-center space-x-2 gap-2 w-full p-4">
      <Checkbox
        id={id}
        className={cn(isError && "border-destructive")}
        defaultChecked={false}
        onCheckedChange={(value) => {
          if (!onApply) return
          onApply(element.id, String(value))
          const isValid = CheckboxFieldFormElement.validate(
            element,
            String(value)
          )
          setIsError(!isValid)
        }}
      ></Checkbox>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(isError && "text-destructive")}>
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
