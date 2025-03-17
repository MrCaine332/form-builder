import { FormElementInstance } from "@/entities/form-element/model"
import { NumberFieldExtraAttributes, NumberFieldFormElement } from "./"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"
import { useEffect, useState } from "react"
import { cn } from "@/shared/utils/cn"

type NumberFieldFormProps = {
  element: FormElementInstance<NumberFieldExtraAttributes>
  onApply?: (key: string, value: string) => void
  isInvalid?: boolean
}

export const NumberFieldForm = ({
  element,
  onApply,
  isInvalid,
}: NumberFieldFormProps) => {
  const { label, placeholder, helperText, required } = element.extraAttributes

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(isInvalid || false)
  }, [isInvalid])

  return (
    <Card className="relative h-[120px] flex flex-col gap-2 w-full p-4">
      <Label className={cn(isError && "text-destructive")}>
        {label}
        {!required ? " (optional)" : null}
      </Label>
      <Input
        type="number"
        className={cn(isError && "border-destructive")}
        placeholder={placeholder}
        onBlur={(e) => {
          if (!onApply) return
          onApply(element.id, e.target.value)
          const isValid = NumberFieldFormElement.validate(element, e.target.value)
          setIsError(!isValid)
        }}
      />
      {helperText ? (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            isError && "text-destructive"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </Card>
  )
}
