import { z } from "zod"

export const CreateOrderSchema = z.object({
  product: z
    .string()
    .min(2, "Nome do produto muito curto")
    .refine((item) => item.toLowerCase()),
  expired_at: z.string().min(1, "Data de espiração necessária"),
  order_number: z.string().min(1, "Número do pedido obrigatório!"),
})

export const ShowOrdersParamsSchema = z.object({
  limit: z.string().optional(),
  page: z.string().optional(),
  search: z.string().optional(),
})
