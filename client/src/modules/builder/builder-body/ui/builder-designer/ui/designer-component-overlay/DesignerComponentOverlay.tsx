import { Button } from "@/shared/ui/button"

import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useUnit } from "effector-react"
import {
  $selectedFormElement,
  removeFormElement,
  selectFormElement,
} from "@/modules/builder/model"
import { FormElementInstance } from "@/entities/form-element/model"
import { cn } from "@/shared/utils/cn"

export const DesignerComponentOverlay = ({
  index,
  element,
}: {
  index: number
  element: FormElementInstance
}) => {
  const selectedFormElement = useUnit($selectedFormElement)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "absolute flex z-20 top-0 left-0 w-full h-[120px] bg-muted-background/40 opacity-0 transition-all transition-150",
        isHovered && "opacity-100",
        selectedFormElement?.id === element.id && "opacity-0"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        isHovered && selectFormElement(index)
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
        <p className="text-muted-foreground text-sm">
          Click for properties or drag to move
        </p>
      </div>
      <Button
        variant="destructive"
        className="ml-auto h-full rounded-l-none"
        onClick={(e) => {
          e.stopPropagation()
          removeFormElement(index)
        }}
        disabled={!isHovered || selectedFormElement?.id === element.id}
      >
        <Trash2 />
      </Button>
    </div>
  )
}
