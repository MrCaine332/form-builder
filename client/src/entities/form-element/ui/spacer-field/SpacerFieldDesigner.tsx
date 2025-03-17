import { FormElementInstance } from "@/entities/form-element/model"
import { SpacerFieldExtraAttributes } from "./"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import {SeparatorHorizontalIcon} from "lucide-react";

type SpacerFieldDesignerProps = {
  element: FormElementInstance<SpacerFieldExtraAttributes>
}

export const SpacerFieldDesigner = ({ element }: SpacerFieldDesignerProps) => {
  const { height } = element.extraAttributes

  return (
    <Card className="relative h-[120px] flex flex-col items-center justify-center gap-2 w-full p-4">
      <Label className="text-muted-foreground">Spacer field: {height}px</Label>
      <SeparatorHorizontalIcon />
    </Card>
  )
}
