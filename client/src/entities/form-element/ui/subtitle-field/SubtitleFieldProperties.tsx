import { FormElementInstance } from "@/entities/form-element/model"
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
import { SubtitleFieldExtraAttributes } from "./"

type SubtitleFieldPropertiesProps = {
  element: FormElementInstance<SubtitleFieldExtraAttributes>
}

const propertiesSchema = z.object({
  subtitle: z.string().min(2).max(50),
})

export const SubtitleFieldProperties = ({
  element,
}: SubtitleFieldPropertiesProps) => {
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
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>The subtitle of your form.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
