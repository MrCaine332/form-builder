import { Input } from "@/shared/ui/input"
import { useUnit } from "effector-react"
import { $formStore } from "@/pages/builder/model"
import { Button } from "@/shared/ui/button"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { MoveLeft, MoveRight } from "lucide-react"
import Confetti from "react-confetti"

export const BuilderPublished = () => {
  const form = useUnit($formStore)

  const shareUrl = `${window.location.origin}/submit/${form!.shareURL}`

  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full w-full">
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
      <div className="max-w-md">
        <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
          Form Published
        </h1>
        <h2 className="text-2xl">Share this form</h2>
        <h3 className="text-xl text-muted-foreground border-b pb-10">
          Anyone with the link can view and submit the form
        </h3>
        <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
          <Input className="w-full" readOnly value={shareUrl} />
          <Button
            className="mt-2 w-full"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl).then(() =>
                toast.success("Copied!", {
                  description: "Link copied to clipboard.",
                })
              )
            }}
          >
            Copy Link
          </Button>
        </div>
        <div className="flex justify-between">
          <Button variant="link" asChild>
            <Link to="/dashboard" className="gap-2">
              <MoveLeft />
              Go Back Home
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link to={`/form/${form!.id}`} className="gap-2">
              Form Details
              <MoveRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
