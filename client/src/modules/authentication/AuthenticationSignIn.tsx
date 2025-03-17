import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { Input, PasswordInput } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userApi, signIn } from "@/entities/user/model"

const formSchema = z.object({
  email: z.string().email("Incorrect email format"),
  password: z.string().min(8, "Password must contain at least 8 characters."),
})

export const AuthenticationSignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    const result = await userApi.signIn(values.email, values.password)
    result.errors?.forEach((error: any) => {
      form.setError(error.validation, { message: error.message })
    })

    if (result.error) {
      form.setError("root", { message: result.error })
    }

    if (!result.errors && !result.error && result.response?.data) {
      signIn(result.response.data)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLogin)}
        className="flex flex-col gap-2 -mt-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-destructive text-center">
          {form.formState.errors.root?.message}
        </p>
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={form.formState.isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </Form>
  )
}
