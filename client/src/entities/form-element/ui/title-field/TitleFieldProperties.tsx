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
import { TitleFieldExtraAttributes } from "./"

type TitleFieldPropertiesProps = {
  element: FormElementInstance<TitleFieldExtraAttributes>
}

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
})

export const TitleFieldProperties = ({
  element,
}: TitleFieldPropertiesProps) => {
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>The title of your form.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
