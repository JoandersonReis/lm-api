import { Request, Response, Router } from "express"
import Messages from "../../Messages"
import ensureUserAuthenticated from "../../middlewares/ensureUserAuthenticated"
import { BaseAPI } from "../baseAPI"
import { ordersRepository } from "./repository"
import { CreateOrderSchema, ShowOrdersParamsSchema } from "./schema"

class OrdersControllerAPI implements BaseAPI {
  get getRoutes(): [string, Router] {
    const router = Router()

    router.post("/", ensureUserAuthenticated, this.create)
    router.get("/", ensureUserAuthenticated, this.show)

    return ["/api/orders", router]
  }

  private async create(request: Request, response: Response) {
    try {
      const data = CreateOrderSchema.parse(request.body)

      const result = await ordersRepository.create({
        ...data,
        user_id: request.user_id,
      })

      return response.json(
        Messages.SuccessMessage("Pedido criado com sucesso!", 201, result)
      )
    } catch (err: any) {
      return response.json(Messages.ErrorMessage(err.errors[0].message))
    }
  }

  private async show(request: Request, response: Response) {
    try {
      const data = ShowOrdersParamsSchema.parse(request.query)

      const result = await ordersRepository.show({
        ...data,
        limit: Number(data.limit) || 10,
        page: Number(data.page) || 1,
      })

      return response.json(Messages.SuccessMessage("Sucesso!", 200, result))
    } catch (err: any) {
      return response.json(Messages.ErrorMessage(err.errors[0].message))
    }
  }
}

export const ordersControllerAPI = new OrdersControllerAPI()
