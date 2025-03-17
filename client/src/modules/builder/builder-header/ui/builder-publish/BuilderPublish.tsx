import { Button } from "@/shared/ui/button"
import { ArrowUpToLine, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"
import { $publishFormStatus, publishForm } from "./model"
import { useUnit } from "effector-react"
import { $formStore } from "@/pages/builder/model"

export const BuilderPublish = () => {
  const [status, form] = useUnit([$publishFormStatus, $formStore])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
          disabled={status.pending}
        >
          <ArrowUpToLine size={16} />
          Publish
          {status.pending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : null}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={status.pending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-indigo-400 to-cyan-400 gap-2"
            onClick={(e) => {
              e.preventDefault()
              publishForm()
            }}
            disabled={status.pending || form!.isPublished}
          >
            Proceed
            {status.pending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : null}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
