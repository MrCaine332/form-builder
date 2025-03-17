import { FormElementInstance } from "@/entities/form-element/model"
import { ParagraphFieldExtraAttributes } from "./"
import { z } from "zod"
import { usePropertiesForm } from "@/entities/form-element/model/usePropertiesForm"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"

type ParagraphFieldPropertiesProps = {
  element: FormElementInstance<ParagraphFieldExtraAttributes>
}

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
})

export const ParagraphFieldProperties = ({
  element,
}: ParagraphFieldPropertiesProps) => {
  const { form, onSubmit } = usePropertiesForm(propertiesSchema, element)

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
