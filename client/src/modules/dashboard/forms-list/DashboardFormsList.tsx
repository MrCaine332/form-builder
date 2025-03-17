import { useGate, useUnit } from "effector-react"
import { CreateFormButton } from "./ui"
import { DashboardFormsListGate } from "./model"
import { $formsListStore } from "./model"
import { FormCard } from "@/entities/form/ui"

export const DashboardFormsList = () => {
  useGate(DashboardFormsListGate)
  const forms = useUnit($formsListStore)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CreateFormButton />
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  )
}
