import { prisma } from "../../../prisma/prisma"
import { TCreateOrder, TShowOptions } from "./types"

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

  public async show(options: TShowOptions) {
    const skip = options.page * options.limit - options.limit

    const orders = await prisma.order.findMany({
      skip,
      take: options.limit,
      orderBy: {
        created_at: "desc",
      },
      where: {
        order_number: {
          startsWith: options.search || "",
        },
      },
    })

    const count = await prisma.order.count({
      where: {
        order_number: {
          startsWith: options.search || "",
        },
      },
    })

    return {
      pages: Math.round(count / options.limit) || 1,
      orders,
    }
  }

  public async deliver(orderId: string) {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 1,
      },
    })

    return {
      order,
    }
  }

  public async remove(orderId: string) {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    })
  }
}

export const ordersRepository = new OrdersRepository()
