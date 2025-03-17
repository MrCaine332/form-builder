import { FormElementInstance } from "@/entities/form-element/model"
import { SpacerFieldExtraAttributes } from "./"
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
import { Slider } from "@/shared/ui/slider"

type SpacerFieldPropertiesProps = {
  element: FormElementInstance<SpacerFieldExtraAttributes>
}

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
})

export const SpacerFieldProperties = ({
  element,
}: SpacerFieldPropertiesProps) => {
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px): {form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0])
                  }}
                />
              </FormControl>
              <FormDescription>The height of the spacer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
