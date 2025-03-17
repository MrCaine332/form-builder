import { z } from "zod"

export const credentialsSchema = z
  .object({
    email: z.string().email("Incorrect email format."),
    password: z
      .string()
      .min(8, "Your password must contain 8 or more characters."),
  })
  .required()

export type CredentialsDto = z.infer<typeof credentialsSchema>
