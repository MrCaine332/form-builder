import { $formDetails } from "@/pages/form/model"
import { useStoreMap } from "effector-react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { toast } from "sonner"
import { Separator } from "@/shared/ui/separator"
import { Copy } from "lucide-react"

export const FormHeader = () => {
  const form = useStoreMap($formDetails, (state) => state!.form)

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`

  return (
    <div className="border-b border-muted">
      <div className="flex items-center justify-between py-10 px-4">
        <h1 className="text-4xl font-bold">{form.title}</h1>
        <Button asChild className="w-[200px]">
          <a href={shareUrl} target="_blank">
            Visit Form
          </a>
        </Button>
      </div>
      <Separator />
      <div className="flex gap-2 items-center w-full py-4 px-4">
        <Input className="w-full" readOnly value={shareUrl} />
        <Button
          className="w-[200px] shrink-0 gap-2"
          onClick={() => {
            navigator.clipboard.writeText(shareUrl).then(() =>
              toast.success("Copied!", {
                description: "Link copied to clipboard.",
              })
            )
          }}
        >
          Copy Link
          <Copy size={18} />
        </Button>
      </div>
    </div>
  )
}
