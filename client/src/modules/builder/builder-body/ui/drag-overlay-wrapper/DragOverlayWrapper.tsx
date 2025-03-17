import React, { useState } from "react"
import { useUnit } from "effector-react"
import { $formElements } from "@/modules/builder/model"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { FormElements } from "@/entities/form-element/ui"
import {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "@/entities/form-element/model"
import { Button } from "@/shared/ui/button"

export const BuilderSidebarButtonDragOverlay = (element: FormElement) => {
  const { icon: Icon, label } = element.sidebarButtonElement
  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab hover:border-2 hover:border-info"
    >
      <Icon className="h-8 w-8 text-primary-foreground cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export const DesignerComponentOverlay = (element: FormElementInstance) => {
  const DesignerComponent = FormElements[element.type].designerComponent
  return (
    <div className="opacity-75 pointer-events-none">
      <DesignerComponent element={element} />
    </div>
  )
}

export const DragOverlayWrapper = () => {
  const formElements = useUnit($formElements)
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel(event) {
      setDraggedItem(null)
    },
    onDragEnd(event) {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let overlay = <div>No drag overlay</div>

  const draggedItemRef = draggedItem?.data.current

  /** Overlay for sidebar button */
  if (draggedItemRef?.isSidebarButtonElement) {
    const element = FormElements[draggedItemRef.type as FormElementType]
    overlay = BuilderSidebarButtonDragOverlay(element)
  }

  /** Overlay for field designer component */
  if (draggedItemRef?.isDesignerItem) {
    const element = formElements[draggedItemRef.index]
    overlay = DesignerComponentOverlay(element)
  }

  return <DragOverlay>{overlay}</DragOverlay>
}
