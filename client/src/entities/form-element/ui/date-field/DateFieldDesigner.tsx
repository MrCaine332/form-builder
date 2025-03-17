import { FormElementInstance } from "@/entities/form-element/model"
import { DateFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { CalendarDaysIcon } from "lucide-react"

type DateFieldDesignerProps = {
  element: FormElementInstance<DateFieldExtraAttributes>
}

export const DateFieldDesigner = ({ element }: DateFieldDesignerProps) => {
  const { label, helperText, required } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col gap-2 w-full p-4">
      <Label>
        {label}
        {!required ? " (optional)" : null}
      </Label>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal gap-2"
        disabled
      >
        <CalendarDaysIcon size={18} />
        Pick a date
      </Button>
      {helperText ? (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      ) : null}
    </Card>
  )
}
