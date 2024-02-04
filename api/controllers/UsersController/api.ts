import { Request, Response, Router } from "express"
import Messages from "../../Messages"
import { BaseAPI } from "../baseAPI"
import { usersHandle } from "./handle"
import { CreateUserSchema } from "./schema"

class UsersControllerAPI implements BaseAPI {
  get getRoutes(): [string, Router] {
    const router = Router()

    router.post("/", this.create)

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
}

export const usersControllerAPI = new UsersControllerAPI()
