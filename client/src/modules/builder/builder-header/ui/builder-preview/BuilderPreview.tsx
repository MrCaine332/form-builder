import { useUnit } from "effector-react"
import { $formElements } from "@/modules/builder/model"
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { EyeIcon } from "lucide-react"
import { FormElements } from "@/entities/form-element/ui"

export const BuilderPreview = () => {
  const formElements = useUnit($formElements)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <EyeIcon size={18} />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0 !rounded-none">
        <div className="px-4 py-2 border-b border-border rounded-none">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-muted-background/70 bg-[url(/src/shared/assets/images/grid.svg)] dark:bg-[url(/src/shared/assets/images/grid-dark.svg)]">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {formElements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent
              return <FormComponent key={element.id} element={element} />
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
