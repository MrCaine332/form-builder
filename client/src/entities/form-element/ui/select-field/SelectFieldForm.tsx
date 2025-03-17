import { FormElementInstance } from "@/entities/form-element/model"
import { SelectFieldExtraAttributes, SelectFieldFormElement } from "./"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Card } from "@/shared/ui/card"
import { useEffect, useState } from "react"
import { cn } from "@/shared/utils/cn"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

type SelectFieldFormProps = {
  element: FormElementInstance<SelectFieldExtraAttributes>
  onApply?: (key: string, value: string) => void
  isInvalid?: boolean
}

export const SelectFieldForm = ({
  element,
  onApply,
  isInvalid,
}: SelectFieldFormProps) => {
  const { label, placeholder, helperText, required, options } =
    element.extraAttributes

  const [value, setValue] = useState("")
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
      <Select>
        <SelectTrigger
          className={cn("w-full", isError && "border-destructive")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
