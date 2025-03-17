import { useUnit } from "effector-react"
import { Section } from "@/shared/ui/section"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/shared/utils/cn"
import {
  $formElements,
  $selectedFormElement,
  unselectFormElement,
} from "@/modules/builder/model"
import { DesignerElementPlaceholder } from "@/entities/form-element/ui"
import { DesignerItemDndWrapper } from "./ui"
import { useDesignerDndMonitor } from "./model/useDesignerDndMonitor"

export const BuilderDesigner = () => {
  const [formElements, selectedFormElement] = useUnit([
    $formElements,
    $selectedFormElement,
  ])

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

  const isDragged = useDesignerDndMonitor(formElements)

  return (
    <div className="flex flex-grow items-center justify-center p-4 relative overflow-y-auto bg-muted-background/70 bg-[url(/src/shared/assets/images/grid.svg)] dark:bg-[url(/src/shared/assets/images/grid-dark.svg)]">
      <Section
        ref={droppable.setNodeRef}
        className={cn(
          "relative flex flex-col items-center justify-start gap-2 w-full h-full max-w-[920px] bg-section-background rounded-xl p-4 shadow-sm",
          isDragged && "ring ring-info"
        )}
        onClick={() => {
          if (selectedFormElement) unselectFormElement()
        }}
      >
        {!droppable.isOver && formElements.length === 0 ? (
          <p className="text-3xl font-bold text-muted-foreground absolute top-0 left-0 w-full h-full flex items-center justify-center bg-foreground/15 rounded-xl">
            Drop Here
          </p>
        ) : null}

        {formElements.map((element, index) => (
          <DesignerItemDndWrapper
            key={element.id}
            element={element}
            index={index}
          />
        ))}

        {droppable.isOver ? <DesignerElementPlaceholder /> : null}
      </Section>
    </div>
  )
}
