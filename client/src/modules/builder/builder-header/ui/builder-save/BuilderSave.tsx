import { Button } from "@/shared/ui/button"
import { SaveIcon, Loader2 } from "lucide-react"
import { $saveFormStatus, saveForm } from "./model"
import { useUnit } from "effector-react"

export const BuilderSave = () => {
  const status = useUnit($saveFormStatus)

  return (
    <Button
      variant="outline"
      disabled={status.pending}
      className="gap-2"
      onClick={() => saveForm()}
    >
      <SaveIcon size={18} />
      Save
      {status.pending ? <Loader2 size={18} className="animate-spin" /> : null}
    </Button>
  )
}
