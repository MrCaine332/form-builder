import { memo } from "react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from "@/shared/utils/cn"
import { FormElementInstance } from "@/entities/form-element/model"
import { DesignerElementPlaceholder } from "@/entities/form-element/ui"
import { DesignerItem } from "../designer-item"

type DesignerItemProps = {
  element: FormElementInstance
  index: number
}

const Before = ({ element, index }: any) => {
  const droppableBefore = useDroppable({
    id: element.id + "-before",
    data: {
      type: element.type,
      elementId: element.id,
      index,
      isBeforeDesignerElement: true,
    },
  })

  return (
    <>
      <div
        ref={droppableBefore.setNodeRef}
        className="absolute top-0 w-full h-1/2 z-10"
      />
      {droppableBefore.isOver ? <DesignerElementPlaceholder /> : null}
    </>
  )
}

const After = ({ element, index }: any) => {
  const droppableAfter = useDroppable({
    id: element.id + "-after",
    data: {
      type: element.type,
      elementId: element.id,
      index,
      isAfterDesignerElement: true,
    },
  })

  return (
    <>
      <div
        ref={droppableAfter.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 z-10"
      />
      {droppableAfter.isOver ? <DesignerElementPlaceholder /> : null}
    </>
  )
}

export const DesignerItemDndWrapper = ({
  element,
  index,
}: DesignerItemProps) => {
  const draggable = useDraggable({
    id: element.id + "-draggable",
    data: {
      type: element.type,
      elementId: element.id,
      index,
      isDesignerItem: true,
    },
  })

  if (draggable.isDragging) return null

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        "relative w-full flex flex-col gap-2 hover:cursor-pointer rounded-md ring-accent-background ring-inset"
      )}
    >
      <Before index={index} element={element} />
      <DesignerItem index={index} element={element} />
      <After index={index} element={element} />
    </div>
  )
}
