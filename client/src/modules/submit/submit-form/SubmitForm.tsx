import { FormElements } from "@/entities/form-element/ui"
import { Button } from "@/shared/ui/button"
import { Loader2, MousePointerClick } from "lucide-react"
import { Separator } from "@/shared/ui/separator"
import { $formElements } from "@/pages/submit/model"
import { useUnit } from "effector-react"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { $pending, submitForm } from "@/modules/submit/submit-form/model"

export const SubmitForm = () => {
  const elements = useUnit($formElements)

  const pending = useUnit($pending)

  const formValues = useRef<{ [key: string]: string | undefined }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})
  const [_, rerender] = useState(Date.now())

  const validateForm = () => {
    formErrors.current = {}
    elements.forEach((element) => {
      const value = formValues.current[element.id] || ""
      const isValid = FormElements[element.type].validate(element, value)
      if (!isValid) {
        formErrors.current[element.id] = true
      }
    })

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }

    return true
  }

  const onApply = (id: string, value: string) => {
    formValues.current[id] = value
  }

  const onSubmit = () => {
    const isFormValid = validateForm()
    if (!isFormValid) {
      rerender(Date.now())
      toast.error("Error", {
        description: "Please, check the form for errors.",
      })
      return
    }

    const content = JSON.stringify(formValues.current)

    submitForm({ content })
  }

  return (
    <div className="flex flex-col gap-4">
      {elements.map((element) => {
        const FormComponent = FormElements[element.type].formComponent
        return (
          <FormComponent
            key={element.id}
            element={element}
            onApply={onApply}
            isInvalid={formErrors.current[element.id]}
          />
        )
      })}
      <Separator className="my-4" />
      <Button className="gap-2" onClick={onSubmit} disabled={pending}>
        Submit
        {pending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <MousePointerClick size={18} />
        )}
      </Button>
    </div>
  )
}
