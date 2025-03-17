import { RouteObject, useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "@/router"
import { useGate, useUnit } from "effector-react"
import { $formDetails, $getFormDetailsStatus, FormGate } from "./model"
import { useEffect } from "react"
import { toast } from "sonner"
import { Loader } from "@/shared/ui/loader"
import { Container } from "@/shared/ui/container"
import { FormStatistics } from "@/modules/form/form-statistics"
import { FormHeader } from "@/modules/form/form-header"
import {FormSubmissions} from "@/modules/form/form-submissions";

export const Form = () => {
  const id = useParams().id
  useGate(FormGate, { id: id || "" })
  const navigate = useNavigate()

  const formDetails = useUnit($formDetails)
  const status = useUnit($getFormDetailsStatus)

  useEffect(() => {
    if (
      !status.pending &&
      status.status === "fail" &&
      status.error &&
      status.error.name !== "CanceledError"
    ) {
      toast.error("Error occured", {
        description: "We could not find details of this form. We are sorry!",
      })
      navigate("/")
    }
  }, [status])

  if (status.pending || status.status === "fail" || !formDetails) {
    return <Loader className="my-auto" />
  }

  return (
    <main>
      <Container className="mb-4">
        <FormHeader />
        <FormStatistics />
        <FormSubmissions />
      </Container>
    </main>
  )
}

export const formRoute: RouteObject = {
  path: ROUTES.form,
  element: <Form />,
}
