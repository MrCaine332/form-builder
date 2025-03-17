import { FormElements } from "@/entities/form-element/ui"
import { FormElementInstance } from "@/entities/form-element/model"
import { Button } from "@/shared/ui/button"
import { X } from "lucide-react"
import { unselectFormElement } from "@/modules/builder/model"
import { Separator } from "@/shared/ui/separator"

type SidebarPropertiesProps = {
  formElement: FormElementInstance
}

export const SidebarProperties = ({ formElement }: SidebarPropertiesProps) => {
  const PropertiesComponent = FormElements[formElement.type].propertiesComponent

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between items-center pb-1">
        <p className="text-sm text-muted">Element Properties</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => unselectFormElement()}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-3" />
      <PropertiesComponent element={formElement} />
    </div>
  )
}
