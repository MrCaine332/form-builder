import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { PropsWithChildren } from "react"

export const DndContextWithSensors = ({ children }: PropsWithChildren) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 10,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  return <DndContext sensors={sensors}>
	  { children }
  </DndContext>
}
