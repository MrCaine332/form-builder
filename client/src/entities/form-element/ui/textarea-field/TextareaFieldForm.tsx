import { FormElementInstance } from "@/entities/form-element/model"
import { TextareaFieldExtraAttributes, TextareaFieldFormElement } from "./"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"
import { useEffect, useState } from "react"
import { cn } from "@/shared/utils/cn"
import { Textarea } from "@/shared/ui/textarea"

type TextareaFieldFormProps = {
  element: FormElementInstance<TextareaFieldExtraAttributes>
  onApply?: (key: string, value: string) => void
  isInvalid?: boolean
}

export const TextareaFieldForm = ({
  element,
  onApply,
  isInvalid,
}: TextareaFieldFormProps) => {
  const { label, placeholder, helperText, required, rows } =
    element.extraAttributes

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(isInvalid || false)
  }, [isInvalid])

  return (
    <Card className="relative flex flex-col gap-2 w-full p-4">
      <Label className={cn(isError && "text-destructive")}>
        {label}
        {!required ? " (optional)" : null}
      </Label>
      <Textarea
        rows={rows}
        className={cn(isError && "border-destructive")}
        placeholder={placeholder}
        onBlur={(e) => {
          if (!onApply) return
          onApply(element.id, e.target.value)
          const isValid = TextareaFieldFormElement.validate(
            element,
            e.target.value
          )
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
