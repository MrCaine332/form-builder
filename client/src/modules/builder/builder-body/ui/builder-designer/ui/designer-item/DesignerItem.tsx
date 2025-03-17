import { memo } from "react"
import { useUnit } from "effector-react"
import { FormElementInstance } from "@/entities/form-element/model"
import { $selectedFormElement } from "@/modules/builder/model"
import { FormElements } from "@/entities/form-element/ui"
import { cn } from "@/shared/utils/cn"
import { DesignerComponentOverlay } from "../designer-component-overlay"

type DesignerItemProps = {
  index: number
  element: FormElementInstance
}

export const DesignerItem = memo(({ index, element }: DesignerItemProps) => {
  const selectedFormElement = useUnit($selectedFormElement)
  const DesignerComponent = FormElements[element.type].designerComponent

  return (
    <div
      className={cn(
        "relative w-full border-2 border-transparent rounded-lg box-border",
        selectedFormElement?.id === element.id && "border-info"
      )}
      data-selected={selectedFormElement?.id === element.id}
    >
      <DesignerComponent key={element.id} element={element} />
      <DesignerComponentOverlay index={index} element={element} />
    </div>
  )
})
