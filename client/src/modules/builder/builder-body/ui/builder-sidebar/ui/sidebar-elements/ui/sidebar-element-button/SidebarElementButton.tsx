import { Button } from "@/shared/ui/button"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/shared/utils/cn"
import { FormElement } from "@/entities/form-element/model"

type BuilderSidebarButtonProps = {
  formElement: FormElement
}

export const SidebarElementButton = ({
  formElement,
}: BuilderSidebarButtonProps) => {
  const { icon: Icon, label } = formElement.sidebarButtonElement

  const draggable = useDraggable({
    id: `sidebar-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isSidebarButtonElement: true,
    },
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-info"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary-foreground cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}
