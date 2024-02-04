import { z } from "zod"

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Nome muito curto.")
    .max(50, "Nome muito grande!")
    .refine((item) => item.toLowerCase()),
  username: z
    .string()
    .min(2, "Username muito curto!")
    .refine((item) => item.toLowerCase()),
  password: z.string().min(6, "Senha muito curta"),
})
