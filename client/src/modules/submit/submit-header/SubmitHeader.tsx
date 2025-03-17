import { FormPublic } from "@/entities/form/model"

type SubmitHeaderProps = {
  form: FormPublic
}

export const SubmitHeader = ({ form }: SubmitHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl">{form.title}</h1>
      <h2 className="text-muted-foreground border-b pb-4">
        {form.description}
      </h2>
    </div>
  )
}
