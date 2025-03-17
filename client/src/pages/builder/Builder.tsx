import { useEffect } from "react"
import { RouteObject, useNavigate, useParams } from "react-router-dom"
import { useGate, useUnit } from "effector-react"
import { Loader } from "@/shared/ui/loader"
import { $formStore, $getFormStatus, BuilderGate } from "@/pages/builder/model"
import { toast } from "sonner"
import { BuilderHeader } from "@/modules/builder/builder-header"
import { BuilderBody } from "@/modules/builder/builder-body"
import { BuilderPublished } from "@/modules/builder/builder-published"
import { ROUTES } from "@/router"

export const Builder = () => {
  const id = useParams().id
  useGate(BuilderGate, { id: id || "" })
  const navigate = useNavigate()

  const form = useUnit($formStore)
  const status = useUnit($getFormStatus)

  useEffect(() => {
    if (
      !status.pending &&
      status.status === "fail" &&
      status.error &&
      status.error.name !== "CanceledError"
    ) {
      toast.error("Error occured", {
        description: "We could not find this form. We are sorry!",
      })
      navigate("/")
    }
  }, [status])

  if (status.pending || status.status === "fail" || !form) {
    return <Loader className="my-auto" />
  }

  if (form.isPublished) return <BuilderPublished />

  return (
    <main className="flex flex-col flex-grow">
      <BuilderHeader form={form} />
      <BuilderBody />
    </main>
  )
}

export const builderRoute: RouteObject = {
  path: ROUTES.builder,
  element: <Builder />,
}
