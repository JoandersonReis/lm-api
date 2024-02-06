import { Request, Response, Router } from "express"
import Messages from "../../Messages"
import { BaseAPI } from "../baseAPI"
import { usersHandle } from "./handle"
import { CreateUserSchema, LoginSchema } from "./schema"

class UsersControllerAPI implements BaseAPI {
  get getRoutes(): [string, Router] {
    const router = Router()

    router.post("/", this.create)
    router.post("/auth", this.login)

    return ["/api/users", router]
  }

  private async create(request: Request, response: Response) {
    try {
      const data = CreateUserSchema.parse(request.body)

      const result = await usersHandle.create(data)

      return response.json(
        Messages.SuccessMessage("Usuário criado com sucesso!", 201)
      )
    } catch (err: any) {
      return response.json(Messages.ErrorMessage(err.errors[0].message))
    }
  }

  private async login(request: Request, response: Response) {
    try {
      const data = LoginSchema.parse(request.body)

      const result = await usersHandle.login(data)

      return response.json(Messages.SuccessMessage("", 201, result))
    } catch (err: any) {
      return response.json(Messages.ErrorMessage(err.errors[0].message))
    }
  }
}

export const usersControllerAPI = new UsersControllerAPI()
