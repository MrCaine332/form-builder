import { SidebarElementButton } from "./ui"
import { FormElements } from "@/entities/form-element/ui"
import { Separator } from "@/shared/ui/separator"

export const SidebarElements = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-2 my-2 place-self-start">
          Layout Elements
        </p>
        <SidebarElementButton formElement={FormElements.TitleField} />
        <SidebarElementButton formElement={FormElements.SubtitleField} />
        <SidebarElementButton formElement={FormElements.ParagraphField} />
        <SidebarElementButton formElement={FormElements.SeparatorField} />
        <SidebarElementButton formElement={FormElements.SpacerField} />
        <p className="text-sm text-muted-foreground col-span-2 my-2 place-self-start">
          Form Elements
        </p>
        <SidebarElementButton formElement={FormElements.TextField} />
        <SidebarElementButton formElement={FormElements.NumberField} />
        <SidebarElementButton formElement={FormElements.TextareaField} />
        <SidebarElementButton formElement={FormElements.DateField} />
        <SidebarElementButton formElement={FormElements.SelectField} />
        <SidebarElementButton formElement={FormElements.CheckboxField} />
      </div>
    </div>
  )
}
