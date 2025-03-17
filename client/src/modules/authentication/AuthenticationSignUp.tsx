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
import React, { useState } from "react"
import { MoveLeft } from "lucide-react"
import { useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userApi, signIn } from "@/entities/user/model"

const stepOneSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const stepTwoSchema = z.object({
  password: z.string().min(8, "Password must contain at least 8 characters."),
  confirmPassword: z
    .string()
    .min(8, "Password must contain at least 8 characters."),
})

const formSchema = z.discriminatedUnion("step", [
  z.object({ step: z.literal(1) }).extend(stepOneSchema.shape),
  z.object({ step: z.literal(2) }).extend(stepTwoSchema.shape),
])

export const AuthenticationSignUp = () => {
  const [step, setStep] = useState(1)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      step: step,
    },
  })

  const onSubmit = async () => {
    const values = form.getValues()

    if (step === 1) {
      const result = await userApi.validateEmail(values.email)

      result.errors?.forEach((error: any) => {
        form.setError(error.validation, { message: error.message })
      })

      if (result.error) {
        form.setError("email", { message: result.error })
        form.setFocus("email")
      }

      if (!result.error && !result.errors) {
        setStep(2)
        form.setValue("step", 2)
      }
    }

    if (step === 2) {
      if (values.confirmPassword !== values.password) {
        form.setError("confirmPassword", { message: "Passwords should match." })
        return
      }

      const result = await userApi.signUp(values.email, values.password)

      result.errors?.forEach((error: any) => {
        form.setError(error.validation, { message: error.message })
      })

      if (result.error) {
        form.setError("root", { message: result.error })
      }

      console.log(result)

      if (!result.error && !result.errors && result.response?.data) {
        console.log("test")
        signIn(result.response.data)
      }
    }
  }

  const onBack = () => {
    setStep(1)
    form.setValue("step", 1)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 -mt-2"
      >
        {step === 1 ? <FormStep1 /> : <FormStep2 onBack={onBack} />}
      </form>
    </Form>
  )
}

/** Step 1 of the form.
 *  Contains field "email" */
const FormStep1 = () => {
  const form = useFormContext<z.infer<typeof formSchema>>()

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="example@email.com"
                autoComplete="email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={form.formState.isSubmitting}
      >
        Continue
      </Button>
    </>
  )
}

/** Step 2 of the form.
 *  Contains fields "password" and "currentPassword" */
const FormStep2 = ({ onBack }: { onBack: () => void }) => {
  const form = useFormContext()

  return (
    <>
      <Button
        type="button"
        variant="link"
        className="justify-start w-fit p-0"
        onClick={onBack}
      >
        <MoveLeft className="mr-2" />
        Back
      </Button>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="password"
                autoComplete="new-password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput
                placeholder="password"
                autoComplete="confirm-password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={form.formState.isSubmitting}
      >
        Sign In
      </Button>
    </>
  )
}
