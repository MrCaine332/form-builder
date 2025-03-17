import { FormElementInstance } from "@/entities/form-element/model"
import { ParagraphFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"

type ParagraphFieldDesignerProps = {
  element: FormElementInstance<ParagraphFieldExtraAttributes>
}

export const ParagraphFieldDesigner = ({ element }: ParagraphFieldDesignerProps) => {
  const { text } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col justify-center gap-2 w-full p-4">
      <Label className="text-muted-foreground">Paragraph field</Label>
      <p>{ text }</p>
    </Card>
  )
}
