import { FormElementInstance } from "@/entities/form-element/model"
import { TextareaFieldExtraAttributes } from "./"
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
import { Switch } from "@/shared/ui/switch"
import {Slider} from "@/shared/ui/slider";

type TextareaFieldPropertiesProps = {
  element: FormElementInstance<TextareaFieldExtraAttributes>
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  rows: z.number().min(1).max(10),
})

export const TextareaFieldProperties = ({
  element,
}: TextareaFieldPropertiesProps) => {
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
	      <FormField
		      control={form.control}
		      name="rows"
		      render={({ field }) => (
			      <FormItem>
				      <FormLabel>Rows: {form.watch("rows")}</FormLabel>
				      <FormControl className="pt-2">
					      <Slider
						      defaultValue={[field.value]}
						      min={1}
						      max={10}
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
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel>Required</FormLabel>
              <FormControl>
                <Switch
                  className="!mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
