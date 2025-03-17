import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import {Separator} from "@/shared/ui/separator";

export const SeparatorFieldDesigner = () => {
  return (
    <Card className="relative h-[120px] flex flex-col justify-center gap-2 w-full p-4">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </Card>
  )
}
