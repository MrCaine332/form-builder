import { useUnit } from "effector-react"
import { $selectedFormElement } from "@/modules/builder/model"
import { SidebarElements, SidebarProperties } from "./ui"

export const BuilderSidebar = () => {
  const selectedFormElement = useUnit($selectedFormElement)

  return (
    <aside className="flex-shrink-0 w-[300px] border-l-2 bg-background pr-1">
      <div className="sticky top-0 flex flex-col gap-2 p-4 overflow-y-auto max-h-[100vh]">
        {selectedFormElement ? (
          <SidebarProperties formElement={selectedFormElement} />
        ) : (
          <SidebarElements />
        )}
      </div>
    </aside>
  )
}
