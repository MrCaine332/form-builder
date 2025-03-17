import { FormElementInstance } from "@/entities/form-element/model"
import { DateFieldExtraAttributes, DateFieldFormElement } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { useEffect, useState } from "react"
import { cn } from "@/shared/utils/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Button } from "@/shared/ui/button"
import { CalendarDaysIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/shared/ui/calendar"
import { TextFieldFormElement } from "@/entities/form-element/ui/text-field"

type DateFieldFormProps = {
  element: FormElementInstance<DateFieldExtraAttributes>
  onApply?: (key: string, value: string) => void
  isInvalid?: boolean
}

export const DateFieldForm = ({
  element,
  onApply,
  isInvalid,
}: DateFieldFormProps) => {
  const { label, helperText, required } = element.extraAttributes

  const [date, setDate] = useState<Date | undefined>(new Date())
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal gap-2",
              !date && "text-muted-foreground",
              isError && "border-destructive"
            )}
          >
            <CalendarDaysIcon size={18} />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              if (!onApply) return
              const value = date?.toUTCString() || ""
              onApply(element.id, value)
              const isValid = DateFieldFormElement.validate(element, value)
              setIsError(!isValid)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
