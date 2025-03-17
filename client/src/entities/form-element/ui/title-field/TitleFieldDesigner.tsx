import { FormElementInstance } from "@/entities/form-element/model"
import { TitleFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"

type TitleFieldDesignerProps = {
  element: FormElementInstance<TitleFieldExtraAttributes>
}

export const TitleFieldDesigner = ({ element }: TitleFieldDesignerProps) => {
  const { title } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col justify-center gap-2 w-full p-4">
      <Label className="text-muted-foreground">Title field</Label>
      <p className="text-xl">{ title }</p>
    </Card>
  )
}
