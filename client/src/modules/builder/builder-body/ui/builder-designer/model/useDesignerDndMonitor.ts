import styles from "./UseDesignerDndMonitor.module.scss"
import { useDndMonitor } from "@dnd-kit/core"
import { FormElements } from "@/entities/form-element/ui"
import {
  FormElementInstance,
  FormElementType,
} from "@/entities/form-element/model"
import { v4 } from "uuid"

import { useState } from "react"
import { addFormElement, moveFormElement } from "@/modules/builder/model"

export const useDesignerDndMonitor = (formElements: FormElementInstance[]) => {
  const [isDragged, setIsDragged] = useState(false)

  useDndMonitor({
    onDragStart(event) {
      setIsDragged(true)
    },
    onDragEnd(event) {
      setIsDragged(false)
      const { active, over } = event
      if (!active || !over) return

      /** Get active element property */
      const isSidebarButtonElement =
        active.data?.current?.isSidebarButtonElement
      const isDesignerItem = active.data?.current?.isDesignerItem

      /** If active element is not one of following, return without changes */
      if (!isSidebarButtonElement && !isDesignerItem) return

      /** Find the place where drop ended */
      const isDesignerDropArea = over.data?.current?.isDesignerDropArea
      const isBeforeDesignerElement =
        over.data?.current?.isBeforeDesignerElement
      const isAfterDesignerElement = over.data?.current?.isAfterDesignerElement

      /** If dropped over main canvas (designer) */
      if (isDesignerDropArea) {
        const type = active.data.current!.type

        /** If active is sidebar button */
        /** Else if active is existing on canvas element */
        if (isSidebarButtonElement) {
          const newElement =
            FormElements[type as FormElementType].construct(v4())

          addFormElement({ index: formElements.length, element: newElement })
        } else if (isDesignerItem) {
          const oldIndex = active.data.current!.index
          moveFormElement({ oldIndex: oldIndex, newIndex: formElements.length })
        }
      }

      /** If dropped over top half of another designer item (before the item) */
      if (isBeforeDesignerElement) {
        const type = active.data.current!.type
        const index = over.data.current!.index

        /** If active is sidebar button */
        /** Else if active is existing on canvas element */
        if (isSidebarButtonElement) {
          const newElement =
            FormElements[type as FormElementType].construct(v4())
          addFormElement({ index: index, element: newElement })
        } else if (isDesignerItem) {
          const oldIndex = active.data.current!.index
          moveFormElement({ oldIndex: oldIndex, newIndex: index })
        }
      }

      /** If dropped over bottom half of another designer item (after the item) */
      if (isAfterDesignerElement) {
        const type = active.data.current!.type
        const index = over.data.current!.index

        /** If active is sidebar button */
        /** Else if active is existing on canvas element */
        if (isSidebarButtonElement) {
          const newElement =
            FormElements[type as FormElementType].construct(v4())
          addFormElement({ index: index + 1, element: newElement })
        } else if (isDesignerItem) {
          const oldIndex = active.data.current!.index
          moveFormElement({ oldIndex: oldIndex, newIndex: index + 1 })
        }
      }
    },
    onDragCancel() {
      setIsDragged(false)
    },
  })

  return isDragged
}
