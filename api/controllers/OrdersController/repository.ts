import { prisma } from "../../../prisma/prisma"
import { TCreateOrder } from "./types"

class OrdersRepository {
  public async create(data: TCreateOrder) {
    const date = new Date(data.expired_at)

    const order = await prisma.order.create({
      data: {
        ...data,
        expired_at: date,
      },
    })

    return { data: order }
  }
}

export const ordersRepository = new OrdersRepository()
