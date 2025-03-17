import {
  BuilderDesigner,
  BuilderSidebar,
  DndContextWithSensors,
  DragOverlayWrapper,
} from "./ui"

export const BuilderBody = () => {
  return (
    <DndContextWithSensors>
      <div className="flex flex-grow">
        <BuilderDesigner />
        <BuilderSidebar />
      </div>
      <DragOverlayWrapper />
    </DndContextWithSensors>
  )
}
