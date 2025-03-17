import { z } from "zod"

export const createFormBodySchema = z
  .object({
    title: z.string().min(4),
    description: z.string(),
  })
  .required()

export type CreateFormBodyDto = z.infer<typeof createFormBodySchema>
