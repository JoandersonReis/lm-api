export type TCreateOrder = {
  product: string
  expired_at: string
  order_number: string
  user_id: string
}

export type TShowOptions = {
  limit: number
  page: number
  search?: string
}
