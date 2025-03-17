import { RouteObject, useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "@/router"
import { Section } from "@/shared/ui/section"
import { useGate, useUnit } from "effector-react"
import { useEffect } from "react"
import { toast } from "sonner"
import { Loader } from "@/shared/ui/loader"
import {
  $formElements,
  $formStore,
  $getFormStatus, $isFormSubmitted,
  SubmitGate,
} from "@/pages/submit/model"
import {SubmitHeader} from "@/modules/submit/submit-header";
import {SubmitForm} from "@/modules/submit/submit-form";
import {SubmitSubmitted} from "@/modules/submit/submit-submitted";

export const Submit = () => {
  const url = useParams().url
  useGate(SubmitGate, { url: url || "" })
  const navigate = useNavigate()

  const [form, isFormSubmitted] = useUnit([$formStore, $isFormSubmitted])
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

  if (isFormSubmitted) {
    return <SubmitSubmitted />
  }

  return (
    <div className="bg-accent flex flex-col items-center justify-center p-4">
      <Section className="max-w-[620px] flex flex-col gap-4 h-full w-full rounded-2xl p-8 overflow-y-auto">
        {/*<SubmitHeader form={form} />*/}
        <SubmitForm />
      </Section>
    </div>
  )
}

export const submitRoute: RouteObject = {
  path: ROUTES.submit,
  element: <Submit />,
}
