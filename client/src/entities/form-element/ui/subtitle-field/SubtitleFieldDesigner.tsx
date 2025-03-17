import { FormElementInstance } from "@/entities/form-element/model"
import { SubtitleFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"

type SubtitleFieldDesignerProps = {
  element: FormElementInstance<SubtitleFieldExtraAttributes>
}

export const SubtitleFieldDesigner = ({ element }: SubtitleFieldDesignerProps) => {
  const { subtitle } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col justify-center gap-2 w-full p-4">
      <Label className="text-muted-foreground">Subtitle field</Label>
      <p className="text-lg">{ subtitle }</p>
    </Card>
  )
}
