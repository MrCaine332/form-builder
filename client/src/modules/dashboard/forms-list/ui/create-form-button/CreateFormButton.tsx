import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { FilePlus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { formsApi } from "@/entities/form/model"

const formSchema = z.object({
  title: z.string().min(4),
  description: z.string(),
})

export const CreateFormButton = () => {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await formsApi.createForm(values.title, values.description)
    result.errors?.forEach((error: any) => {
      form.setError(error.validation, { message: error.message })
    })

    if (result.error) {
      form.setError("root", { message: result.error })
    }

    if (!result.errors && !result.error && result.response?.data) {
      navigate(`/builder/${result.response.data.id}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-lg border border-border border-dashed hover:opacity-70 h-[200px] flex flex-col items-center justify-center gap-4 text-foreground/60 transition-opacity transition-100">
        <FilePlus />
        <span className="text-md font-medium">Create new form</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
