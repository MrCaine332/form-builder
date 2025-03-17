import { z } from "zod"
import { FormElementInstance } from "@/entities/form-element/model/types"
import { DefaultValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { updateSelectedFormElement } from "@/modules/builder/model"

export const usePropertiesForm = <
  TSchema extends z.Schema<any, any>,
  TAttributes extends Record<string, any>,
>(
  schema: TSchema,
  element: FormElementInstance<TAttributes>
) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { ...(element.extraAttributes as DefaultValues<TSchema>) },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element])

  const onSubmit = (value: z.infer<TSchema>) => {
    updateSelectedFormElement({ id: element.id, attributes: value })
  }

  return {
    form,
    onSubmit,
  }
}
