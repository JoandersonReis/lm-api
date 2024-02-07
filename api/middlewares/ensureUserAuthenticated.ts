import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import Messages from "../Messages"
import { TUserPayload } from "./types"

export default async function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const [type, token] = request.headers.authorization!.split(" ")

    if (!type || !token) {
      return response.json(
        Messages.ErrorMessage("Type Bearer ou token ausente", 401)
      )
    }

    if (type !== "Bearer") {
      return response.json(Messages.ErrorMessage("Type inválido!", 401))
    }

    const payload = verify(
      token,
      String(process.env.JWT_SECRET)
    ) as TUserPayload

    if (!payload) {
      return response.json(
        Messages.ErrorMessage("Token invalido ou expirado!", 401)
      )
    }

    request.user_id = payload.sub

    next()
  } catch (err) {
    return response.json(Messages.ErrorMessage("Token é necessário", 401))
  }
}
